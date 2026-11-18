import React, {useEffect, useRef, type ReactNode} from 'react';

const UHF_URL =
  'https://uhf.microsoft.com/en-us/shell/xml/MSCosmosDB?headerid=MSCosmosDBHeader&footerid=MSCosmosDBFooter';

function getShellContent(xml: Document, name: string): string {
  const content = xml.querySelector(`shell > ${name}`);
  if (!content) {
    throw new Error(`The UHF response did not contain the expected ${name} content.`);
  }
  return content.textContent ?? '';
}

function parseHtml(markup: string): HTMLTemplateElement {
  const template = document.createElement('template');
  template.innerHTML = markup;
  return template;
}

function appendStyles(markup: string): void {
  const styles = parseHtml(markup);
  for (const source of Array.from(styles.content.children)) {
    const style = document.importNode(source, true);
    if (style.tagName === 'LINK' && style.getAttribute('href')) {
      style.setAttribute('href', new URL(style.getAttribute('href')!, UHF_URL).href);
    }
    document.head.appendChild(style);
  }
}

function renderMarkup(markup: string, target: HTMLElement): HTMLScriptElement[] {
  const template = parseHtml(markup);
  const scripts = Array.from(template.content.querySelectorAll('script'));
  scripts.forEach((script) => script.remove());
  target.replaceChildren(template.content);
  return scripts;
}

async function loadScript(source: HTMLScriptElement): Promise<void> {
  const script = document.createElement('script');
  for (const attribute of Array.from(source.attributes)) {
    script.setAttribute(attribute.name, attribute.value);
  }

  const sourceUrl = source.getAttribute('src');
  if (sourceUrl) {
    script.src = new URL(sourceUrl, UHF_URL).href;
    script.async = false;
    await new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load UHF script: ${script.src}`));
      document.body.appendChild(script);
    });
    return;
  }

  script.textContent = source.textContent;
  document.body.appendChild(script);
  script.remove();
}

export default function UhfShell({children}: {children: ReactNode}): React.ReactElement {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUhf(): Promise<void> {
      const response = await fetch(UHF_URL, {signal: controller.signal});
      if (!response.ok) {
        throw new Error(`UHF request failed with status ${response.status}.`);
      }

      const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
      if (xml.querySelector('parsererror')) {
        throw new Error('The UHF service returned invalid XML.');
      }

      const cssIncludes = getShellContent(xml, 'cssIncludes');
      const headerHtml = getShellContent(xml, 'headerHtml');
      const footerHtml = getShellContent(xml, 'footerHtml');
      const javascriptIncludes = getShellContent(xml, 'javascriptIncludes');
      if (!headerRef.current || !footerRef.current) return;

      appendStyles(cssIncludes);
      const htmlScripts = [
        ...renderMarkup(headerHtml, headerRef.current),
        ...renderMarkup(footerHtml, footerRef.current),
      ];
      const javascriptScripts = renderMarkup(javascriptIncludes, document.createElement('div'));

      for (const script of [...javascriptScripts, ...htmlScripts]) {
        await loadScript(script);
      }
    }

    loadUhf().catch((error: unknown) => {
      if (!controller.signal.aborted) {
        console.error('Unable to load the Microsoft Universal Header and Footer.', error);
      }
    });

    return () => controller.abort();
  }, []);

  return (
    <>
      <div ref={headerRef} id="uhf-header" />
      {children}
      <div ref={footerRef} id="uhf-footer" />
    </>
  );
}
