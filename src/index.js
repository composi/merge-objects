/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 *
 * @param {Object.<string, any>[]} objects
 * @return {Object.<string, any>} Object.<string, any>
 */
export function merge(...objects) {
  // Clone both objects:
  const clones = objects.map(obj => JSON.parse(JSON.stringify(obj)))
  // Merge objects:
  return clones.reduce((a, b) => Object.assign({}, a, b))
}
