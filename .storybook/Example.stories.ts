import Example from './Example.vue'
import AppLogo from './components/AppLogo.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
    title: 'Example',
    component: Example,
    parameters: {
        docs: {
            description: {
                component: 'Slots example',
            },
        },
        slots: {
            default: 'Default slot content',
            start: {
                description: 'Start slot content',
                components: {
                    AppLogo
                },
                template: `
                    <AppLogo logo="storybook" /> {{ args.start }} <AppLogo logo="vue" />
                `
            },
            end: 'End slot content',
        }
    },
    tags: ['autodocs'],
    args: {
        default: 'Default',
        start: '&',
        end: 'End',
        highlight: true
    },
} satisfies Meta<typeof Example>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        default: 'Default slot content',
        msg: 'Hello Vue + Storybook + Vite',
    },
}
