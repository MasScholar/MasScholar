import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MsThemeToggle } from '@masscholar/ui'

const meta = {
  title: 'Components/MsThemeToggle',
  component: MsThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '当前主题模式',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
} satisfies Meta<typeof MsThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: false,
  },
}

export const DarkMode: Story = {
  args: {
    modelValue: true,
  },
}

export const WithCustomClass: Story = {
  args: {
    modelValue: false,
    className: 'p-4 bg-gray-100 rounded-lg',
  },
}