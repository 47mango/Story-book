import { Label } from "./Label";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';



const meta = {
  title: "Practice/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    componentSubtitle: "A label component",
    docs: {
      description: {
        component: "A label component",
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: "label",
    children: "Label",
  },
};