import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ProjectView from "./ProjectView.vue";

const meta: Meta<typeof ProjectView> = {
  title: "Electron/ProjectView",
  component: ProjectView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { ProjectView },
    template: `<ProjectView />`,
  }),
};
