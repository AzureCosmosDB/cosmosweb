/* eslint-disable @docusaurus/no-html-links */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// External Components
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface AccordionItem {
  title?: string;
  question?: string;
  content?: string;
  link?: string;
  renderAnswer?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  fontFamily?: string;
  firstOpen?: boolean;
  textColor?: string;
  fontWeight?: string;
  fontSize?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  fontFamily,
  firstOpen,
  textColor,
  fontWeight,
  fontSize,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    firstOpen === false ? null : 0
  );

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const baseUrl = '';

  return (
    <div>
      {items.map((item, index) => (
        <AccordionSection key={index}>
          <AccordionParent onClick={() => toggleAccordion(index)} aria-expanded={activeIndex === index}>
            <h2
              style={{
                color: textColor || '#FFF',
                fontSize: fontSize ? fontSize : '22px',
                fontFamily: fontFamily,
                fontWeight: fontWeight || '400',
                lineHeight: '140%',
                backgroundColor: '#007BFF', // Blue theme
                padding: '12px',
                borderRadius: '8px',
                margin: '0',
              }}
            >
              {item.title || item.question}
            </h2>
            <div>
              {activeIndex === index ? (
                <AiOutlineMinus color={textColor || '#FFF'} size={22} />
              ) : (
                <AiOutlinePlus color={textColor || '#FFF'} size={22} />
              )}
            </div>
          </AccordionParent>

          {activeIndex === index && item.content !== undefined && (
            <AccordionContent>
              <h3
                style={{
                  color: textColor || '#000',
                  fontSize: '19px',
                  fontFamily: fontFamily,
                  fontWeight: '400',
                  lineHeight: '150%',
                  margin: '0 0 12px 0',
                }}
              >
                {item.content}
              </h3>

              {item.link && (
                <a
                  style={{
                    color: '#007BFF',
                    fontFamily: fontFamily,
                    fontSize: '16px',
                    fontWeight: '300',
                    lineHeight: '140%',
                    textDecoration: 'none',
                  }}
                  target='_blank'
                  rel="noopener noreferrer"
                  href={item.link}
                >
                  - Link
                </a>
              )}
            </AccordionContent>
          )}

          {activeIndex === index &&
            item.renderAnswer !== undefined &&
            item.renderAnswer(baseUrl)}
        </AccordionSection>
      ))}
    </div>
  );
};

const AccordionSection = styled.div`
  border-bottom: 1px solid #2a2a39;
  h3 {
    white-space: pre-wrap;
  }
`;

const AccordionParent = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 24px;
`;

const AccordionContent = styled.div`
  padding: 12px;
  background-color: #f0f8ff; // Light blue background
  border-radius: 8px;
  margin-top: 8px;
`;

export default Accordion;
