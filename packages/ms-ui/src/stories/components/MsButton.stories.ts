import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { MsButton } from '@/components/app'

const meta = {
  title: 'Components/MsButton',
  component: MsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'danger', 'outline', 'secondary', 'ghost', 'ghost-primary', 'ghost-danger', 'link'],
      description: '按钮变体',
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'default', 'large'],
      description: '按钮尺寸',
    },
    mode: {
      control: 'select',
      options: ['text', 'icon', 'icon-text'],
      description: '按钮模式',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
    },
    icon: {
      control: 'text',
      description: '图标',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
} satisfies Meta<typeof MsButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    mode: 'text',
  },
  render: (args) => ({
    components: { MsButton },
    setup() {
      return { args }
    },
    template: '<MsButton v-bind="args">Button</MsButton>',
  }),
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    mode: 'text',
  },
  render: (args) => ({
    components: { MsButton },
    setup() {
      return { args }
    },
    template: '<MsButton v-bind="args">Primary Button</MsButton>',
  }),
}

export const IconButton: Story = {
  args: {
    variant: 'default',
    size: 'default',
    mode: 'icon',
  },
  render: (args) => ({
    components: { MsButton },
    setup() {
      return { args }
    },
    template: `
      <MsButton v-bind="args">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </template>
      </MsButton>
    `,
  }),
}

export const IconTextButton: Story = {
  args: {
    variant: 'default',
    size: 'default',
    mode: 'icon-text',
  },
  render: (args) => ({
    components: { MsButton },
    setup() {
      return { args }
    },
    template: `
      <MsButton v-bind="args">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </template>
        Icon Text Button
      </MsButton>
    `,
  }),
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    mode: 'text',
    loading: true,
  },
  render: (args) => ({
    components: { MsButton },
    setup() {
      return { args }
    },
    template: '<MsButton v-bind="args">Loading</MsButton>',
  }),
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    mode: 'text',
    disabled: true,
  },
  render: (args) => ({
    components: { MsButton },
    setup() {
      return { args }
    },
    template: '<MsButton v-bind="args">Disabled</MsButton>',
  }),
}