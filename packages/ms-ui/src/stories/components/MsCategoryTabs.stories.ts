import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MsCategoryTabs } from '@masscholar/ui'

const meta = {
  title: 'Components/MsCategoryTabs',
  component: MsCategoryTabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: '标签列表',
    },
    defaultValue: {
      control: 'text',
      description: '默认选中的标签',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { value: 'statistical', label: '统计相关', disabled: false },
      { value: 'simulation', label: '物理仿真', disabled: true },
      { value: 'computer-image', label: '图像处理', disabled: true },
      { value: 'computer-vision', label: '计算机视觉', disabled: true },
      { value: 'ai', label: 'AI 与 数据科学', disabled: true }
    ],
    defaultValue: 'statistical',
  },
}

export const WithCustomClass: Story = {
  args: {
    tabs: [
      { value: 'tab1', label: '标签1', disabled: false },
      { value: 'tab2', label: '标签2', disabled: false },
      { value: 'tab3', label: '标签3', disabled: true }
    ],
    defaultValue: 'tab1',
    className: 'p-2 bg-gray-100 rounded-lg',
  },
}