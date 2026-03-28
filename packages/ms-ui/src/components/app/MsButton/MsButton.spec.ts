import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MsButton from './MsButton.vue';

describe('MsButton', () => {
  // 基础渲染测试
  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(MsButton, {
        slots: {
          default: 'Click me'
        }
      });
      expect(wrapper.text()).toBe('Click me');
      expect(wrapper.find('button').exists()).toBe(true);
    });
  });

  // 变体测试
  describe('Variants', () => {
    it('applies default variant', () => {
      const wrapper = mount(MsButton);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('applies primary variant', () => {
      const wrapper = mount(MsButton, {
        props: { variant: 'primary' }
      });
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('applies ghost variant', () => {
      const wrapper = mount(MsButton, {
        props: { variant: 'ghost' }
      });
      expect(wrapper.find('button').exists()).toBe(true);
    });
  });

  // 尺寸测试
  describe('Sizes', () => {
    it('applies mini size', () => {
      const wrapper = mount(MsButton, {
        props: { size: 'mini' }
      });
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('applies small size', () => {
      const wrapper = mount(MsButton, {
        props: { size: 'small' }
      });
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('applies default size', () => {
      const wrapper = mount(MsButton, {
        props: { size: 'default' }
      });
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('applies large size', () => {
      const wrapper = mount(MsButton, {
        props: { size: 'large' }
      });
      expect(wrapper.find('button').exists()).toBe(true);
    });
  });

  // 模式测试
  describe('Modes', () => {
    it('renders text mode correctly', () => {
      const wrapper = mount(MsButton, {
        props: { mode: 'text' },
        slots: { default: 'Text Button' }
      });
      expect(wrapper.text()).toBe('Text Button');
      expect(wrapper.find('span').exists()).toBe(true);
    });

    it('renders icon mode correctly', () => {
      const wrapper = mount(MsButton, {
        props: { mode: 'icon' },
        slots: {
          icon: '<svg class="test-icon"></svg>'
        }
      });
      expect(wrapper.find('.test-icon').exists()).toBe(true);
    });

    it('renders icon-text mode correctly', () => {
      const wrapper = mount(MsButton, {
        props: { mode: 'icon-text' },
        slots: {
          default: 'Icon Text',
          icon: '<svg class="test-icon"></svg>'
        }
      });
      expect(wrapper.find('.test-icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('Icon Text');
    });
  });

  // 图标处理测试
  describe('Icon Handling', () => {
    it('renders SVG icon from string', () => {
      const svgIcon = '<svg class="test-icon"><path d="M12 5v14M5 12h14"/></svg>';
      const wrapper = mount(MsButton, {
        props: {
          mode: 'icon',
          icon: svgIcon
        }
      });
      expect(wrapper.find('.test-icon').exists()).toBe(true);
    });

    it('renders default icon when icon prop is provided', () => {
      const wrapper = mount(MsButton, {
        props: {
          mode: 'icon',
          icon: 'test-icon'
        }
      });
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('prioritizes icon slot over icon prop', () => {
      const wrapper = mount(MsButton, {
        props: {
          mode: 'icon',
          icon: 'default-icon'
        },
        slots: {
          icon: '<svg class="slot-icon"></svg>'
        }
      });
      expect(wrapper.find('.slot-icon').exists()).toBe(true);
      expect(wrapper.find('path').exists()).toBe(false); // 默认图标路径
    });
  });

  // 禁用状态测试
  describe('Disabled State', () => {
    it('applies disabled attribute when disabled is true', () => {
      const wrapper = mount(MsButton, {
        props: { disabled: true }
      });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(MsButton, {
        props: { disabled: true }
      });
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });
  });

  // 加载状态测试
  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      const wrapper = mount(MsButton, {
        props: { loading: true }
      });
      expect(wrapper.find('svg').exists()).toBe(true);
      expect(wrapper.find('svg').classes()).toContain('animate-spin');
    });

    it('applies disabled attribute when loading is true', () => {
      const wrapper = mount(MsButton, {
        props: { loading: true }
      });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it('does not emit click event when loading', async () => {
      const wrapper = mount(MsButton, {
        props: { loading: true }
      });
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('hides slot content when loading', () => {
      const wrapper = mount(MsButton, {
        props: { loading: true },
        slots: { default: 'Content' }
      });
      expect(wrapper.text()).not.toContain('Content');
    });
  });

  // 点击事件测试
  describe('Click Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(MsButton);
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('emits click event with mouse event payload', async () => {
      const wrapper = mount(MsButton);
      await wrapper.find('button').trigger('click');
      const emittedEvent = wrapper.emitted('click');
      expect(emittedEvent).toBeDefined();
      expect(emittedEvent![0][0]).toBeInstanceOf(MouseEvent);
    });
  });

  // 自定义类名测试
  describe('Custom Classes', () => {
    it('applies custom class when provided', () => {
      const wrapper = mount(MsButton, {
        props: { className: 'custom-class' }
      });
      expect(wrapper.find('button').classes()).toContain('custom-class');
    });
  });

  // 组合测试
  describe('Combinations', () => {
    it('renders primary large icon button correctly', () => {
      const wrapper = mount(MsButton, {
        props: {
          variant: 'primary',
          size: 'large',
          mode: 'icon'
        },
        slots: {
          icon: '<svg class="test-icon"></svg>'
        }
      });
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('.test-icon').exists()).toBe(true);
    });

    it('renders ghost mini icon-text button correctly', () => {
      const wrapper = mount(MsButton, {
        props: {
          variant: 'ghost',
          size: 'mini',
          mode: 'icon-text'
        },
        slots: {
          default: 'Delete',
          icon: '<svg class="test-icon"></svg>'
        }
      });
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('.test-icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('Delete');
    });
  });
});
