# Contents Distribution with Slots

When using components, it's often desired to compose them like this:

```HTML
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```
There are two things to note here:

1. The `<app>` component does not know what content may be present inside its mount target. It's decided by whatever parent component that is using `<app>`.
2. The `<app>` component very likely has its own template.

To make the composition works, we need a way to interweave the parent "content" and the component's own template. This is a process called **content distribution**. Vue.js implements a content distribution API that is modeled after the current **Web Component spe draft**, using the special `<slot>` element to serve as distribution outlets for original content.

## Compilation Scope

Before we dig into the API, let's first clarify which scope the contents are compiled in. Imagine a template like this:

```HTML
<child-component>
  {{ message }}
</child-component>
```
Should the `message` be bound to the parent's data or the child data? The answer is the parent. A simple rule to thumb for component scope is:

>Everything in the parent template is compiled in parent scope;everything in the >child template is compiled in child scope.

A common mistake is trying to bind a directive to a child property/method in the parent template:

```HTML
<!-- does not work -->
<child-component v-show="someChildProperty"></child-component>
```
Assuming `someChildProperty` is a property on the child component, the example above would not work. The parent's template is not aware of the state of a child component.

If you need to bind child-scope directives on a component root node, you should do so in the child component's own tempalte:

```JS
Vue.component('child-component', {
  // this does work, because we are in the right scope
  tempalte: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
});
```
Similarly, distributed content will be compiled in that scope.

## Single Slot

Parent content will be discarded unless the child component template contains at least one `<slot>` outlets. When there is only one slot with no attributes, the entire content fragment will be inserted at its position in the DOM, replacing the slot itself.

Anything originally inside the `<slot>` tags is considered **fallback content**. Fallback content is compiled in the child scope and will only displayed if the hosting element is empty and has no content to be inserted.

Suppose we have a component called `my-component` with following template:

```HTML
<div>
  <h2>I'm the child title</h2>
  <slot>
    This will only be displayed if there is not content to be distributed.
  </slot>
</div>
```
```HTML
<div>
  <h1>I'm the parent title</h1>
  <my-component>
    <p>This is some original content</p>
    <p>This is some original content</p>
    <p>This is some original content</p>
  </my-component>
</div>
```
The rendered result will be:
```HTML
<div>
  <h1>I'm the parent title</h1>
  <div>
    <h1>I'm the child titile</h2>
    <p>This is some original content</p>
    <p>This is some original content</p>
    <p>This is some original content</p>
  </div>
</div>
```

## Named slots

`<slot>` elements have a specail attribute, `name`, which can be used to further customize how content should be distributed. You can have multiple slots with different names. A named slot will match any element that has a corresponding `slot` attribute in the content fragment.

There can still be one unnamed slot, which is the default slot that serves as a catch-all outlet for any unmatched content.If there is no default slot, unmatched content will be discarded.

For example, suppose we have an `app-layout` component with the following template:

```HTML
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
Parent markup:

```HTML
<app-layout>
  <h1 slot="header">Here might be a page title</h1>
  <p> And another
  <p slot="footer">Here's some contact</p>
</app-layout>
```

The rendered result will be:

```HTML
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content</p>
    <p>And </p>
  </main>
  <footer>
    <p>Here's a some contact info</p>
  </footer>
</div>
```

## Dynamic Components

You can use the same mount point and dynamically switch between multiple components using the reserved `<component>` element and dynamically bind to it's `is` attribute:
(See details in leanpub-doc)

### keep-alive

If you want to keep the switched-out components in memory so that you can preserve their state or avoid re-rendering,you can wrap a dynamic component in a `keep-alive` element:

```HTML
<keep-alive>
  <component :is="dynamicComponent"></component>
