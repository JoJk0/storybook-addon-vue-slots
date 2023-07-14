<script lang="ts" setup>

defineProps({
  variant: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits({
  click: (e: PointerEvent) => e,
})
</script>

<template>
  <article class="app-card" :class="{ variant, disabled }">
    <slot />
  </article>
</template>

<style lang="scss" scoped>
.app-card {
  background-color: rgba(0,0,0,0.05);
  color: black;
  // border-radius: 1rem;
  border: 1px solid grey;
  padding: 1em;
  min-width: calc(1em * 10);
  min-height: calc(1em * 5);

  &.variant {
    background-color: var(--app-color-surface-variant);
    color: var(--app-color-on-surface-variant);
  }

  &.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.8;
    color: var(--app-color-outline);
    background: grey;

    * {
      pointer-events: none;
    }
  }
}
</style>
