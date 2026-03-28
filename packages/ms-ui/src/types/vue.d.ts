import 'vue'

declare module '@vue/runtime-core' {
  interface HTMLAttributes {
    'data-slot'?: string
  }

  interface OptgroupHTMLAttributes {
    'data-slot'?: string
  }

  interface OptionHTMLAttributes {
    'data-slot'?: string
  }
}
