import * as vue0 from "vue";
import { ComputedRef, InjectionKey } from "vue";

//#region src/types.d.ts
interface InputHTMLAttributes {
  accept?: string;
  alt?: string;
  autocomplete?: string;
  autofocus?: boolean;
  capture?: boolean | 'user' | 'environment';
  checked?: boolean | any[] | Set<any>;
  crossorigin?: string;
  disabled?: boolean;
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  height?: number;
  indeterminate?: boolean;
  list?: string;
  max?: number;
  maxlength?: number;
  min?: number;
  minlength?: number;
  multiple?: boolean;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: number;
  src?: string;
  step?: number;
  type?: string;
  value?: any;
  width?: number;
}
interface OTPInputProps extends InputHTMLAttributes {
  maxlength: number;
  textAlign?: 'left' | 'center' | 'right';
  inputmode?: 'numeric' | 'text';
  containerClass?: string;
  pushPasswordManagerStrategy?: 'increase-width' | 'none';
  noScriptCssFallback?: string | null;
  defaultValue?: any;
  pasteTransformer?: (pasted: string | undefined) => string;
}
interface OTPInputEmits {
  (event: 'complete', value: string): void;
  (event: 'change', e: Event): void;
  (event: 'select', e: Event): void;
  (event: 'input', value: string): void;
  (event: 'focus', e: FocusEvent): void;
  (event: 'blur', e: FocusEvent): void;
  (event: 'mouseover', e: MouseEvent): void;
  (event: 'mouseleave', e: MouseEvent): void;
  (event: 'paste', e: ClipboardEvent): void;
}
interface SlotProps {
  isActive: boolean;
  char: string | null;
  placeholderChar: string | null;
  hasFakeCaret: boolean;
}
interface RenderProps {
  slots: SlotProps[];
  isFocused: boolean;
  isHovering: boolean;
}
//#endregion
//#region src/OTPInput.vue.d.ts
type __VLS_Props = OTPInputProps;
type __VLS_ModelProps = {
  modelValue?: string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_7: {
  slots: SlotProps[];
  isFocused: boolean;
  isHovering: boolean;
};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: vue0.DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, vue0.ComponentOptionsMixin, vue0.ComponentOptionsMixin, {
  "update:modelValue": (value: string | undefined) => any;
} & {
  complete: (value: string) => any;
  change: (e: Event) => any;
  select: (e: Event) => any;
  input: (value: string) => any;
  focus: (e: FocusEvent) => any;
  blur: (e: FocusEvent) => any;
  mouseover: (e: MouseEvent) => any;
  mouseleave: (e: MouseEvent) => any;
  paste: (e: ClipboardEvent) => any;
}, string, vue0.PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
  "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
  onComplete?: ((value: string) => any) | undefined;
  onChange?: ((e: Event) => any) | undefined;
  onSelect?: ((e: Event) => any) | undefined;
  onInput?: ((value: string) => any) | undefined;
  onFocus?: ((e: FocusEvent) => any) | undefined;
  onBlur?: ((e: FocusEvent) => any) | undefined;
  onMouseover?: ((e: MouseEvent) => any) | undefined;
  onMouseleave?: ((e: MouseEvent) => any) | undefined;
  onPaste?: ((e: ClipboardEvent) => any) | undefined;
}>, {
  textAlign: "left" | "center" | "right";
  inputmode: "numeric" | "text";
  pushPasswordManagerStrategy: "increase-width" | "none";
  noScriptCssFallback: string | null;
  defaultValue: any;
  autocomplete: string;
}, {}, {}, {}, string, vue0.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
//#region src/regexp.d.ts
declare const REGEXP_ONLY_DIGITS = "^\\d+$";
declare const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$";
declare const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$";
//#endregion
//#region src/symbols.d.ts
declare const PublicVueOTPContextKey: InjectionKey<ComputedRef<RenderProps>>;
//#endregion
//#region src/use-otp-context.d.ts
declare function useVueOTPContext(): vue0.ComputedRef<RenderProps> | undefined;
//#endregion
export { _default as OTPInput, type OTPInputEmits, type OTPInputProps, PublicVueOTPContextKey, REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS, type RenderProps, type SlotProps, useVueOTPContext };