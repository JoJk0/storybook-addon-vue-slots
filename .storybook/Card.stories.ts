import type { Meta, StoryObj } from '@storybook/vue3'
import AppCard from './Card.vue'

const meta = {
  title: 'Components/Card',
  component: AppCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Should variant colour be applied?',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Basic unit of organization inside content',
      },
    },
    slots: {
      default: {
        template: '{{ args.default }}',
        description: 'Content inside of the card',
      },
    },
  },
  args: {
    disabled: false,
    variant: false,
  },
} satisfies Meta<typeof AppCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
export const Variant: Story = {
  args: {
    default: 'Variant Card',
    variant: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use variant to emphasize content inside of it.',
      },
    },
  },
}

export const DefaultDisabled: Story = {
  args: {
    ...Default.args,
    default: 'Disabled Card',
    disabled: true,
  },
}

export const VariantDisabled: Story = {
  args: {
    ...Variant.args,
    default: 'Variant Disabled Card',
    disabled: true,
  },
}
