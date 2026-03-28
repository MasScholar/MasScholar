import type { StoryObj } from '@storybook/vue3-vite'
import { MsVersionInfo } from '@/components/app'

const meta = {
  title: 'Components/MsVersionInfo',
  component: MsVersionInfo,
  tags: ['autodocs'],
  argTypes: {
    version: {
      control: 'text',
      description: '版本号',
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
    version: '0.0.1',
  },
}

export const WithCustomVersion: Story = {
  args: {
    version: '1.0.0',
  },
}

export const WithCustomClass: Story = {
  args: {
    version: '0.0.1',
    className: 'p-2 bg-gray-100 rounded-lg text-red-500',
  },
}