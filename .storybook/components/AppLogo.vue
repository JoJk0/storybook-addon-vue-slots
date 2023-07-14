<script lang="ts" setup>
    defineProps<{
        logo: string;
    }>()
</script>
<template>
    <img :src="`https://api.iconify.design/logos/${logo}.svg`" :alt="`${logo} Logo`" height="50" />
</template>