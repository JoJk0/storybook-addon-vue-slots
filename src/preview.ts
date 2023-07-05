import type { ProjectAnnotations, ArgTypesEnhancer, StrictInputType, ArgsEnhancer, Args } from "@storybook/types";
import { Decorator, type VueRenderer } from "@storybook/vue3"
import type { ConcreteComponent } from "vue"
import renderWithSlots from './render'
import transform from './source'
import { SLOTS_CATEGORY_NAME } from './utils'

export const withSlots: Decorator = (story, { component, parameters }) => {

  const slots = Object.keys(parameters.slots || {}).reduce((acc, key) => ({ ...acc, [key]: String }), {})

  const cmp = component as ConcreteComponent<any> | undefined

  if(cmp)
  cmp.props = {
    ...cmp.props,
    ...slots
  }

  return {
    components: { story },
    setup(props) {
      return { story, props }
    },
    template: '<story v-bind="props" />'
  }
}

export const convertSlotArgTypes: ArgTypesEnhancer<VueRenderer, Args> = (context) => {

  if (!context.parameters.slots) return context.argTypes

  const slots = context.parameters.slots
  const slotNames = Object.keys(slots)

  const slotArgTypes = slotNames.reduce((acc, slotName) => {
    const slot = slots[slotName]
    const slotArgType = {
      ...context.argTypes[slotName],
      name: slotName,
      // control: 'text',
      description: typeof slot === 'string' ? slot : slot.description,
      table: {
        ...context.argTypes[slotName].table,
        category: SLOTS_CATEGORY_NAME,
        defaultValue: null,
        jsDocTags: undefined,
        type: {
          ...context.argTypes[slotName].table?.type,
          detail: undefined,
          summary: 'html'
        }
      },
      type: {
        ...context.argTypes[slotName].type,
        required: undefined,
        name: 'string'
      }
    } as StrictInputType

    return {
      ...acc,
      [slotName]: slotArgType
    }
  }, {} as Record<string, StrictInputType>)

  const argTypes = {
    ...context.argTypes,
    ...slotArgTypes
  }

  return argTypes
}

export const convertSlotArgs: ArgsEnhancer<VueRenderer, Args> = (context) => {
  console.log(context)
  return context.initialArgs
}

const preview: ProjectAnnotations<VueRenderer> = {
  decorators: [withSlots],
  render: renderWithSlots(),
  argTypesEnhancers: [convertSlotArgTypes],
  // argsEnhancers: [convertSlotArgs],
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
