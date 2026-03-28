import type { StoryObj } from '@storybook/vue3-vite'
import { MsSettingsTabs } from '@/components/app'

const meta = {
  title: 'Components/MsSettingsTabs',
  component: MsSettingsTabs,
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
      { value: 'account', label: '账户' },
      { value: 'general', label: '常规' },
      { value: 'theme', label: '主题' },
      { value: 'data', label: '数据' },
      { value: 'document', label: '文档' }
    ],
    defaultValue: 'account',
  },
}

export const WithCustomClass: Story = {
  args: {
    tabs: [
      { value: 'setting1', label: '设置1' },
      { value: 'setting2', label: '设置2' },
      { value: 'setting3', label: '设置3' }
    ],
    defaultValue: 'setting1',
    className: 'p-2 bg-gray-100 rounded-lg',
  },
}