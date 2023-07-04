/**
 * to load the built addon in this test Storybook
 */
function previewAnnotations(entry = []) {
  return [...entry, require.resolve("../dist/preview.mjs")];
}

module.exports = {
  previewAnnotations,
};
