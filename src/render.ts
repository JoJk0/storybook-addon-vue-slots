import { computed, type DefineComponent } from 'vue'
import type { ArgsStoryFn, Renderer } from '@storybook/types'
import type { SlotsParams } from './slots'
import { wrappedTemplate } from './utils'

export const renderWithSlots = <TRenderer extends Renderer, TArgs extends Record<string, any>, TSlotNames extends string>() => {
  const makeComponentTemplate = (component: string, slots: string) => `
    <${component} v-bind="args">
      ${slots}
    </${component}>
  `

  return ((args, { viewMode, componentId, component, parameters }) => {
    const componentName = (component as DefineComponent).__name! || (component as { name: string }).name

    if (!parameters?.slots) {
      return {
        template: makeComponentTemplate(componentName, ''),
        components: { [componentName]: component },
        setup: () => ({ args: computed(() => ({ ...args })) }),
      }
    }

    const { components, templates, wrapper } = parameters.slots as SlotsParams<TSlotNames>

    const slots = Object.entries(templates).reduce((acc, [currentSlotName, currentTemplate]) => `${acc}\n${wrappedTemplate(currentTemplate as any, currentSlotName)}`, '')

    // Fix for root-based components (overlays, modals, tooltips etc.)
    if (!component)
      throw new Error('No component provided to render')

    const containComponentIds = ['components-modal', 'components-tooltip']

    const isContainedComponent = containComponentIds.includes(componentId)

    const container = isContainedComponent
      ? {
          container: viewMode === 'docs' ? '.sbdocs-wrapper' : '#storybook-root',
        }
      : {}

    return {
      template: wrapper ? wrapper(makeComponentTemplate(componentName, slots)) : makeComponentTemplate(componentName, slots),
      components: { [componentName]: component, ...(components || {}) },
      setup: () => ({ args: computed(() => ({ ...args, ...container })) }),
    }
  }) as ArgsStoryFn<TRenderer, TArgs>
}

export default renderWithSlots
