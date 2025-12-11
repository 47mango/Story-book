import Badge from "./Badge";


export default {
  title: "Practice/Badge",
  component: Badge,
  argTypes: {
    children: { control: "text" },
  },
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Badge",
  className: "bg-blue-500 text-white",
};

export const Red = Template.bind({});

Red.args = {
  children: "Red Badge",
  className: "bg-red-500 text-white",
  size: "small",
};

export const Big = Template.bind({});

Big.args = {
  children: "Big Badge",
  className: "bg-green-500 text-white",
  size: "big",
};