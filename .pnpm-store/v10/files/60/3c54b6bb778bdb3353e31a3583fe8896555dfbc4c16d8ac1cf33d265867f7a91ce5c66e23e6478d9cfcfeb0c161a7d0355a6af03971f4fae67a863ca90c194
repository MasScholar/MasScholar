import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, h, inject, mergeModels, mergeProps, normalizeClass, normalizeStyle, onMounted, onUnmounted, openBlock, provide, ref, renderSlot, shallowRef, unref, useModel, watch, watchEffect } from "vue";
import { defaultDocument, defaultWindow, reactiveOmit, useEventListener, usePrevious } from "@vueuse/core";
import { useForwardProps } from "reka-ui";

//#region src/NoSciptCssFallback.ts
const NOSCRIPT_CSS_FALLBACK = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;
const NoSciptCssFallback = defineComponent({
	props: { fallback: {
		type: String,
		required: true
	} },
	setup(props) {
		return () => h("noscript", { innerHTML: `<style>${props.fallback}</style>` });
	}
});

//#endregion
//#region src/symbols.ts
const PublicVueOTPContextKey = Symbol("vue-otp-context");

//#endregion
//#region src/sync-timeouts.ts
function syncTimeouts(cb) {
	return [
		setTimeout(cb, 0),
		setTimeout(cb, 10),
		setTimeout(cb, 50)
	];
}

//#endregion
//#region src/use-pwm-badge.ts
const PWM_BADGE_MARGIN_RIGHT = 18;
const PWM_BADGE_SPACE_WIDTH_PX = 40;
const PWM_BADGE_SPACE_WIDTH = `${PWM_BADGE_SPACE_WIDTH_PX}px`;
const PASSWORD_MANAGERS_SELECTORS = [
	"[data-lastpass-icon-root]",
	"com-1password-button",
	"[data-dashlanecreated]",
	"[style$=\"2147483647 !important;\"]"
].join(",");
function usePasswordManagerBadge({ containerRef, inputRef, pushPasswordManagerStrategy, isFocused }) {
	const pwmMetadata = ref({
		done: false,
		refocused: false
	});
	const hasPWMBadge = ref(false);
	const hasPWMBadgeSpace = ref(false);
	const done = ref(false);
	const willPushPWMBadge = computed(() => {
		if (pushPasswordManagerStrategy === "none") return false;
		return (pushPasswordManagerStrategy === "increase-width" || pushPasswordManagerStrategy === "experimental-no-flickering") && hasPWMBadge.value && hasPWMBadgeSpace.value;
	});
	const trackPWMBadge = () => {
		const container = containerRef.value;
		const input = inputRef.value;
		if (!container || !input || done.value || pushPasswordManagerStrategy === "none") return;
		const elementToCompare = container;
		const rightCornerX = elementToCompare.getBoundingClientRect().left + elementToCompare.offsetWidth;
		const centereredY = elementToCompare.getBoundingClientRect().top + elementToCompare.offsetHeight / 2;
		const x = rightCornerX - PWM_BADGE_MARGIN_RIGHT;
		const y = centereredY;
		if (document.querySelectorAll(PASSWORD_MANAGERS_SELECTORS).length === 0) {
			if (document.elementFromPoint(x, y) === container) return;
		}
		hasPWMBadge.value = true;
		done.value = true;
		if (!pwmMetadata.value.refocused && document.activeElement === input) {
			const sel = [input.selectionStart, input.selectionEnd];
			input.blur();
			input.focus();
			input.setSelectionRange(sel[0], sel[1]);
			pwmMetadata.value.refocused = true;
		}
	};
	const checkHasSpace = () => {
		const container = containerRef.value;
		if (!container || pushPasswordManagerStrategy === "none") return;
		hasPWMBadgeSpace.value = window.innerWidth - container.getBoundingClientRect().right >= PWM_BADGE_SPACE_WIDTH_PX;
	};
	let spaceInterval;
	onMounted(() => {
		checkHasSpace();
		spaceInterval = setInterval(checkHasSpace, 1e3);
	});
	onUnmounted(() => {
		clearInterval(spaceInterval);
	});
	watch([isFocused, inputRef], (newValues, _, onInvalidate) => {
		const [newIsFocused, newInputRef] = newValues;
		const _isFocused = newIsFocused || document.activeElement === newInputRef;
		if (pushPasswordManagerStrategy === "none" || !_isFocused) return;
		const t1 = setTimeout(trackPWMBadge, 0);
		const t2 = setTimeout(trackPWMBadge, 2e3);
		const t3 = setTimeout(trackPWMBadge, 5e3);
		const t4 = setTimeout(() => {
			done.value = true;
		}, 6e3);
		onInvalidate(() => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
			clearTimeout(t4);
		});
	});
	return {
		hasPWMBadge,
		willPushPWMBadge,
		PWM_BADGE_SPACE_WIDTH
	};
}

