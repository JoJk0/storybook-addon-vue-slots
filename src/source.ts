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

// TODO: Remove string manipulations in favour of AST manipulation (cheerio)
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

  const templates = Object.entries(parameters.slots || {}).reduce((acc, [key, val]) => ({ ...acc, [key]: typeof val === 'object' && val.template !== undefined ? val.template :  `{{ args.${key} }}` }), {} as Record<string, string>)

  const slotArgs = getSlotArgs(code)

  // TODO: consider multi-word slot names and kebab-case
  const slotTemplates = {
    ...makeDefaultSlots(slots),
    ...templates
  };

  const children = componentEl.contents().filter((i, el) => el.type === 'tag' && el.name === 'template' || el.type === 'text' )
  children.remove()

  Object.entries(slotTemplates).forEach(([key, template]) => {

    const templateWithArgs = renderArgs(template, slotArgs)

    componentEl.append(wrappedTemplate(templateWithArgs, key))
  });

  // console.log({code, slots, templates, slotArgs, slotTemplates, children})

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
  
  const withoutOtherArgPlaceholders = withArgs.replace(/\{\{(\s*)args.(.*)\}\}/gmiu, '')
  
  const withFixedProp = withoutOtherArgPlaceholders.replaceAll(propRegex, '$1="$2"')
  
  const withFixedHandlebars = withFixedProp.replaceAll(handlebarsRegex, '$1')
  
  return withFixedHandlebars
}

export const getSlotArgs = (code: string) => {
  const slotRegex = /<template #(.*)>"(.*)"<\/template>/gmiu

  const matches = [...code.matchAll(slotRegex)]

  const args = matches.reduce((acc, [_, slotName, arg]) => ({ ...acc, [slotName]: arg }), {} as Record<string, string>)

  
  if(args.default === undefined){

    const codeWithoutSlots = code.replaceAll(slotRegex, '')

    const defaultRegex = /<template>(\n*)(\s*)<(.*)>(\n*)(\s*)(.*)"(.*)"/gmiu

    const defaultMatch = [...codeWithoutSlots.matchAll(defaultRegex)]

    const value = defaultMatch[0]?.[defaultMatch[0]?.length - 1]

    if(value !== undefined){
      return {
        ...args,
        default: value
      }
    }
  }

  return args
}