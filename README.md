<p align="center" style="margin: 4rem">
  <p align="center">
      <img src="https://api.iconify.design/logos/vue.svg" alt="Vue" height="32" />  
      <img src="https://api.iconify.design/logos/storybook-icon.svg" height="32" />
  </p>
  <h1 align="center">Vue Slots Addon</h1>

  <h3 align="center">
    <a href="https://www.npmjs.com/package/storybook-addon-vue-slots">
      <img src="https://img.shields.io/npm/v/storybook-addon-vue-slots?style=flat-square" alt="version" />
    </a>
    <a href="https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md">
      <img src="https://raw.githubusercontent.com/JoJk0/StandWithUkraine/patch-1/badges/StandWithUkraineFlat.svg" alt="version" />
    </a>    
  </h3>
</p>

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine/)

Enables to use Vue slots inside Storybook's CSF files.

## Features

- Vue 3 support
- Generate code snippets for stories with slots
- Control specific aspect of the slot via Storybook's controls
- Wrap slot content with components

## 📦 Installation

```sh
pnpm add -D storybook-addon-vue-slots
```

Add the `storybook-addon-vue-slots` to your plugins in `main.ts` file:

```ts
// .storybook/main.ts
export default {
  // ...
  addons: [
    // ...
    'storybook-addon-vue-slots',
  ],
} satisfies StorybookConfig
```

## Examples

Run:

```zsh
npm run storybook
```

To run an example Storybook

## Usage

### Zero

By default, the addon will pass the `[slotName]` arg to the template, e.x. `{{ args.default }}`.

### Basic

Add a description to the slot by passing a string to the slot definition:

```ts
// MyComponent.stories.ts

export default meta = {
  parameters: {
    slots: {
      default: `Default slot content`,
    },
  },
}
```

### Standard

Use `args.[slotName]` inside the template to pass data from Storybook controls to the slot, or access other args.

```ts
// MyComponent.stories.ts

export default meta = {
  parameters: {
    slots: {
      default: {
        description: 'Default slot',
        template: `<p>{{ args.default }}</p>`,
      },
      header: {
        description: 'Header slot',
        template: `<p>{{ args.header }}</p>`,
      },
    },
  },
}
```

So, value of `header` arg control in Storybook table is being passed into the slot template, allowing control of an aspect of the slot.

### Advanced

#### Adding components

```ts
// MyComponent.stories.ts

export default meta = {
  parameters: {
    slots: {
      default: {
        description: 'Default slot',
        template: `<p>{{ args.default }}</p>`,
      header: {
        description: 'Header slot',
        components: { AppButton },
        template: `<AppButton>{{ args.header }}</AppButton>`,
      },
    },
  },
}
```

## Todo

- [ ] Slots fallback support

## Contribute

## 💖 Funding

Help support my open-source work through [PayPal](https://paypal.com) and [GitHub Sponsors](https://github.com/sponsors/JoJk0?o=esb).

<a href="https://www.paypal.com/donate/?hosted_button_id=MVYGX9EHYRN9W"><img src="https://pics.paypal.com/00/s/YTRmYmIzYjgtNDA5My00YzY5LWJmN2QtNmMyNTU2ZGUwOTYw/file.PNG" border="0" height="35" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /></a>

## License
MIT License © 2023 Jacob Janisz