
import type { Component } from 'vue'

export type SlotParams = {
    components: Record<string, Component>
    template: string
    description?: string
    wrapper?: (content: string) => string
}

declare module '@storybook/vue3' {
    export interface Meta {
        parametes: Parameters
    }
    export interface Parameters {
        slots?: Record<string, SlotParams>
    }
}
