/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * This does a deep clone. Sub arrays will be cloned. If arrays consist of objects, those will be cloned. Functions will also be cloned. This also support Maps and Sets.
 * Passing in just one object will return a deep clone of it.
 *
 * @param {Object.<string, any>[]} objects One or more objects to use for merging.
 * @return {Object.<string, any>} Object.<string, any>
 */

export function mergeObjects(...objects) {
  // Add empty object to arguments to ensure unique clone:
  objects.unshift({})

  /**
   * Create a clone of an object or array.
   * @param {*} object The object to clone.
   * @return {Object<string, any>} Object<string, any>
   */

  function createClone(object, hash = new WeakMap()) {
    // Deal with primitive types:
    if (Object(object) !== object) return object
    // Deal with cyclic references:
    if (hash.has(object)) return hash.get(object)
    const result =
      object instanceof Date
        ? new Date(object)
        : object instanceof RegExp
          ? new RegExp(object.source, object.flags)
          : object.constructor
            ? new object.constructor()
            : Object.create(null)
    hash.set(object, result)
    if (object instanceof Map)
      Array.from(object, ([key, val]) =>
        result.set(key, createClone(val, hash))
      )
    if (object instanceof Set)
      Array.from(object, val => result.add(createClone(val, hash)))
    return Object.assign(
      result,
      ...Object.keys(object).map(key => ({
        [key]: createClone(object[key], hash)
      }))
    )
  }
  // Return cloned copy of merged objects:
  return objects.reduce((a, b) => Object.assign(a, createClone(b)))
}
