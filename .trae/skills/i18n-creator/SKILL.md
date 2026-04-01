---
name: "i18n-creator"
description: "Provides guidance for managing internationalization (i18n) in the MasScholar project. Invoke when user needs to add new translation keys, modify existing translations, add new language support, or implement i18n features in components."
---

# i18n Creator

This skill provides comprehensive guidance for managing internationalization (i18n) in the MasScholar project, following the established structure and best practices.

## Project Structure Overview

```
packages/ms-i18n/src/
├── locales/           # Translation files (JSON format)
│   ├── zh-CN.json    # Simplified Chinese (base schema)
│   ├── en-US.json    # English (US)
│   ├── en-ES.json    # English (Spain)
│   ├── ja-JP.json    # Japanese
│   ├── de-DE.json    # German
│   ├── fr-FR.json    # French
│   ├── pt-BR.json    # Portuguese (Brazil)
│   └── zh-Hant.json  # Traditional Chinese
└── index.ts          # i18n configuration and exports
```

## Supported Locales

| Locale Code | Language            | File           |
| ----------- | ------------------- | -------------- |
| `zh-CN`     | Simplified Chinese  | `zh-CN.json`   |
| `zh-Hant`   | Traditional Chinese | `zh-Hant.json` |
| `en-US`     | English (US)        | `en-US.json`   |
| `en-ES`     | English (Spain)     | `en-ES.json`   |
| `ja-JP`     | Japanese            | `ja-JP.json`   |
| `de-DE`     | German              | `de-DE.json`   |
| `fr-FR`     | French              | `fr-FR.json`   |
| `pt-BR`     | Portuguese (Brazil) | `pt-BR.json`   |

## Translation Schema Structure

All locale files follow a consistent nested structure:

```json
{
  "word": {
    "confirm": "Confirm",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "close": "Close",
    "submit": "Submit",
    "search": "Search",
    "loading": "Loading",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Info"
  },
  "phrase": {
    "confirmDelete": "Are you sure you want to delete?",
    "confirmSave": "Are you sure you want to save changes?",
    "loadingData": "Loading data...",
    "noData": "No data available",
    "operationSuccess": "Operation successful",
    "operationFailed": "Operation failed"
  },
  "sentence": {
    "welcomeMessage": "Welcome to MasScholar!",
    "loginPrompt": "Please log in to continue",
    "sessionExpired": "Your session has expired, please log in again"
  }
}
```

## i18n Development Workflow

### 1. Adding New Translation Keys

**Before adding new keys, check existing translations:**

1. Review `packages/ms-i18n/src/locales/zh-CN.json` for the base schema
2. Check if similar keys already exist in `word`, `phrase`, or `sentence` sections
3. Choose the appropriate category based on content type

**Key Naming Conventions:**

| Category   | Usage                             | Example                                |
| ---------- | --------------------------------- | -------------------------------------- |
| `word`     | Single words, buttons, labels     | `"save": "Save"`                       |
| `phrase`   | Short phrases, tooltips, messages | `"confirmDelete": "Confirm deletion?"` |
| `sentence` | Complete sentences, descriptions  | `"welcomeMessage": "Welcome!"`         |

**⚠️ Important Rules:**

- **Always use camelCase** for translation keys
- **Keep keys descriptive** but concise
- **Maintain consistency** across all locale files
- **zh-CN.json is the base schema** - add new keys here first

### 2. Adding Translations to All Locales

**When adding a new key, you MUST update ALL locale files:**

```json
// zh-CN.json (Base schema)
{
  "word": {
    "newFeature": "新功能"
  }
}

// en-US.json
{
  "word": {
    "newFeature": "New Feature"
  }
}

// ja-JP.json
{
  "word": {
    "newFeature": "新機能"
  }
}

// ... update all other locale files
```

### 3. Using i18n in Components

#### 3.1 Setup i18n in Component

```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

// Access translations
const confirmText = t("word.confirm");
const deleteMessage = t("phrase.confirmDelete");
</script>

<template>
  <button>{{ t("word.save") }}</button>
  <p>{{ t("sentence.welcomeMessage") }}</p>
</template>
```

#### 3.2 Using with Props

```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface Props {
  labelKey?: string;
  defaultLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: "",
  defaultLabel: "",
});

// Resolve translation or fallback to default
const resolvedLabel = computed(() => {
  return props.labelKey ? t(props.labelKey) : props.defaultLabel;
});
</script>
```

