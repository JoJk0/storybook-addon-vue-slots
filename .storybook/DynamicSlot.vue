<script lang="ts" setup>
defineProps<{
    headers: {
        field: string
        label: string
    }[];
    rows: any[];
}>()

</script>
<template>
    <table>
        <thead>
            <tr>
                <th v-for="(header, i) in headers"
                    :key="i">
                    {{ header.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) of rows"
                :key="i">
                <td v-for="(header, j) of headers"
                    :key="i + '-' + j">
                    <slot :name="'cell-' + header.field"
                        :row="row"></slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

table th,
table td {
    padding: 16px;
    text-align: left;
}

table th {
    background-color: #f0f0f0;
    color: #333;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

table tr:nth-child(even) {
    background-color: #fafafa;
}

table tr:hover {
    background-color: #eeeeee;
}

table td {
    border-bottom: 1px solid #e0e0e0;
}

table tr:last-child td {
    border-bottom: none;
}
</style>