
export default {
  framework: '@storybook/vue3-vite',
  stories: ["./*.mdx", "./*.stories.@(js|jsx|ts|tsx)"],
  docs: {
    autodocs: 'tag',
  },
  addons: [
    '../../Weightmans UI - Vue/dist/storybook',
  ],
}
