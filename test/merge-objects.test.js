import { mergeObjects } from "../src"

test('merge should combine two objects and return a new one with those properties.', function() {
  const obj1 = { name: 'Mary' }
  const obj2 = { job: 'project manager' }
  const person = mergeObjects(obj1, obj2)
  expect(person.name).toBe('Mary')
  expect(person.job).toBe('project manager')
})

test('merge should create a new object where the properties of first object are replaced by those of the later', function() {
  const person1 = { name: 'Joe', job: 'mechanic', age: 26}
  const person2 = { name: 'Joe', job: 'astronaut', age: 45}
  const person3 = mergeObjects(person1, person2)
  expect(person3.name).toBe('Joe')
  expect(person3.job).toBe('astronaut')
  expect(person3.age).toBe(45)
})

test('merge should combine multiple objects into a new one', function () {
  const obj1 = {name: 'Jane'}
  const obj2 = {job: 'lab technician'}
  const obj3 = {age: 28}
  const obj4 = {employer: 'Genentech'}
  const obj5 = mergeObjects(obj1, obj2, obj3, obj4)
  expect(obj5.name).toBe('Jane')
  expect(obj5.job).toBe('lab technician')
  expect(obj5.age).toBe(28)
  expect(obj5.employer).toBe('Genentech')
})

test('should merge a function from one object to another', function() {
  const obj1 = {name: 'Joe', job: 'mechanic'}
  const obj2 = {name: 'Sam', announceName() {alert(`My name is ${this.name}`)}}
  const obj3 = mergeObjects(obj1, obj2)
  expect(obj3.name).toBe('Sam')
  expect(obj3.job).toBe('mechanic')
  expect(obj3).toHaveProperty('announceName')
})

test('should create a deep merge of objects', function() {
  const obj1 = {
    name: {
      first: 'Joe'
    }
  }
  const obj2 = {
    name: {
      first: 'Sam',
      last: 'Smith'
    },
    stats: {
      age: 32,
      height: `5'10"`,
      jobs: [
        {
          position: 'developer',
          employer: 'Google',
          status: 'former'
        },
        {
          position: 'mechanic',
          employer: 'Honda',
          status: 'current'
        }
      ]
    }
  }
  const obj3 = mergeObjects(obj1, obj2)
  expect(obj3.name.first).toBe('Sam')
  expect(obj3.name.last).toBe('Smith')
  expect(obj3).toHaveProperty('stats')
  expect(obj3.stats).toHaveProperty('jobs')
  expect(obj3.stats.jobs[0].employer).toBe('Google')
  expect(obj3.stats.jobs[1].employer).toBe('Honda')
  obj2.stats.jobs[1].status = 'former'
  expect(obj3.stats.jobs[1].status).toBe('current')
})

test('Should copy over clone of Map', function() {
  const obj1 = {}
})


test('Should copy over clone of Set', function() {
  let john = { name: 'John Doe' },
    lily = { name: 'Lily Bush' },
    peter = { name: 'Peter Drucker' };

  var obj1 = {
    name: 'Dingo',
    map: new Map([
      [john, 'admin'],
      [lily, 'editor'],
      [peter, 'subscriber']
    ]),
    // set: new Set([1, 2, 3])
  }
})

test("merge should create a clone of object.", function () {
  const obj1 = {name: 'Joe'}
  const obj2 = mergeObjects(obj1)
  expect(obj1 !== obj2).toBe(true)
  expect(obj1.name === obj2.name).toBe(true)
})

test('provding only one object should create a clone of it', function() {
  const obj1 = {
    name: {
      first: 'Joe',
      last: 'Bodoni'
    }
  }

  const obj2 = mergeObjects(obj1)
  expect(obj1 == obj2).toBe(false)
  expect(obj1 === obj2).toBe(false)
  obj1.name.last = 'Anderson'
  expect(obj2.name.last).toBe('Bodoni')
})

const el = {
  header: document.querySelector('header')
}
const Refs = new WeakMap()
Refs.set(el, el.header)
