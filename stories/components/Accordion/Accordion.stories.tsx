import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionProps,
} from "./Accordion";

const meta = {
  title: "Practice/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    className: "max-w-md mx-auto",
  },
  argTypes: {
    type: {
      control: { type: "inline-radio" },
      options: ["single", "multiple"],
    },
    collapsible: {
      control: { type: "boolean" },
    },
    defaultValue: {
      control: { type: "object" },
    },
  },
};

export default meta;

const demoItems = [
  {
    value: "item-1",
    title: "첫 번째 항목",
    content:
      "간단한 소개 문구입니다. 사용자에게 필요한 정보를 넣어보세요.",
  },
  {
    value: "item-2",
    title: "두 번째 항목",
    content:
      "FAQ, 가이드, 릴리즈 노트 등 반복되는 컨텐츠를 담기에 좋습니다.",
  },
  {
    value: "item-3",
    title: "세 번째 항목",
    content:
      "여러 줄의 텍스트도 문제 없이 표현됩니다. 긴 설명을 테스트해보세요.",
  },
];

type RenderFn = (args: AccordionProps) => React.ReactNode;

const renderAccordion: RenderFn = (args) => (
  <Accordion {...args}>
    {demoItems.map(({ value, title, content }) => (
      <AccordionItem key={value} value={value}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export const SingleCollapsible = {
  args: {
    type: "single",
    collapsible: true,
    defaultValue: "item-1",
  },
  render: renderAccordion,
};

export const SingleLocked = {
  args: {
    type: "single",
    collapsible: false,
    defaultValue: "item-2",
  },
  render: renderAccordion,
};

export const MultipleOpen = {
  args: {
    type: "multiple",
    collapsible: true,
    defaultValue: ["item-1", "item-3"],
  },
  render: renderAccordion,
};
