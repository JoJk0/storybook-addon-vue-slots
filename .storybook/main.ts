
export default {
  framework: '@storybook/vue3-vite',
  stories: ["./*.mdx", "./*.stories.@(js|jsx|ts|tsx)"],
  docs: {
    autodocs: 'tag',
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
}
