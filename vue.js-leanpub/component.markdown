# What are Components?

Components are one of the most powerful features of Vue.js.They help you extend basic HTML elements to encapsulate reusable code.At a high level,Components are custom elements that Vue.js' compiler would attach special behavior to.In some cases,they may also appear as a native HTML element extended with special `is` attribute.

# Using Components

- Registration
- Using

Before Using any Components, you must register it first,or How to use that component which even did't hava a "tagName"?

```js
Vue.component('story', {
  template: '<h1>MY horse is amazing!</h1>'
});
```
After we register a component, then we can use it as a **SPE** tag.

```HTML
<div class="container">
  <story></story>
</div>

<script type="text/javascript">
new Vue({
  el: '.container'
});
</script>
```Yaah! we need initial the container first! That's pretty understandable.

Note that,the basic practice is name your component with unique name to avoid collisions with any possible tags that might get introduced at some point in the further.

# Templates

There are more than one way to use templates, The inline one is easy to use, but it's also get "dirty" vary fast.

Another way to declare a template is to create a `script` with type set to `text/template` and set and `id` of `story-template`.To use this template we need a reference a selector in the `template` option of our component to this script.

```HTML
<script type="text/template" id="story-template">
    <h1>My horse is amazing!</h1>
</script>
<script type="text/javascript">
  Vue.component('story', {
    el: '#story-template'
  });
</script>
```
**INFO**:"text/template" is not a script that the browser can understand and so the browser will ignore it.This is allow you to put anything you want in there.which can then be extracted and generate HTML snippets.

Anther way to define a `template` is to create a `template` element HTML tab directly and give it an `id`.

```HTML
  <template id="story-template">
    <h1>My horse is amazing!</h1>
  </template>
  <script type="text/javascript">
  Vue.component('story', {
    template: '#story-template'
  });
  </script>
  ```
# Properties

Let's see now how we can use multiple instances of our `story` component to display a list of stories.We have to update the `template` to not display always the same story,but the plot of any story we want.

```HTML
<template id="story-template">
  <h1>{{ plot }}</h1>
</template>
```
```js
Vue.component('story', {
  props:['plot'],
  template:'#story-template'
});
```
And now we can pass a `plot` and a plain string to it, every time we use `<story>` element.

```HTML
<div class="container">
  <story plot="My horse is amazing!"></story>
  <story plot="Your horse is amazing!"></story>
  <story plot="His horse is amazing!"></story>
</div>
```
**Warning**: HTML attributes are case-insensitive.When using camelCase prop names attributes,you need to use their kebab-case equivalents.So ,camelCase in JavaScript,kebab-case in HTML.e.g.: `props:[isUser], <story is-user="hello"><story>`.

As you have probably imagined, a component can have more than one property.For example, if we want to display the writer along with the plot for every story.we have to pass a `write` too.

```HTML
<story plot="my horse is amazing!" writer="tab"><story>
```
If you have lot of properties and you elements are becoming dirty, you can pass an object and display its properties.

We will refactor our example one more time to wrap up.

```HTML
<div class="container">
    <story :story="{plot: 'My horse is amazing!', writer: 'tab'}"></story>
    <story :story="{plot: 'His horse is amazing!', writer: 'His'}"></story>
    <story :story="{plot: 'Her horse is amazing!', writer: 'Her'}"></story>
</div>
```
**INFO**: `v-bind` is used to dynamically bind one or two attributes, or a component prop to an expression. Since `story` property is not a string but a javascript object instead of `story="..."` we use `v-bind:story="..."`to bind `story` property with the passed object.The shorthand of `v-bind:story` is `:story`.

# Reusable

Let's take a look again at our example.Assume this time we take the stories variable data from an external API through an http call.The API developers decide to rename `plot` story property to `body`. So now, we have to go through our code and make the necessary changes.

**Tip**: Whenever you find yourself repeating a piece of functionality, the most efficient way to deal with it is to create a dedicated Component.

Luckily we have create a `story` Component, which displays the writer and the body for a specified story.We can use the custom element `<story>` inside our HTML and pass each story as we did before with `:story` tag,but this time we will do inside the `v-for` directive.(e.g. show in `index.html`)

The next step allows user to give a vote to the story he prefers. To apply this limit we will display the "Upvote" button only if the user has not already voted.So, every story must have a voted property that becomes true when upvote function executes.

We have implemented, with the use of methods,the voting system.I think it looks good, so we can continue with the 'favorite' story part.We want the user to be able to choose only one story to be his favorite.The first thing that comes to my mind is to add new empty object and whenever the user chooses one story to be his favorite,update favorite variable.This way we will be able to check if a story is equal to the user's favorite story.

If you try to run the above code, you will find that it does not work as it should be. Whenever you try to favorite a story,the variable inside `$data` remains null and we get none response.

It seems that our story component is unable to update favorite object, so we are going to pass it on each story and add favorite to component's properties.

# Q:

1. Why deprecated `sync` modifier? And now how to achieve the **two-way-binding**? and how to use `emit` event to pass data from child to parent?


# Class and Style Bindlings

## Class binding

### Object Syntax

A common need for data binding is manipulating an element's class and its styles.For such cases, you can use `v-bind:class`.This can be used to apply classes conditionally,toggle them and/or apply many of them using one binded object et al.

The `v-bind:class` directive takes an object with the following format as an argument:

```js
{
  'classA': true,
  'classB': false,
  'classC': true
}
```
and applies all class with true value to the element.For example, the classes of the following element will be **classA** and **classC**.

```HTML
<div :class="elClasses"></div>
```
```js
data: {
  elClasses: {
    classA: true,
    classB: false,
    classC: true
  }
}
```
To demonstrate how `v-bind` is used with class attributes, we are going to make an example of class toggling.Using `v-bind:class` directive,we are going to dynamically toggle the class of body element(example in **leanpub-class-bind.html**)

We have applied a class to the body(in vue 2.0 mounted vue instance on body or html will be a anti-pattern).What this code actually does, is "flipping" the background color with a hit of the button.Pressing it invokes the `flipColor` function that reverses the value of "color" originally set to true.Then the `v-bind:class` is going to toggle the class name to "body-red" or "body-blue" conditionally depending on the truthfulness of "color" value. That given,the style is going to apply on each class and give us the desired result, according to which class is active.

**INFO**: The `v-bind:class` directive can co-exist with plain class attribute. So in our example, body always has the `text-center` and conditionally one of `body-red` or `body-blue`.

### Array Syntax

We can apply also apply a list of classes to an element,using an array of classnames.

```HTML
<div :class="['classA', 'classB', 'classC']"></div>
```
Applying conditionally a class, can also be achieved with the use of inline if inside the array.

```HTML
<div :class="['classA', condition ? 'classB' : 'classC']"></div>
```
## Style Binding

Using `:style` we can apply inline style on elements, it also has **Obejct Syntax** and **Array Syntax**.

**INFO**: personal, the cool modifier is **prefix**.

## Binds in Action

The above example has an array of objects called "tasks" and styleObject which contains only one property.With the use of `v-for` a list of tasks is rendered and each task has a "done" property with a boolean value, Depending on the value of "done", a class is applied as conditionally as before.If a task has been completed, then css style applies and the task has a text-decoration of line-through.Each task is accompanied by a button listening for the "click" event which triggers a method, altering the completion status of the task. The *style* attribute is binded to *styleObject* resulting in the change of 'color'.
