import type { Meta, StoryObj } from "@storybook/vue3";
import DynamicSlot from "./DynamicSlot.vue";

const headers = [
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Telephone",
    field: "telephone",
  },
  {
    label: "Address",
    field: "name",
  },
  {
    label: "Status",
    field: "name",
  },
];

const rows = [
  {
    name: "John Doe",
    telephone: "123-456-7890",
    address: "123 Main St",
    status: "Active",
  },
  {
    name: "Jane Smith",
    telephone: "234-567-8901",
    address: "456 Maple Ave",
    status: "Inactive",
  },
  {
    name: "Alice Johnson",
    telephone: "345-678-9012",
    address: "789 Oak St",
    status: "Pending",
  },
  {
    name: "Robert Brown",
    telephone: "456-789-0123",
    address: "101 Pine Rd",
    status: "Active",
  },
  {
    name: "Emily Davis",
    telephone: "567-890-1234",
    address: "234 Elm St",
    status: "Inactive",
  },
  {
    name: "Michael Wilson",
    telephone: "678-901-2345",
    address: "345 Cedar St",
    status: "Pending",
  },
  {
    name: "Sarah Miller",
    telephone: "789-012-3456",
    address: "567 Birch Rd",
    status: "Active",
  },
  {
    name: "David Martinez",
    telephone: "890-123-4567",
    address: "678 Walnut St",
    status: "Inactive",
  },
  {
    name: "Laura Garcia",
    telephone: "901-234-5678",
    address: "890 Chestnut St",
    status: "Pending",
  },
  {
    name: "James Anderson",
    telephone: "012-345-6789",
    address: "901 Spruce St",
    status: "Active",
  },
];

const dynamicSlots = headers.reduce((slots, header) => {
  slots[`cell-${header.field}`] = {
    description: `Dynamic slot for ${header.label} column`,
    template: `{{ scope.row.${header.field} }}`,
  };
  return slots;
}, {});

const meta = {
  title: "DynamicSlot",
  component: DynamicSlot,
  parameters: {
    docs: {
      description: {
        component: "Dynamique Slots example",
      },
      source: {
        type: "dynamic",
      },
    },
    slots: {
      ...dynamicSlots,
      end: "End slot content",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DynamicSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headers,
    rows,
  },
};
