
export const wrappedTemplate = (template: string | undefined, slotName: string) => {

  const templateWithDefault = template ?? `{{ args.${slotName} }}`

  const wrap = (contents: string) => `<template #${slotName}>\n${contents}\n</template>`

  const wrappedTemplate = templateWithDefault.includes(`<template #${slotName}`) ?
  templateWithDefault : wrap(templateWithDefault)

  return wrappedTemplate.replace(/<template #default>(\n*)(.*)(\n*)<\/template>/gimsu, '$2')
}

export const SLOTS_CATEGORY_NAME = 'slots'
