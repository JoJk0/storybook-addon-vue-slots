import { makeDefaultSlots, SlotsParams } from './slots';
import type { VueRenderer } from '@storybook/vue3'
import { wrappedTemplate } from './utils'
import type { PreparedStory } from '@storybook/types'
import { load } from "cheerio";

export const SLOTS_CATEGORY_NAME = 'Slots'

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

  const {templates, wrapper} = parameters.slots as SlotsParams<string> || {components: {}, templates: {}, wrapper: undefined}

  const $ = load(code, {
    xml: {
      xmlMode: true,
      lowerCaseAttributeNames: false,
      lowerCaseTags: false,
      decodeEntities: false
    }
  }, false);

  const componentName = component?.__name || (component as {name: string}).name

  const componentEl = wrapper ? $(componentName).unwrap() : $(componentName);

  const slots = Object.keys(argTypes).filter(key => argTypes[key].table?.category === SLOTS_CATEGORY_NAME);

  const props = componentEl.attr() || {};

  const slotProps = Object.entries(props).filter(([key]) => slots.includes(key)).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as Record<string, string>);

  // TODO: consider multi-word slot names and kebab-case
  const slotTemplates = {
    ...makeDefaultSlots(slots),
    ...templates
  };

  if (!Object.keys(slotProps).length)
  return wrapper ? `<template>
  ${wrapper(code)}
  </template>` : code

  Object.entries(slotProps).forEach(([key, val]) => {
    componentEl.removeAttr(key)

    const templateWithArgs = renderArgs(slotTemplates[key], slotProps)

    componentEl.append(wrappedTemplate(templateWithArgs, key))
  });

  const generatedCode = $.html({
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
    xmlMode: false,
    recognizeSelfClosing: true
  });


  return wrapper ? `<template>
  ${wrapper(generatedCode)}
  </template>` : generatedCode
}

export const renderArgs = (template: string, args: Record<string, string>) => {
  const handlebarsRegex = /\{\{\s*'(.*)'\s*\}\}/gmiu
  const propRegex = /:(.*)="'(.*)'"/gmiu

  const withArgs = Object.entries(args).reduce((acc, [key, val]) => acc.replaceAll(`args.${key}`, `'${val}'`), template)

  const withFixedProp = withArgs.replaceAll(propRegex, '$1="$2"')

  const withFixedHandlebars = withFixedProp.replaceAll(handlebarsRegex, '$1')

  return withFixedHandlebars
}

