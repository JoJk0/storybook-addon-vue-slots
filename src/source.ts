import type { VueRenderer } from '@storybook/vue3'
import { wrappedTemplate, SLOTS_CATEGORY_NAME } from './utils'
import type { PreparedStory } from '@storybook/types'
import { load } from "cheerio";

export const makeDefaultSlots = <TName extends Readonly<string>>(slotNames: TName[]) =>
slotNames.reduce((acc, name) => ({ ...acc, [name]: `{{ args.${name} }}` as const }), {} as Record<TName, string>)

export const slot = <TDesc extends Readonly<string>>(description: TDesc) => ({
  description,
  control: 'text',
  table: {
    category: SLOTS_CATEGORY_NAME,
    type: {
      summary: 'html',
    },
  },
} as const)

export default (code: string, { component, argTypes, parameters }: PreparedStory<VueRenderer>) => {

  const $ = load(code, {
    xml: {
      xmlMode: true,
      lowerCaseAttributeNames: false,
      lowerCaseTags: false,
      decodeEntities: false
    }
  }, false);

  const componentName = component?.__name || (component as {name: string}).name

  const componentEl = $(componentName);

  const slots = Object.keys(argTypes).filter(key => argTypes[key].table?.category === SLOTS_CATEGORY_NAME);
  const props = componentEl.attr() || {};

  const templates = Object.entries(parameters.slots || {}).reduce((acc, [key, val]) => ({ ...acc, [key]: typeof val === 'object' && val.template ? val.template :  `{{ args.${key} }}` }), {} as Record<string, string>)

  const slotProps = Object.entries(props).filter(([key]) => slots.includes(key)).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as Record<string, string>);

  // TODO: consider multi-word slot names and kebab-case
  const slotTemplates = {
    ...makeDefaultSlots(slots),
    ...templates
  };

  const children = componentEl.children().filter((i, el) => el.name === 'template')
  children.remove()

  Object.entries(slotTemplates).forEach(([key, template]) => {

    const templateWithArgs = renderArgs(slotTemplates[key], slotProps)

    componentEl.append(wrappedTemplate(templateWithArgs, key))
  });

  const generatedCode = $.html({
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
    xmlMode: false,
    recognizeSelfClosing: true
  });

  return generatedCode
}

export const renderArgs = (template: string, args: Record<string, string>) => {
  const handlebarsRegex = /\{\{\s*'(.*)'\s*\}\}/gmiu
  const propRegex = /:(.*)="'(.*)'"/gmiu

  const withArgs = Object.entries(args).reduce((acc, [key, val]) => acc.replaceAll(`args.${key}`, `'${val}'`), template)

  const withFixedProp = withArgs.replaceAll(propRegex, '$1="$2"')

  const withFixedHandlebars = withFixedProp.replaceAll(handlebarsRegex, '$1')

  return withFixedHandlebars
}

