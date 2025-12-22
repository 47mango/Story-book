import Badge from "./Badge";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: "Practice/Badge",
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: { control: "text" },
  },
  parameters: {
    layout: "centered",
    componentSubtitle: "A badge component",
    docs: {
      description: {
        component: "A badge component",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default : Story = {
  args: {
    children: "Badge",
    className: "bg-blue-500 text-white",
  },
};

export const Red : Story = {
  args: {
    children: "Red Badge",
    className: "bg-red-500 text-white",
    size: "small",
  },
};

  export const Big : Story = {  
  args: {
    children: "Big Badge",
    className: "bg-green-500 text-white",
    size: "big",
  },
};

export const Medium : Story = {
  args: {
    children: "Medium Badge",
    className: "bg-yellow-500 text-white",
    size: "medium",
  },
};

export const Small : Story = {
  args: {
    children: "Small Badge",
    className: "bg-purple-500 text-white",
    size: "small",
  },
};