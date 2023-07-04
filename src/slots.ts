// Vue 3 Slots plugin


export const makeDefaultSlots = <TName extends Readonly<string>>(slotNames: TName[]) =>
slotNames.reduce((acc, name) => ({ ...acc, [name]: `{{ args.${name} }}` as const }), {} as Record<TName, string>)
