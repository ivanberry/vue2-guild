# Condition Rendering

## `v-if`

In string templates,for example Handlebars, we would write a conditional block like this:

```HTML
<!-- Handlebars template  -->
{{ #if ok }}
  <h1>Yes</h1>
{{ /if }}
```

In Vue, we use the `v-if` directive to achieve the same:

```HTML
<h1 v-if="ok">Yes</h1>
```
## Template `v-if`

Because `v-if` is a directive,it has to attached to a single element.But what if we want to toggle more than one element?In this case, we can use `v-if` on a `<template>` element,which serves as an invisible wrapper.The final rendered result will not include the `<template>` element.

## `v-else`

You can use the `v-else` directive to indicate an "else block" for `v-if`:

```HTML
<div v-if="Math.random() > 0.5 ">
  Now you see me
</div>
<div v-else>
  Now you don
</div>
```
The `v-else` element must immediately follow the `v-if` element-otherwise it will not be recognized.

## `v-show`

Another option for conditionally displaying element is the `v-show` directive. The usage is largely the same:

```HTML
<h1 v-show="ok">Hello</h1>
```
The difference is that an element with `v-show` will always be rendered and remain in the DOM. `v-show` simply toggles the `display` CSS property of the element.

## `v-if` vs. `v-show`

`v-if` is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggle.

`v-if` is also **lazy**: if the condition is false on initial render, it will not do anything-the conditional block won't be rendered until the conditon becomes true for the first time.

In comparison, `v-show` is much simpler-the element is always rendered regardless of initial condition, with just simple CSS-based toggleing.

Generally speak, `v-if` has higher toggle costs while `v-show` has higher initial render costs. So prefer `v-show` if you need to toggle something very often, and the prefer `v-if` if the condition us unlikely to change runtime.

# List Rendering

# `v-for`

We can use the `v-for` directive to render a list of items based on an array.The `v-for` directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an alias for the array element being iterated on:

Inside `v-for` blocks we have full access to parent scope properties. `v-for` also supports an optional second arguments for the index of the current item.

We can also use `of` as the delimiter instead of `in`, so that it's closer to JavaScript's syntax for iterators:

```HTML
<div v-for="item of items"></div>
```

## Template `v-for`

Similar to template `v-if`, you can also use a `<template>` tag with `v-for` to render a block of multiple elements.For example:

```HTML
<ul>
  <template v-for="item in items">
    <li>{{ item.message }}</li>
    <li></li>
  </template>
</ul>
```

## Object `v-for`

We can also use `v-for` to iterate through the properties of an object(example **vforObj).You can also provide a second argument for the key:

```HTML
<div v-for="(value, key) in object">
  {{ key }} : {{ value }}
</div>
```
And another for the index:

```HTML
<div v-for="(value, key, index) in object">
 {{ index }} : {{ key }} : {{ value }}
 </div>
```
When iterating over an object, the order is based on the key enumeration order of `Object.keys()`,which in **not** guaranteed to be consistent across JavaScript engine implementations.

## Range `v-for`

`v-for` can also take an integer.In this case it will repeat the template that many times.

```HTML
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```
## Components and `v-for`

THIS SECTION SHOULD BE RE_WRITE AFTER SECTION Components


# key
When Vue.js is updating a list of elements rendered with `v-for`, it by default uses an "in-place patch" strategy.If the order of the data items has changed,instead of moving the DOM elements to match the order of the items,Vue will simply patch each element in-place and make sure it reflects what be rendered at that particular index.This is similar to the behavior of `track-by = $index` in Vue 1.x.

This default mode is efficient,but only suitable **when you list render ouput dose not rely on child component state or temporary DOM**

To give Vue a hint so that it can track each node's identity,and thus reuse and reorder existing elements,you need to provide a unique `key` attribute for each items.An ideal value for `key` would be the unique id of each item.This special attribute is a rough equvialent to `track-by` in Vue 1.x,but it works like an attribute,so you need to use `v-bind` to bind it to dynamic values.

```HTML
<div v-for="item in items" :key="item.id">
<!-- content -->
</div>
```
it is recommended to provide `key` with `v-for` whenever possible,unless the iterated DOM content is simply,or you are intentionally relying on the default for performance gains.

Since it's a generic mechanism for Vue to identify nodes,the `key` also has other uses that are not specially tied to, as well will see later in the guilds.

# Array Change Detection

## Mutation Methods

Vue wraps an observed array's mutation methods so they will also trigger view updates.

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

## Replacing an Array

Mutation methods, as the name-suggests,mutation the original array they are called on.In comparison,there are also non-mutating methods,e.g. `filter()`,`concat()` and `slice()`,which do not mutate the original Array but always return a **new** array.When working with non-mutating methods,you can just replace the old array with the new one:

```js
example.items = example.items.filter(function (item) {
  return items.message.match(/Foo/)
});
```
You might think this will cause Vue to throw away the existing ODM and re-render the entire list,luckily that is not the case.Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation.

## Caveats

Due to limitation in JavaScript,Vue **cannot** detect the following changes to an array:

1. When you directly set an item with the index, e.g.`vm.items[indexOfItem] = newValue`
2. When you modify the length of the array, e.g. `vm.items.length = newLenght`

To overcome caveat 1, both of the following will accomplish the same,but will trigger state updates the reactivity system:

```js
// Vue.set
Vue.set(example1.items, indexOfItem, newValue);

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue);
```
To deal with caveat 2, you can also use `splice`:

```js
example1.items.splice(newLength);
```

# Displaying Filtered/Sorted Results

Sometimes we want to display a filtered or sorted version of an array without actually mutating or reseting the original data.In this case,you can create a computed property that returns the filter or sorted array.

For example:

```js
data: {
  number: [1,2,3,4,5]
},
computed: {
  evenNumber: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```
Alternatively,you can also just use a method where computed properties are not feasible(e.g. inside nested `v-for` loops):

```HTML
<li v-for="n in even(numbers)">{{ n }}</li>
```
```js
data: {
  numbers: [1,2,3,4,5]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```
