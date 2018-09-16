# @composi/merge

This function takes objects and returns a new object with all of their properties. The last object's properties will replace those of the earlier when these have the same name.

Merge does a deep copy of objects, but ignores non-iterable properties.

### Note:

Passing in non-object values, such as string or numbers, will result in unpredictable results. Merge must be used only for combining objects.

## Install

```
npm install --save-dev @composi/merge
```

## Using

Merge two objects:

```javascript
import { merge } from '@composi/merge'

const obj1 = {name: 'Mary'}
const obj2 = {job: 'project manager'}
const person = merge(obj1, obj2)
// returns {name: 'Mary', job: 'project manager'}
```

## Clone an Object

You can clone an object with merge. Just pass in the object. The return object will be a clone:

```javascript
import { merge } from '@composi/merge'

const obj1 = {name: 'Joe', job: 'mechanic'}
const obj2 = merge(obj1)
obj1 === obj2 // returns false
```
