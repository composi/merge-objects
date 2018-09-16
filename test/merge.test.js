import { merge } from "../src"

test('merge should combine two objects and return a new one with those properties.', function() {
  const obj1 = { name: 'Mary' }
  const obj2 = { job: 'project manager' }
  const person = merge(obj1, obj2)
  expect(person.name).toBe('Mary')
  expect(person.job).toBe('project manager')
})

test('merge should create a new object where the properties of first object are replaced by those of the later', function() {
  const person1 = { name: 'Joe', job: 'mechanic', age: 26}
  const person2 = { name: 'Joe', job: 'astronaut', age: 45}
  const person3 = merge(person1, person2)
  expect(person3.name).toBe('Joe')
  expect(person3.job).toBe('astronaut')
  expect(person3.age).toBe(45)
})

test('merge should combine multiple objects into a new one', function () {
  const obj1 = {name: 'Jane'}
  const obj2 = {job: 'lab technician'}
  const obj3 = {age: 28}
  const obj4 = {employer: 'Genentech'}
  const obj5 = merge(obj1, obj2, obj3, obj4)
  expect(obj5.name).toBe('Jane')
  expect(obj5.job).toBe('lab technician')
  expect(obj5.age).toBe(28)
  expect(obj5.employer).toBe('Genentech')
})

test("merge should create a clone of object.", function () {
  const obj1 = {name: 'Joe'}
  const obj2 = merge(obj1)
  expect(obj1 !== obj2).toBe(true)
  expect(obj1.name === obj2.name).toBe(true)
})