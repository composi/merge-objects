/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * This does a deep clone. Sub arrays will be cloned. If arrays consist of objects, those will be cloned. Functions will also be cloned. This also support Maps and Sets.
 * Passing in just one object will return a deep clone of it.
 *
 * @param {Object.<string, any>[]} objects One or more objects to use for merging.
 * @return {Object.<string, any>} Object.<string, any>
 */

export function mergeObjects(...objects) {
  const FIRST_ARGUMENT = 0
  const ZERO = 0
  const SECOND_ARGUMENT = 1
  // Add empty array or object to arguments to ensure unique clone:
  Array.isArray(objects[FIRST_ARGUMENT])
    && objects.unshift([])
    || typeof objects[FIRST_ARGUMENT] === 'string'
    && objects.unshift(/** @type {*} */(''))
    || typeof objects[FIRST_ARGUMENT] === 'number'
    && objects.unshift(/** @type {*} */(ZERO))
    || objects[FIRST_ARGUMENT] instanceof Set
    && objects.unshift(new Set())
    || objects[FIRST_ARGUMENT] instanceof Map
    && objects.unshift(new Map())
    || objects[FIRST_ARGUMENT] instanceof WeakSet
    && objects.unshift(objects[FIRST_ARGUMENT])
    || objects[FIRST_ARGUMENT] instanceof WeakMap
    && objects.unshift(objects[FIRST_ARGUMENT])
    || objects.unshift({})

  /**
   * Create a clone of an object or array.
   * @param {*} object The object to clone.
   * @return {Object<string, any>} Object<string, any>
   */

  const createClone = (object, hash = new WeakMap()) =>
    Object(object) !== object
    // Deal with primitive types:
    && object
    || hash.has(object)
    // Deal with cyclic references:
    && hash.get(object)
    // Test for other objects:
    || (() => {
      const result = object instanceof Date
        && new Date(object)
        || object instanceof RegExp
        && new RegExp(object.source, object.flags)
        || object instanceof Set
        && new Set([...object])
        || object instanceof Map
        && new Map([...object])
        || object.constructor
        && new object.constructor()
        || Object.create(null)

      hash.set(object, result)

      return object instanceof Set
        && new Set([...object])
        || object instanceof Map
        && new Map([...object])
        || object instanceof WeakSet
        && object
        || object instanceof WeakMap
        && object
        || Object.assign(
          result,
          ...Object.keys(object).map(key => ({
            [key]: createClone(object[key], hash)
          })
          )
        )
    }
    )()

  // Return cloned copy of merged objects:
  return Array.isArray(objects[FIRST_ARGUMENT])
    && objects.reduce((a, b) => Array.prototype.concat(a, createClone(b)))
    || objects[FIRST_ARGUMENT] instanceof Set
    && objects.reduce((a, b) => new Set([
      .../** @type {Set} */(a),
      .../** @type {Set} */(createClone(b))
    ]))
    || objects[FIRST_ARGUMENT] instanceof Map
    && objects.reduce((a, b) => new Map([
      .../** @type {Map} */(a),
      .../** @type {Map} */(createClone(b))
    ]))
    || objects[FIRST_ARGUMENT] instanceof WeakSet
    && objects.reduce(a => a)
    || objects[FIRST_ARGUMENT] instanceof WeakMap
    && objects.reduce(a => a)
    || typeof objects[FIRST_ARGUMENT] === 'object'
    && objects.reduce((a, b) => Object.assign(a, createClone(b)))
    || typeof objects[FIRST_ARGUMENT] === 'string'
    && objects[SECOND_ARGUMENT]
    || typeof objects[FIRST_ARGUMENT] === 'number'
    && objects[SECOND_ARGUMENT]
}



export const cloneObject = object => mergeObjects(object)
export const clone = object => mergeObjects(object)
