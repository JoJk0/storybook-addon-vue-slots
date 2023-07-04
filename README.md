<!-- README START -->

# Storybook Addon Kit ([demo](https://main--601ada52c3d4040021afdc30.chromatic.com))

Simplify the creation of Storybook addons

- 📝 Live-editing in development
- ⚛️ React/JSX support
- 📦 Transpiling and bundling with [tsup](https://tsup.egoist.dev/)
- 🏷 Plugin metadata
- 🚢 Release management with [Auto](https://github.com/intuit/auto)
- 🧺 Boilerplate and sample code
- 🛄 ESM support
- 🛂 TypeScript by default with option to eject to JS

### Migrating from Storybook 6.x to 7

Note, if you're looking to upgrade your addon from Storybook 6.x to 7, please refer to the [migration guide](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#70-addon-authors-changes). The major changes are:

- `register.js` was removed
- No more default export from `@storybook/addons`
- `@storybook/api` has been split into `@storybook/preview-api` and `@storybook/manager-api`

Skip this section if you're bootstrapping a new addon.

## Getting Started

Click the **Use this template** button to get started.

![](https://user-images.githubusercontent.com/321738/125058439-8d9ef880-e0aa-11eb-9211-e6d7be812959.gif)

Clone your repository and install dependencies.

```sh
yarn
```

<!-- README END -->

### Development scripts

- `yarn start` runs babel in watch mode and starts Storybook
- `yarn build` build and package your addon code

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:

- [`NPM_TOKEN`](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens) Create a token with both _Read and Publish_ permissions.
- [`GH_TOKEN`](https://github.com/settings/tokens) Create a token with the `repo` scope.

Then open your `package.json` and edit the following fields:

- `name`
- `author`
- `repository`

#### Local

To use `auto` locally create a `.env` file at the root of your project and add your tokens to it:

```bash
GH_TOKEN=<value you just got from GitHub>
NPM_TOKEN=<value you just got from npm>
```

Lastly, **create labels on GitHub**. You’ll use these labels in the future when making changes to the package.

```bash
npx auto create-labels
```

If you check on GitHub, you’ll now see a set of labels that `auto` would like you to use. Use these to tag future pull requests.

#### GitHub Actions

This template comes with GitHub actions already set up to publish your addon anytime someone pushes to your repository.

Go to `Settings > Secrets`, click `New repository secret`, and add your `NPM_TOKEN`.

### Creating a release

To create a release locally you can run the following command, otherwise the GitHub action will make the release for you.

```sh
yarn release
```

That will:

- Build and package the addon code
- Bump the version
- Push a release to GitHub and npm
- Push a changelog to GitHub