//#endregion
//#region src/OTPInput.vue
const _hoisted_1 = { style: {
	"position": "absolute",
	"inset": "0",
	"pointer-events": "none"
} };
const _hoisted_2 = [
	"value",
	"data-input-otp-placeholder-shown",
	"data-input-otp-mss",
	"data-input-otp-mse",
	"aria-placeholder",
	"pattern"
];
const _sfc_main = /* @__PURE__ */ defineComponent({
	name: "OTPInput",
	inheritAttrs: false,
	__name: "OTPInput",
	props: /* @__PURE__ */ mergeModels({
		maxlength: {},
		textAlign: { default: "left" },
		inputmode: { default: "numeric" },
		containerClass: {},
		pushPasswordManagerStrategy: { default: "increase-width" },
		noScriptCssFallback: { default: NOSCRIPT_CSS_FALLBACK },
		defaultValue: { default: "" },
		pasteTransformer: {},
		accept: {},
		alt: {},
		autocomplete: { default: "one-time-code" },
		autofocus: { type: Boolean },
		capture: { type: [Boolean, String] },
		checked: { type: [
			Boolean,
			Array,
			Set
		] },
		crossorigin: {},
		disabled: { type: Boolean },
		enterKeyHint: {},
		form: {},
		formaction: {},
		formenctype: {},
		formmethod: {},
		formnovalidate: { type: Boolean },
		formtarget: {},
		height: {},
		indeterminate: { type: Boolean },
		list: {},
		max: {},
		min: {},
		minlength: {},
		multiple: { type: Boolean },
		name: {},
		pattern: {},
		placeholder: {},
		readonly: { type: Boolean },
		required: { type: Boolean },
		size: {},
		src: {},
		step: {},
		type: {},
		value: {},
		width: {}
	}, {
		"modelValue": { default(props) {
			return props.defaultValue;
		} },
		"modelModifiers": {}
	}),
	emits: /* @__PURE__ */ mergeModels([
		"complete",
		"change",
		"select",
		"input",
		"focus",
		"blur",
		"mouseover",
		"mouseleave",
		"paste"
	], ["update:modelValue"]),
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const [internalValue] = useModel(__props, "modelValue");
		const previousValue = usePrevious(internalValue);
		const regexp = computed(() => props.pattern ? typeof props.pattern === "string" ? new RegExp(props.pattern) : props.pattern : null);
		const isHoveringInput = shallowRef(false);
		const isFocused = shallowRef(false);
		const mirrorSelectionStart = shallowRef(null);
		const mirrorSelectionEnd = shallowRef(null);
		const inputRef = shallowRef(null);
		const containerRef = shallowRef(null);
		const isIOS = defaultWindow?.CSS?.supports?.("-webkit-touch-callout", "none");
		let inputMetadataRef = { prev: [
			inputRef.value?.selectionStart,
			inputRef.value?.selectionEnd,
			inputRef.value?.selectionDirection
		] };
		function safeInsertRule(sheet, rule) {
			try {
				sheet.insertRule(rule);
			} catch {
				console.error("input-otp could not insert CSS rule:", rule);
			}
		}
		onMounted(() => {
			const input = inputRef.value;
			const container = containerRef.value;
			if (!input || !container) return;
			inputMetadataRef.prev = [
				input.selectionStart,
				input.selectionEnd,
				input.selectionDirection ?? "none"
			];
			const removeSelectionchangeListener = useEventListener(defaultDocument, "selectionchange", onDocumentSelectionChange, { capture: true });
			function onDocumentSelectionChange() {
				if (!input) return;
				if (defaultDocument?.activeElement !== input) {
					mirrorSelectionStart.value = null;
					mirrorSelectionEnd.value = null;
					return;
				}
				const _s = input.selectionStart;
				const _e = input.selectionEnd;
				const _dir = input.selectionDirection;
				const _ml = input.maxLength;
				const _val = input.value;
				const _prev = inputMetadataRef.prev;
				let start = -1;
				let end = -1;
				let direction = void 0;
				if (_val.length !== 0 && _s !== null && _e !== null) {
					const isSingleCaret = _s === _e;
					const isInsertMode = _s === _val.length && _val.length < _ml;
					if (isSingleCaret && !isInsertMode) {
						const c = _s;
						if (c === 0) {
							start = 0;
							end = 1;
							direction = "forward";
						} else if (c === _ml) {
							start = c - 1;
							end = c;
							direction = "backward";
						} else if (_ml > 1 && _val.length > 1) {
							let offset = 0;
							if (_prev[0] !== null && _prev[1] !== null) {
								direction = c < _prev[1] ? "backward" : "forward";
								const wasPreviouslyInserting = _prev[0] === _prev[1] && _prev[0] < _ml;
								if (direction === "backward" && !wasPreviouslyInserting) offset = -1;
							}
							start = offset + c;
							end = offset + c + 1;
						}
					}
					if (start !== -1 && end !== -1 && start !== end) input.setSelectionRange(start, end, direction);
				}
				const s = start !== -1 ? start : _s;
				const e = end !== -1 ? end : _e;
				const dir = direction ?? _dir;
				mirrorSelectionStart.value = s;
				mirrorSelectionEnd.value = e;
				inputMetadataRef.prev = [
					s,
					e,
					dir
				];
			}
			onDocumentSelectionChange();
			if (defaultDocument?.activeElement === input) isFocused.value = true;
			if (!defaultDocument?.getElementById("input-otp-style")) {
				const styleEl = defaultDocument?.createElement("style");
				styleEl.id = "input-otp-style";
				defaultDocument?.head.appendChild(styleEl);
				if (styleEl.sheet) {
					const autofillStyles = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
					safeInsertRule(styleEl.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }");
					safeInsertRule(styleEl.sheet, `[data-input-otp]:autofill { ${autofillStyles} }`);
					safeInsertRule(styleEl.sheet, `[data-input-otp]:-webkit-autofill { ${autofillStyles} }`);
					safeInsertRule(styleEl.sheet, `@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`);
					safeInsertRule(styleEl.sheet, `[data-input-otp] + * { pointer-events: all !important; }`);
				}
			}
			const updateRootHeight = () => {
				if (container) container.style.setProperty("--root-height", `${input.clientHeight}px`);
			};
			updateRootHeight();
			const resizeObserver = new ResizeObserver(updateRootHeight);
			resizeObserver.observe(input);
			onUnmounted(() => {
				removeSelectionchangeListener();
				resizeObserver.disconnect();
			});
		});
		watch([internalValue], () => {
			syncTimeouts(() => {
				if (!inputRef.value) return;
				inputRef.value?.dispatchEvent(new Event("input"));
				const s = inputRef.value?.selectionStart;
				const e = inputRef.value?.selectionEnd;
				const dir = inputRef.value?.selectionDirection;
				if (s !== null && e !== null) {
					mirrorSelectionStart.value = s ?? null;
					mirrorSelectionEnd.value = e ?? null;
					inputMetadataRef.prev = [
						s,
						e,
						dir
					];
				}
			});
		}, { immediate: true });
		watchEffect(() => {
			if (previousValue.value === void 0) return;
			if (internalValue.value !== previousValue.value && previousValue.value.length < props.maxlength && internalValue.value.length === props.maxlength) emit("complete", internalValue.value);
		});
		const pwmb = usePasswordManagerBadge({
			containerRef,
			inputRef,
			pushPasswordManagerStrategy: props.pushPasswordManagerStrategy,
			isFocused
		});
		function _beforeInputListener(e) {
			if (e.inputType === "insertText" && e.data !== null) {
				const target = e.currentTarget;
				const start = target.selectionStart ?? 0;
				const end = target.selectionEnd ?? 0;
				const currentValue = target.value;
				const newValue = (start !== end ? currentValue.slice(0, start) + e.data + currentValue.slice(end) : currentValue.slice(0, start) + e.data + currentValue.slice(start)).slice(0, props.maxlength);
				if (newValue.length > 0 && regexp.value && !regexp.value.test(newValue)) e.preventDefault();
			}
		}
		function _inputListener(e) {
			const newValue = e.currentTarget.value.slice(0, props.maxlength);
			if (newValue.length > 0 && regexp.value && !regexp.value.test(newValue)) {
				e.preventDefault();
				return;
			}
			if (typeof previousValue.value === "string" && newValue.length < previousValue.value.length) defaultDocument?.dispatchEvent(new Event("selectionchange"));
			internalValue.value = newValue;
			emit("input", newValue);
		}
		function _focusListener() {
			const input = inputRef.value;
			if (input) {
				const start = Math.min(input.value.length, props.maxlength - 1);
				const end = input.value.length;
				input.setSelectionRange(start, end);
				mirrorSelectionStart.value = start;
				mirrorSelectionEnd.value = end;
			}
			isFocused.value = true;
		}
		function _pasteListener(e) {
			const input = inputRef.value;
			if (!input) return;
			if (!props.pasteTransformer && (!isIOS || !e.clipboardData || !input)) return;
			const _content = e?.clipboardData?.getData("text/plain");
			const content = props?.pasteTransformer ? props.pasteTransformer(_content) : _content;
			e.preventDefault();
			const start = inputRef.value?.selectionStart;
			const end = inputRef.value?.selectionEnd;
			const newValue = (start !== end ? internalValue.value.slice(0, start) + content + internalValue.value.slice(end) : internalValue.value.slice(0, start) + content + internalValue.value.slice(start)).slice(0, props.maxlength);
			if (newValue.length > 0 && regexp.value && !regexp.value.test(newValue)) return;
			internalValue.value = newValue;
			emit("input", newValue);
			const _start = Math.min(newValue.length, props.maxlength - 1);
			const _end = newValue.length;
			input?.setSelectionRange(_start, _end);
			mirrorSelectionStart.value = _start;
			mirrorSelectionEnd.value = _end;
		}
		const inputProps = useForwardProps(reactiveOmit(props, "containerClass", "value", "pattern", "defaultValue", "pushPasswordManagerStrategy", "noScriptCssFallback", "modelValue"));
		const rootStyle = computed(() => ({
			position: "relative",
			cursor: props.disabled ? "default" : "text",
			userSelect: "none",
			WebkitUserSelect: "none",
			pointerEvents: "none"
		}));
		const inputStyle = computed(() => ({
			position: "absolute",
			inset: 0,
			width: pwmb.willPushPWMBadge.value ? `calc(100% + ${pwmb.PWM_BADGE_SPACE_WIDTH})` : "100%",
			clipPath: pwmb.willPushPWMBadge.value ? `inset(0 ${pwmb.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0,
			height: "100%",
			display: "flex",
			textAlign: props.textAlign,
			opacity: "1",
			color: "transparent",
			pointerEvents: "all",
			background: "transparent",
			caretColor: "transparent",
			border: "0 solid transparent",
			outline: "0 solid transparent",
			boxShadow: "none",
			lineHeight: "1",
			letterSpacing: "-.5em",
			fontSize: "var(--root-height)",
			fontFamily: "monospace",
			fontVariantNumeric: "tabular-nums"
		}));
		const contextValue = computed(() => {
			return {
				slots: Array.from({ length: Number(props.maxlength) }).map((_, slotIdx) => {
					const isActive = isFocused.value && mirrorSelectionStart.value !== null && mirrorSelectionEnd.value !== null && (mirrorSelectionStart.value === mirrorSelectionEnd.value && slotIdx === mirrorSelectionStart.value || slotIdx >= mirrorSelectionStart.value && slotIdx < mirrorSelectionEnd.value);
					const char = internalValue.value[slotIdx] !== void 0 ? internalValue.value[slotIdx] : null;
					return {
						char,
						placeholderChar: char ?? props?.placeholder?.[slotIdx] ?? null,
						isActive,
						hasFakeCaret: isActive && char === null
					};
				}),
				isFocused: isFocused.value,
				isHovering: !props.disabled && isHoveringInput.value
			};
		});
		provide(PublicVueOTPContextKey, contextValue);
		__expose(Object.defineProperty({}, "$el", {
			enumerable: true,
			configurable: true,
			get: () => inputRef
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [__props.noScriptCssFallback !== null ? (openBlock(), createBlock(unref(NoSciptCssFallback), {
				key: 0,
				fallback: __props.noScriptCssFallback
			}, null, 8, ["fallback"])) : createCommentVNode("v-if", true), createElementVNode("div", {
				ref_key: "containerRef",
				ref: containerRef,
				"data-input-otp-container": "",
				style: normalizeStyle(rootStyle.value),
				class: normalizeClass(__props.containerClass)
			}, [renderSlot(_ctx.$slots, "default", {
				slots: contextValue.value.slots,
				isFocused: isFocused.value,
				isHovering: !__props.disabled && isHoveringInput.value
			}), createElementVNode("div", _hoisted_1, [createElementVNode("input", mergeProps({
				ref_key: "inputRef",
				ref: inputRef,
				value: unref(internalValue),
				"data-input-otp": "",
				"data-input-otp-placeholder-shown": unref(internalValue).length === 0 || void 0,
				"data-input-otp-mss": mirrorSelectionStart.value,
				"data-input-otp-mse": mirrorSelectionEnd.value,
				"aria-placeholder": __props.placeholder,
				style: inputStyle.value,
				pattern: regexp.value?.source
			}, {
				..._ctx.$attrs,
				...unref(inputProps)
			}, {
				onBeforeinput: _beforeInputListener,
				onMouseover: _cache[0] || (_cache[0] = (e) => {
					isHoveringInput.value = true;
					emit("mouseover", e);
				}),
				onMouseleave: _cache[1] || (_cache[1] = (e) => {
					isHoveringInput.value = false;
					emit("mouseleave", e);
				}),
				onPaste: _cache[2] || (_cache[2] = (e) => {
					_pasteListener(e);
					emit("paste", e);
				}),
				onInput: _inputListener,
				onFocus: _cache[3] || (_cache[3] = (e) => {
					_focusListener();
					emit("focus", e);
				}),
				onBlur: _cache[4] || (_cache[4] = (e) => {
					isFocused.value = false;
					emit("blur", e);
				})
			}), null, 16, _hoisted_2)])], 6)], 64);
		};
	}
});
var OTPInput_default = _sfc_main;

//#endregion
//#region src/regexp.ts
const REGEXP_ONLY_DIGITS = "^\\d+$";
const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$";
const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$";

//#endregion
//#region src/use-otp-context.ts
function useVueOTPContext() {
	return inject(PublicVueOTPContextKey);
}

//#endregion
export { OTPInput_default as OTPInput, PublicVueOTPContextKey, REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS, useVueOTPContext };