import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MsLanguageToggle } from '@masscholar/ui'

const meta = {
  title: 'Components/MsLanguageToggle',
  component: MsLanguageToggle,
  tags: ['autodocs'],
  argTypes: {
    langCode: {
      control: 'select',
      options: ['zh-CN', 'en-US', 'ja-JP', 'fr-FR', 'de-DE', 'pt-BR'],
      description: '语言代码',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
} satisfies Meta<typeof MsLanguageToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    langCode: 'zh-CN',
  },
}

export const English: Story = {
  args: {
    langCode: 'en-US',
  },
}

export const Japanese: Story = {
  args: {
    langCode: 'ja-JP',
  },
}

export const WithCustomClass: Story = {
  args: {
    langCode: 'zh-CN',
    className: 'p-2 bg-gray-100 rounded-lg',
  },
}