import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MsRecentItem } from '@masscholar/ui'

const meta = {
  title: 'Components/MsRecentItem',
  component: MsRecentItem,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '项目名称',
    },
    type: {
      control: 'text',
      description: '项目类型',
    },
    time: {
      control: 'text',
      description: '最近使用时间',
    },
    image: {
      control: 'text',
      description: '项目图片',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
} satisfies Meta<typeof MsRecentItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: '市场调研数据统计实践',
    type: 'Project',
    time: '1 min before',
  },
}

export const WithImage: Story = {
  args: {
    name: '心理学实验数据分析范例',
    type: 'Tutorial',
    time: '5 min before',
    image: 'https://via.placeholder.com/50',
  },
}

export const WithCustomClass: Story = {
  args: {
    name: '农田水分管理数据描述统计与推断',
    type: 'Project',
    time: '10 min before',
    className: 'border border-gray-200',
  },
}