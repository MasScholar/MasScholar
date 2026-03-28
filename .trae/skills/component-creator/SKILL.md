---
name: "component-creator"
description: "Provides guidance for creating and modifying Vue components in the MasScholar project. Invoke when user needs to add new components or modify existing ones, following the project's structure and best practices."
---

# Component Creator

This skill provides comprehensive guidance for creating and modifying Vue components in the MasScholar project, following the established structure and best practices.

## Project Structure Overview

```
packages/ms-ui/src/
├── components/
│   ├── ui/           # Base component library (DO NOT MODIFY)
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── input/
│   │   └── ...       # 60+ base components
│   └── app/          # Business component library (new components go here)
│       ├── MsButton/
│       ├── MsThemeToggle/
│       ├── MsCategoryTabs/
│       └── ...
└── stories/
    └── components/   # Story files location
        ├── MsButton.stories.ts
        └── ...
```

## Component Development Workflow

### 1. Component Planning & Reuse Check

**Before creating a new component, you MUST perform the following checks:**

1. **Check `components/app/` directory**: Whether a similar business component already exists
2. **Check `components/ui/` directory**: Whether a reusable base component is available

**Reuse Decision Matrix:**

| Scenario                                      | Action                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| Similar component exists in `components/app/` | Extend the existing component, do not create new                              |
| `components/ui/` meets requirements           | Reuse directly, or wrap it into `components/app/`                             |
| `components/ui/` does not meet requirements   | Create a new wrapper component in `components/app/` based on `components/ui/` |
| No available component found                  | Create a brand new component in `components/app/`                             |

**⚠️ Important Rules:**

- **Components in `components/ui/` are FORBIDDEN to modify**: This is the base component library, keep it stable
- **Extend before creating new**: Prioritize extending existing components to avoid reinventing the wheel

### 2. Directory Structure Standards

**All new components MUST be placed in `packages/ms-ui/src/components/app/<ComponentName>/` directory**

Standard file structure:

```
MsComponentName/
├── MsComponentName.vue      # Main component file (REQUIRED)
├── MsComponentName.spec.ts  # Test file (REQUIRED)
├── index.ts                 # Export file (REQUIRED)
└── types.ts                 # Type definitions (OPTIONAL)
```

**Naming Conventions:**

- Directory name: PascalCase (e.g., `MsButton`, `MsCategoryTabs`)
- Component name: PascalCase with `Ms` prefix
- Test file: `<ComponentName>.spec.ts`

### 3. Story File Location

**Component Story files MUST be placed in `packages/ms-ui/src/stories/components/` directory**

- Story file name format: `<ComponentName>.stories.ts`
- Example: `MsButton.stories.ts`

### 4. Component Implementation Standards

#### 4.1 Basic Template Structure

```vue
<script setup lang="ts">
import type { HTMLAttributes } from "vue";
// Import base components from components/ui first
import { Button } from "@/components/ui/button";
import type { ButtonVariants } from "@/components/ui/button";

interface Props {
  variant?: "default" | "primary" | "danger" | "outline" | "secondary";
  size?: "mini" | "small" | "default" | "large";
  className?: HTMLAttributes["class"];
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  className: undefined,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Component logic
</script>

<template>
  <!-- Template content -->
</template>
```

#### 4.2 Code Standards

- Use Vue 3 Composition API + `<script setup lang="ts">`
- Use TypeScript interfaces to define Props
- Use `withDefaults` for default values
- Use typed event emissions
- Use Tailwind CSS for styling

#### 4.3 Wrapping UI Components

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type { ButtonVariants } from "@/components/ui/button";

// Map business variants to base component variants
const getButtonVariant = (variant: string): ButtonVariants["variant"] => {
  const variantMap: Record<string, ButtonVariants["variant"]> = {
    default: "default",
    primary: "default",
    danger: "destructive",
    outline: "outline",
    secondary: "secondary",
    ghost: "ghost",
    link: "link",
  };
  return variantMap[variant] || "default";
};
</script>

<template>
  <Button
    :variant="getButtonVariant(variant)"
    :class="[
      // Business-specific style overrides
      { 'bg-blue-600 hover:bg-blue-700': variant === 'primary' },
    ]"
  >
    <slot />
  </Button>
</template>
```

### 5. Export File Standards

**`index.ts` file format:**

```typescript
export { default as MsComponentName } from "./MsComponentName.vue";
export { default } from "./MsComponentName.vue";
```

**Register in `components/app/index.ts`:**

```typescript
export { MsComponentName } from "./MsComponentName";
// Add to existing export list
```

### 6. Testing Standards

**Test files MUST be written simultaneously to ensure test coverage**

Test file: `MsComponentName.spec.ts`

```typescript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MsComponentName from "./MsComponentName.vue";

