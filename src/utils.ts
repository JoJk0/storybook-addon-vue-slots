export const wrappedTemplate = (template: string, slotName: string) => template.includes(`<template #${slotName}`) ? template : `<template #${slotName}>\n${template}\n</template>`
