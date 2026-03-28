import type { Meta, StoryObj } from "@storybook/vue3-vite";
import LaunchView from "./LaunchView.vue";

const meta: Meta<typeof LaunchView> = {
  title: "Electron/LaunchView",
  component: LaunchView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { LaunchView },
    template: `<LaunchView />`,
  }),
};
