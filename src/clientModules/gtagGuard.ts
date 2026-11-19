export {};

// The Google tag plugin reports every route change with `window.gtag(...)`. When the tag script is not on
// the page (local dev server, or a blocker removed it) that call throws on every in-page navigation, so
// provide a harmless queue. A real gtag, when present, is left alone.
if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'function') {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
}
