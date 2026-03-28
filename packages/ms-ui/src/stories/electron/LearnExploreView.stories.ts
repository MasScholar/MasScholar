import type { Meta, StoryObj } from "@storybook/vue3-vite";
import LearnExploreView from "./LearnExploreView.vue";

const meta: Meta<typeof LearnExploreView> = {
  title: "Electron/LearnExploreView",
  component: LearnExploreView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { LearnExploreView },
    template: `<LearnExploreView />`,
  }),
};
