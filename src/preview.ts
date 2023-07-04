import type { ProjectAnnotations, ArgTypesEnhancer, ArgsEnhancer, Args } from "@storybook/types";
import { Decorator, type VueRenderer } from "@storybook/vue3"
import renderWithSlots from './render'
import transform, { SLOTS_CATEGORY_NAME } from './source'

export const withSlots: Decorator = (story, c) => {
console.log(c)
  return {
    components: { story },
    setup(props){
      return { story, props }
    },
    template: '<story v-bind="props" />'
  }
}

export const convertSlotArgTypes: ArgTypesEnhancer<VueRenderer, Args> = (context) => {

  if(!context.parameters.slots) return context.argTypes

  const slots = context.parameters.slots
  const slotNames = Object.keys(slots)

  const slotArgTypes = slotNames.reduce((acc, slotName) => {
    const slot = slots[slotName]
    const slotArgType = {
      control: 'text',
      description: slot.description,
      table: {
        category: SLOTS_CATEGORY_NAME,
        type: {
          summary: 'html'
        }
      }
    }
    return {
      ...acc,
      [slotName]: slotArgType
    }
  }, {} as Record<string, any>)

  const argTypes = {
    ...context.argTypes,
    ...slotArgTypes
  }

  return argTypes
}

export const convertSlotArg: ArgsEnhancer<VueRenderer, Args> = (context) => {
  console.log(context)
  return context.initialArgs
}

const preview: ProjectAnnotations<VueRenderer> = {
  decorators: [withSlots],
  render: renderWithSlots(),
  argTypesEnhancers: [convertSlotArgTypes],
  argsEnhancers: [convertSlotArg],
  parameters: {
    docs: {
      source: {
        language: 'html',
        transform
      }
    }
  },
};

export default preview;
