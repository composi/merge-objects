/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * This does a deep clone. Sub arrays will be cloned. If arrays consist of objects, those will be cloned. Functions will also be cloned.
 * Passing in just one object will return a deep clone of it.
 *
 * @param {Object.<string, any>[]} objects
 * @return {Object.<string, any>} Object.<string, any>
 */

export function mergeObjects(...objects) {
  // Add empty object to arguments.
  // This insures the result is a clone.
  objects.unshift({})

  /**
   * Merge on object into another.
   * @param {Object<string, any>} target 
   * @param {Object<string, any>} source
   */
  function createClone(target, source) {

    for (let key in source) {
      let descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (descriptor.value instanceof String) {
        target[key] = new String(descriptor.value);
      } else if (descriptor.value instanceof Array) {
        target[key] = createClone([], descriptor.value);
      } else if (descriptor.value instanceof Function) {
        target[key] = descriptor.value
      } else if (descriptor.value instanceof Object) {
        let prototype = Reflect.getPrototypeOf(descriptor.value);
        let clonedObject = createClone({}, descriptor.value);
        Reflect.setPrototypeOf(clonedObject, prototype);
        target[key] = clonedObject;
      } else {
        Object.defineProperty(target, key, descriptor);
      }
    }

    let prototype = Reflect.getPrototypeOf(source);
    Reflect.setPrototypeOf(target, prototype);
    return target;
  }
  // Return cloned copy of merged objects:
  return objects.reduce((a, b) => createClone(a, b))
}
