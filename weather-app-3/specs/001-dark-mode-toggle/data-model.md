# Data Model: Dark Mode Toggle

**Date**: 2026-04-21

## Entities

### ThemePreference

Represents the user's selected color scheme.

| Attribute | Type | Description |
|-----------|------|-------------|
| value | `"light"` \| `"dark"` | The active theme mode |

**Storage**: `localStorage` key `"theme"`

**State transitions**:

```
[No stored value] → detect OS preference → apply ("light" or "dark")
[Stored value exists] → read from localStorage → apply
[User toggles] → flip current value → write to localStorage → apply to DOM
```

**Priority rules**:
1. localStorage value (manual selection) — highest priority
2. OS `prefers-color-scheme` — used when no localStorage value
3. `"light"` — fallback when neither source is available

### CSS Custom Properties (affected by theme)

The following `:root` variables get overridden under `[data-theme="dark"]`:

| Variable | Light value | Dark value (MD3) | Usage |
|----------|-------------|------------------|-------|
| `--md-bg` | `#fffbfe` | `#1c1b1f` | Page background |
| `--md-surface` | `#ffffff` | `#2b2930` | Cards, header |
| `--md-surface-dim` | `#f4f0f4` | `#141218` | Dimmed surfaces |
| `--md-primary` | `#6750a4` | `#d0bcff` | Accent color |
| `--md-on-primary` | `#ffffff` | `#381e72` | Text on primary |
| `--md-secondary` | `#625b71` | `#ccc2dc` | Secondary elements |
| `--md-tertiary` | `#7d5260` | `#efb8c8` | Tertiary elements |
| `--md-error` | `#b3261e` | `#f2b8b5` | Error states |
| `--md-text` | `#1c1b1f` | `#e6e1e5` | Primary text |
| `--md-text-muted` | `#49454f` | `#cac4d0` | Secondary text |
| `--md-outline` | `#79747e` | `#938f99` | Borders |
| `--md-outline-var` | `#cac4d0` | `#49454f` | Variant borders |
