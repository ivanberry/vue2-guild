# Computed Properties and Watchers

## Computed Properties
Computed expressions are very convenient,but they are really only meant for simple operation.Putting too much logic into your template can make bloated and hard to maintain.For exmaple:

```HTML
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```
At this point, the template is no longer simple and declarative. You have to look at it for a second before realizing that it displays `message` in reverse.The problem is made worse when you want to include the reversed message in your template more than once. That's why for any complex logic, you should use a computed property.

### Basic Example

Example in `src/index.html`.

There we have declared a computed property `reverseMessage`.The function provided will be used as the getter function for the property `app8.reverseMessagel`.

You can open the console and play with example vm yourself.The value of `app8.reverseMessage` is always dependent on the value of `app8.message`.

You can data-bind to computed properties in templates just like a normal property.Vue is aware that `vm.reverseMessage` depends on `vm.message`, so it will update any bindings that depend on `vm.reverseMessage` when `vm.message` changes.And the best part is that we've created this dependency relationship declaratively:the computed getter function is pure and has no side effect,which makes it easy to test and reason about.

### computed Caching vs Methods

You may have noticed we can achieve the same result by invoking a method in the expression:

```HTML
<p>Reverse Message: {{ reverseMessage }}</p>
```
```js
//in component
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('');
  }
}
```
Instead of a computed property, we can define the same function as a method.For the end result, the two approaches are indeed exactly the same.However,the different is that **computed properties are cached based on its dependencies**.A computed property will only re-evaluate when some of its dependency have changed.This means as long as `message` has not changed,multiple access to the `reverseMessage` computed property property will immediately return the previously computed result without having to run thr function again.

This also means the following computed property will never update,because `Date.now()` is not a reactive dependency(注:因为`computed property`只有当依赖变动时才会运行对应的`getter`方法):

```js
//
computed: {
  now: function () {
    //never invoked after the initialize
    return Date.now();
  }
}
```
In comparison, a method will always run the function whenever a re-render happens.

Why do we need caching? Image we have an expression computed property *A*,which requires looping through a huge Array and doing a lot of computations.Then we may have other computed properties that in turn depend on *A*.Without caching,we would be executing *A*'s getter many more times than necessary!In cases where you do not want caching.use a method instead.

### Computed vs Watched Property

Vue does provide a more generic way to observe and react to data changes on a Vue instance: **watch properties**.When you have some data that needs to change based on some other data,it's tempting to overuse `watch`-especially if you are coming from an AngularJS background.However,it's often a better idea to use a computed property rather than an imperative `watch` callback.Consider this example(exmaple in app-9).

### Computed Setter

Computed properties are by default getter-only, but you can also provide a setter when you need it(app-11)

### Watchers

While computed properties are more appropriates in most case, there are times when a custom watcher is necessary.That's why Vue provides a more generic way to react to data changes through the `watch` option.This is most useful when you want to perform asynchronous or expensive operation in response to changing data(watch-example).

In that case, using the `watch` option allows us to perform an asynchronous operation(accessing an API),limit how often we perform that operation,and set intermediary states until we get a final answer.None of that would be possible with a computed property.
