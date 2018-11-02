# @composi/merge-objects

This function takes objects and returns a new object with all of their properties. The last object's properties will replace those of the earlier when these have the same name. Since arrays are also objects, this will merge a series of arrays together.

Merge does a deep copy of objects, but ignores non-iterable properties.

### Note:

Passing in non-object values, such as string or numbers, will result in unpredictable results. Merge must be used only for combining objects or arrays. Although this handles objects or arrays, you cannot merge objects and arrays together, this will create an unexecpte result.

## Install

```
npm install --save-dev @composi/merge-objects
```

## Using

Merge two objects:

```javascript
import { mergeObjects } from '@composi/merge-objects'

const obj1 = {name: 'Mary'}
const obj2 = {job: 'project manager'}
const person = mergeObjects(obj1, obj2)
// returns {name: 'Mary', job: 'project manager'}
```

## Clone an Object

You can clone an object with merge. Just pass in the object. The return object will be a clone:

```javascript
import { mergeObjects } from '@composi/merge-objects'

const obj1 = {name: 'Joe', job: 'mechanic'}
const obj2 = mergeObjects(obj1)
obj1 === obj2 // returns false
```

## Merge Arrays Together 

You can use mergeObjects to merge any number of arrays together. This is a deep clone, which means you can use it safely with arrays of objects.

```javascript

  const arr1 = [{name: 'Joe'}, {name: 'Jane'}]
  const arr2 = [{name: 'Mary'}, {name: 'Sam'}]
  const arr3 = mergeObjects(arr1, arr2)
  // arr3 equals [{name: 'Joe'}, {name: 'Jane'}, {name: 'Mary'}, {name: 'Sam'}])
  arr1[0].name = 'Joseph' // [{name: 'Joseph'}, {name: 'Jane'}]
  arr2[1].name = 'Samuel' // [{name: 'Mary'}, {name: 'Samuel'}]
  // The above changes do not affect arr3:
  // [{name: 'Joe'}, {name: 'Jane'}, {name: 'Mary'}, {name: 'Sam'}])
  ```

  ## Clone an Array

  If you want to clone an array, just pass it as the argument:

  ```javascript
  const arr1 = [{name: 'Joe'}, {name: 'Jane'}]
  // Create clone of arr1:
  const clonedArr1 = mergeObjects(arr1)
  arr1[0].name = 'Joseph'
  arr2[0].name // 'Joe'
  ```