describe("MsComponentName", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders correctly with default props", () => {
      const wrapper = mount(MsComponentName);
      expect(wrapper.exists()).toBe(true);
    });
  });

  // Props tests
  describe("Props", () => {
    it("applies variant correctly", () => {
      const wrapper = mount(MsComponentName, {
        props: { variant: "primary" },
      });
      // Assertions
    });
  });

  // Event tests
  describe("Events", () => {
    it("emits click event", async () => {
      const wrapper = mount(MsComponentName);
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });
  });

  // Slot tests
  describe("Slots", () => {
    it("renders default slot", () => {
      const wrapper = mount(MsComponentName, {
        slots: { default: "Slot Content" },
      });
      expect(wrapper.text()).toContain("Slot Content");
    });
  });
});
```

**Testing Requirements:**

- Test all Props variants
- Test all event emissions
- Test slot rendering
- Test edge cases

### 7. Storybook Documentation Standards

**Story files MUST be placed in `packages/ms-ui/src/stories/components/` directory**

```typescript
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { MsComponentName } from "@masscholar/ui";

const meta = {
  title: "Components/MsComponentName",
  component: MsComponentName,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "danger", "outline"],
      description: "Component variant",
    },
    size: {
      control: "select",
      options: ["mini", "small", "default", "large"],
      description: "Component size",
    },
    disabled: {
      control: "boolean",
      description: "Whether disabled",
    },
  },
} satisfies Meta<typeof MsComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default example
export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
  },
  render: (args) => ({
    components: { MsComponentName },
    setup() {
      return { args };
    },
    template: '<MsComponentName v-bind="args">Content</MsComponentName>',
  }),
};

// Other variant examples
export const Primary: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => ({
    components: { MsComponentName },
    setup() {
      return { args };
    },
    template: '<MsComponentName v-bind="args">Primary</MsComponentName>',
  }),
};
```

**Story Requirements:**

- Include stories for all variants
- Provide interactive controls
- Document component API

## Best Practices

### Code Structure

- Use `<script setup lang="ts">` for better TypeScript support
- Define clear Prop interfaces with validation
- Use `withDefaults` for default Prop values
- Use typed event emissions

### Component Extensibility

- Extend existing UI components when possible
- Use slots for maximum customization
- Provide flexible Prop interfaces
- Follow the project's design system

### Accessibility

- Implement proper keyboard navigation
- Add appropriate ARIA attributes
- Ensure sufficient color contrast
- Test with screen readers

### Performance

- Use proper memoization for expensive operations
- Optimize component re-renders
- Use virtual scrolling for large lists
- Lazy load heavy components

## Available Base Components List

The following base components are included in `components/ui/` (partial list):

- **General**: button, badge, card, avatar, skeleton, spinner
- **Forms**: input, textarea, checkbox, radio-group, select, switch, slider
- **Navigation**: breadcrumb, tabs, navigation-menu, pagination
- **Feedback**: alert, dialog, drawer, popover, tooltip, toast (sonner)
- **Data Display**: table, calendar, chart, carousel
- **Menus**: dropdown-menu, context-menu, menubar
- **Others**: accordion, collapsible, separator, scroll-area

**For the complete list, check `packages/ms-ui/src/components/ui/` directory**

## Common Issues and Solutions

### Type Errors

- Ensure all Props are properly typed
- Use TypeScript interfaces for complex types
- Check type compatibility with extended components

### Styling Issues

- Use Tailwind's utility classes consistently
- Ensure responsive design across breakpoints
- Test in both light and dark modes

### Test Failures

- Ensure all test cases are properly written
- Mock dependencies when necessary
- Test edge cases and error conditions

## Usage Guidelines

1. **Plan first**: Define component requirements and API before coding
2. **Check first**: Confirm whether similar components exist for reuse
3. **Follow structure**: Use the established directory structure
4. **Extend when possible**: Extend existing UI components
5. **Test thoroughly**: Write comprehensive tests
6. **Document well**: Create detailed Storybook stories
7. **Build and verify**: Run `pnpm build` to perform type checking and build, then fix any errors
8. **Follow best practices**: Adhere to Vue 3 and TypeScript best practices

### Build Verification Step

**After adding a new component, you MUST run the build command:**

```bash
cd packages/ms-ui
pnpm build
```

This command performs:

- TypeScript type checking (`vue-tsc -b`)
- Vite build process

**If errors occur:**

1. Fix all TypeScript type errors
2. Fix any build configuration issues
3. Ensure all imports are valid
4. Re-run `pnpm build` until it succeeds

**Common build errors and solutions:**

- **Type errors**: Check Props interfaces and type imports
- **Missing exports**: Ensure component is exported in `components/app/index.ts`
- **Import errors**: Verify import paths are correct
- **Dependency issues**: Run `pnpm install` if needed

This workflow ensures consistent, maintainable, and high-quality components that integrate seamlessly with the existing codebase.
