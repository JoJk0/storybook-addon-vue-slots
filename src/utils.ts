
export const wrappedTemplate = (template: string | undefined, slotName: string) => {

  const templateWithDefault = !template ? `{{ args.${slotName} }}` : template

  return templateWithDefault.includes(`<template #${slotName}`) ?
  templateWithDefault :
    `<template #${slotName}>\n${templateWithDefault}\n</template>`
}

export const SLOTS_CATEGORY_NAME = 'slots'
