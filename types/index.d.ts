/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * This does a deep clone. Sub arrays will be cloned. If arrays consist of objects, those will be cloned. Functions will also be cloned. This also support Maps and Sets.
 * Passing in just one object will return a deep clone of it.
 *
 * @param {Object.<string, any>[]} objects One or more objects to use for merging.
 * @return {Object.<string, any>} Object.<string, any>
 */
export function mergeObjects(...objects: {
    [x: string]: any;
}[]): {
    [x: string]: any;
};
export function cloneObject(object: any): {
    [x: string]: any;
};
export function clone(object: any): {
    [x: string]: any;
};
