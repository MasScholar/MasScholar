import { Button } from "@/components/ui/button";

export default {
  component: Button,
  title: "Electron/Button",
  categories: ["Electron"],
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "default",
        "tertiary",
        "primary",
        "success",
        "info",
        "warning",
        "error",
      ],
    },
    level: {
      control: "select",
      options: ["default", "secondary", "tertiary", "quaternary"],
    },
    size: {
      control: "select",
      options: ["mini", "small", "medium", "large"],
    },
    color: {
      control: "color",
      presetColors: ["#1677ff", "#52c41a", "#faad14", "#ff4d4f"],
    },
    dashed: {
      control: "boolean",
      defaultValue: false,
    },
    circle: {
      control: "boolean",
      defaultValue: false,
    },
    rounded: {
      control: "boolean",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        按钮
      </Button>
    `,
  }),
};

export const Default = {
  args: {
    type: "default",
  },
};
