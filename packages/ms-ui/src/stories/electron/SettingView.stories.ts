import type { Meta, StoryObj } from "@storybook/vue3-vite";
import SettingView from "./SettingView.vue";

const meta: Meta<typeof SettingView> = {
  title: "Electron/SettingView",
  component: SettingView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { SettingView },
    template: `<SettingView />`,
  }),
};
