<script lang="ts" setup>

defineProps<{
    msg: string;
    highlight: boolean;
}>()

defineSlots<{
    default(slotProps?: {}): void;
    start(slotProps?: {}): void;
    end(slotProps?: {}): void;
}>()

const emit = defineEmits<(e: 'btn-click') => void>()

</script>
<template>
    <main class="example" :class="{highlight}">
        <p>{{ msg }}</p>
        <section class="start">
            <slot name="start" />
        </section>
        <section class="middle">
            <slot />
        </section>
        <section class="end">
            <slot name="end" />
        </section>
        <button @click="emit('btn-click')">Click Me</button>
    </main>
</template>

<style scoped>
.example {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fafafa;
    gap: 1em;
    margin: 1rem 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.start, .middle, .end {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1em;
}

.highlight {
    background-color: #fccece;
}
</style>