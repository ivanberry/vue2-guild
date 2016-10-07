## What's Vuejs
Vue is a **progress framework** for building user interfaces. Unlike other monolithic framework, Vue is designed from the ground up to be incrementally adoptable. The core library is focused one the view only, and is very easy to pick up and integrate with other library or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated when used in combination with modern tooling and supporting libraries.
## declarative Rendering
At the core of Vue is a system that enables us to declarative render data to the DOM using straightforward syntax;

```html
<div id ='app'>
    {{ message }}
</div>
```

```js
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});
```
We have already created our very first Vue app! This looks pertty similar to just rendering a string template, but Vue has done a lot of work under the hood.The data and the DOM are now linked,and everything is now reactive.How do we know? Just open up your browser's console and set `app.message` to a different value.You should see the rendered example above update accordingly.

In addtion to text interpolation, we can also bind element attributes like that:

```html
<div id='app-2'>
  <span v-bind:id='id'>Inspect me</span>
```
```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    id: 'Inspect me'
  }
})
```
Here we are encountering something new.The `v-bind` attribute you are seeing is called a **directive**.Directive are prefixed with `v-` to indicate that are special attribute provided by Vue, and as you my have guessed, they apply specail reactive behavior to the rendered DOM.Here it is basiclly saying "bind this element's `id` attribute to the `id` property on the Vue instance".

## Condition and loops
we can bind data to not only text and attribute,but also the structure of the DOM.Morever,Vue also provides a powerfull transition effect system that can automatically apply **transition effects** when elements are inserted/updated/removed by Vue.

There are quite a few other directives, each with its own special functionality.For example, the `v-for` directive can be used for displaying a list of items using the data from an Array.You can also push some data in console and watch the list list render change.

## Handling User Input
To let users interact with your app,we can use the `v-on` directive to attach event listeners that invoke methods to our Vue instance.

Note in the method we simply update the state of our app without touching the DOM - all DOM manipulations are handing by Vue, and the code you write is focused on the underlying logic.

Vue also provides the `v-model` direvtive that makes two-way binding between form input and app state a breeze.(易如反掌)

## Composing with Components

The component system is another important concept in Vue, because it's an abstraction that allows us to build large-scale application composed of small, self-containerd, and often reusable components. If we think about it,almost any type of applicaion interface can be abstracte into a tree of components.

`Vue.component` register the vue components first, and then use it as normal tag like `p`,`span`, but with some logic.

## Properties and methods
Each Vue instance proxies all the properties found in `data` object:

```js
var data = {a:1};
var vm = new Vue({
  data:data
})

vm.a === data.a === 1 //true
vm.a = 2;
data.a === 2 //true

data.a = 3;
vm.a ==== 3; //true
```
It should be note that only these proxied properties are **reactive**,If you attach a new property to the instance after it has been created,it will not trigger any view updates.
In addtion to data properties, Vue instance expose a number of usefull instance properties and methods.These properties and methods are prefixed with `$` to differentiate from proxied data properties.

## Instance Lifecycle Hooks

Each Vue instance goes through a series of initialization steps when it is created-for example,it needs to set up data observation,compile the template,mount the instance to the DOM,and update the DOM when data changes.Along the way, it will also invoke some lifecycle hooks,which give us the opportunity to execute custom logic.For example,the `created` hook is called after the instance created.

There are also other hooks which will be called at different stage of the instance's lifecycle,for example `mounted`, `update` and `destroy`.All lifecycle hooks are called with their with `this` context pointing to the Vue instance invoking it.