### 4. Language Toggle Implementation

**Use the existing `MsLanguageToggle` component:**

```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { LocaleType } from "@masscholar/i18n";

const { locale } = useI18n();

function handleLanguageChange(langCode: string) {
  locale.value = langCode as LocaleType;
  // Optional: Persist to localStorage
  localStorage.setItem("user-locale", langCode);
}
</script>

<template>
  <MsLanguageToggle
    :lang-code="locale"
    @update:lang-code="handleLanguageChange"
  />
</template>
```

### 5. Adding a New Language Support

**To add support for a new language:**

1. **Create new locale file** in `packages/ms-i18n/src/locales/`
   - Filename format: `<language>-<REGION>.json` (e.g., `ko-KR.json`)

2. **Update `index.ts`** to import and register the new locale:

```typescript
// packages/ms-i18n/src/index.ts
import koKR from "./locales/ko-KR.json";

export type LocaleType =
  | "en-US"
  | "en-ES"
  | "ja-JP"
  | "zh-CN"
  | "de-DE"
  | "fr-FR"
  | "pt-BR"
  | "zh-Hant"
  | "ko-KR";

export const locales: Record<LocaleType, any> = {
  "en-US": enUS,
  "en-ES": enES,
  "ja-JP": jaJP,
  "zh-CN": zhCN,
  "de-DE": deDE,
  "fr-FR": frFR,
  "pt-BR": ptBR,
  "zh-Hant": zhHant,
  "ko-KR": koKR, // Add new locale
};
```

3. **Update `MsLanguageToggle`** component to include the new language flag mapping:

```typescript
// packages/ms-ui/src/components/app/MsLanguageToggle/MsLanguageToggle.vue
const langToFlag: Record<string, string> = {
  "zh-CN": "🇨🇳",
  "en-US": "🇺🇸",
  "ja-JP": "🇯🇵",
  "fr-FR": "🇫🇷",
  "de-DE": "🇩🇪",
  "pt-BR": "🇧🇷",
  "ko-KR": "🇰🇷", // Add new language flag
};
```

### 6. Interpolation and Pluralization

**Variable Interpolation:**

```json
// locale file
{
  "sentence": {
    "greeting": "Hello, {name}!"
  }
}
```

```vue
<script setup>
const { t } = useI18n();
const username = "John";
</script>

<template>
  <p>{{ t("sentence.greeting", { name: username }) }}</p>
  <!-- Output: Hello, John! -->
</template>
```

**Pluralization:**

```json
// locale file
{
  "sentence": {
    "itemCount": "No items | One item | {count} items"
  }
}
```

```vue
<template>
  <p>{{ t("sentence.itemCount", 0) }}</p>
  <!-- No items -->
  <p>{{ t("sentence.itemCount", 1) }}</p>
  <!-- One item -->
  <p>{{ t("sentence.itemCount", 5) }}</p>
  <!-- 5 items -->
</template>
```

### 7. Best Practices

- **Keep translations organized** in `word`, `phrase`, and `sentence` categories
- **Use nested keys** for related translations (e.g., `word.button.save`, `word.button.cancel`)
- **Avoid hardcoding** text in components - always use translation keys
- **Test all locales** when adding or modifying translations
- **Maintain zh-CN.json as the source of truth** for the schema structure
- **Use meaningful key names** that describe the content, not the location

### 8. Common Translation Keys Reference

**Common `word` keys:**

- `word.confirm` - Confirmation button
- `word.cancel` - Cancel button
- `word.save` - Save button
- `word.delete` - Delete button
- `word.edit` - Edit button
- `word.create` - Create button
- `word.close` - Close button
- `word.search` - Search button/placeholder

**Common `phrase` keys:**

- `phrase.confirmDelete` - Delete confirmation
- `phrase.confirmSave` - Save confirmation
- `phrase.loadingData` - Loading state
- `phrase.noData` - Empty state
- `phrase.operationSuccess` - Success message
- `phrase.operationFailed` - Error message

**Common `sentence` keys:**

- `sentence.welcomeMessage` - Welcome greeting
- `sentence.loginPrompt` - Login prompt
- `sentence.sessionExpired` - Session expired message
