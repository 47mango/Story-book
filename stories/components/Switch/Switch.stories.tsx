import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch, SwitchProps } from "./Switch";

const meta = {
  title: "Practice/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    componentSubtitle: "A switch component",
    docs: {
      description: {
        component:
          "shadcn/ui Switch를 참고한 토글 컴포넌트입니다. 기본/제어형 모두 지원합니다.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  args: {
    checked: true,
  },
  render: (args: SwitchProps) => {
    const [checked, setChecked] = React.useState(args.checked ?? false);

    return (
      <div className="flex items-center gap-3">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm text-muted-foreground">
          {checked ? "켜짐" : "꺼짐"}
        </span>
      </div>
    );
  },
};