</keep-alive>
```
## Misc

### Authoring Reusable components

When authoring components, it's good to keep in mind whether you intend to reuse it somewhere else later. It's OK for one-off components to tightly coupled, but reusable components should define a clean public interface and make no assumption about the context it's used in.

The API for a Vue component comes in three parts-props,events,and slots
- **Props** allow the external environment to pass data into the component
- **Events** allow the component to trigger side effects in the external environment
- **slots** allow the external environment to compose the component with extra content.

With the dedicated shorthand syntaxes for `v-bind` and `v-on`, the intents can be clearly and succinctly conveyed in the templates:

```HTML
<my-component :foo="baz" :bar="qux" @event-a="doThis" @event-b="doThat">
  <img slot="icon" src="..." alt="" />
  <p slot="main-text">Hello!</p>
</my-component>
```

### Child Components Refs

Despite the existence of props and events, something you might still need to directly access a child component in JavaScript. To achieve this you have to assign a reference ID to the child component using `ref`. For example:

```HTML
<div id="parent">
  <user-profile ref="profile"></user-profile
</div>
```
```js
var parent = new Vue({
  el: '#parent'
})

var child = parent.$refs.profile
```

### Async components

In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it's actually needed. To make that easier, Vue allows you to define your component as a factory function that asynchronously resolves your component definition. Vue will only trigger the factory function when the component actually needs to be rendered and will cache the result for future re-renders. For example:

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div> I am async!</div>'
    })
  }, 1000);
})
```

The factory function receives a `resolve` callback, which should be called with when you have our component definition from the server. You can also call `reject` to indicate the load has failed. The `setTime` here is simply for demonstration. How to retrieve the component is entirely up to you. One recommended approach  is to use async components together with `Webpack's cook-splitting feature`.

```js
Vue.component('async-component-example', function (resolve) {

})
```
You can also return a `Promise` in the resolve function, so with Webpack 2+ ES2015 syntax you can do:

```js
Vue.component('async-component-example', () = > System.import('./my-async-component'))
```

### Component Naming Conventions

When registering components(or props), you can use kebab-case, camelCase, or TitleCase. Vue doesn't care.

```js
components: {
  'kebab-case': {},
  'camelCase': {},
  'TitleCase': {}
}
```
With HTML templates though, you have to use the **kebab-case** equivalents:

```HTML
have to using kebab-case component name in HTML
<kebab-case-component></kebab-case-component>
<camel-case-component></camel-case-component>
<title-case-component></title-case-component>
```
When using `string` templates however, we're not bound by HTML's case insensitive restrictions. That means even in the template, you reference your components and props using camelCase, PascalCase, or kebab-case:

```HTML
<my-component></my-component>
<myComponent><myComponent>
```
If you component isn't passed content via `slot` elements, you can even make it self-closed with a `/` after the name.

```HTML
<my-compnent/>
```
### Recursive Component

Components can recursively invoke themselves in their own template. However, they can only do so with the `name` option:

```js
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```
A component like the above will result in a "mix stack size exceed" error, so make sure recursive invocation is conditional(i.e. using `v-if` that will eventually be false). When you register a component globally using `Vue.component`, the global ID is automatically set as the component's `name` option.

### Inline templates

When the `inline-template` specail attribute is present on a child element, the component will use its inner content as its template, rather than treating it as distributed content. This allows more flexible template-authoring.

```HTML
<my-component inline-template>
  <p>There are compiled as the component's own template<p>
<my-component>
```
### X-templates

Another way to define templates is inside of a script element with the type `text/x-template`, then referencing the template by an id. For example:

```HTML
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

These can be useful for demos with large templates or in extremely small applications, but should otherwise be avoided, because the separate templates from the rest of the component definition.

### Cheap Static Component with `v-once`

Rendering plain HTML elements is very fast in Vue, but sometimes you might have a component that contains a lot of static content. In these case, you can ensure that it's only evaluated once and then cached by adding the `v-once` directive to the root element like this: 

```js
Vue.component('terms-of-service', {
  template: '\
    <div v-once>
      <h1>xx</h1>
    </div>\
  '
});
```
