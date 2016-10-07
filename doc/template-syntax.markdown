## Template Syntax

Vue.js use an HTML-based template syntax that allows you to declaratively bind the rendered DOM to to the underlying Vue instance's data.All Vue.js templates are valid HTML that can be parsed by spec-compliant browsers and HTML parses.

Under the hood, Vue compiles the templates into Virtual DOM render functions.Combined with the reactivity system,Vue is able to intelligently figure out the minimal amount of components to re-render apply the minimalamount of DOM manipulations when app state changes.

### Interpolations

#### text

The most basic form of data binding is text Interpolation using the "Mustache" syntax:

```HTML
  <span>Message: {{ msg }}</span>  
</div>
```

The mustache tag will re replaced with the value of the `msg` property on the corresponding data object.It will also be updated whenever the data objet's `msg` property changes.

You can perform one-time Interpolations that do not update on data change by using the `v-once-directive`, but keep in mind this will also affect any binding on the same node:

```HTML
<span v-once>This will never change: {{ msg }}</span>
```

#### raw HTML

The double mustache interprets the data as plain text,not HTML, In order to output real HTML, you will need to use the `v-html` directive:

```HTML
<div v-html="rawHtml">rawHTML</div>
```
The contents are inserted as plain HTML-data binding are ignored.Note that you cannot use `v-html` to compose template partials, because Vue is note a string-based templating engine.

**Dynamically** rendering arbitrary HTML is dangerous, because it can easily lead to **XSS attacks**.

#### Attributes

Mustache cannot be used inside HTML attirbutes, instead use a `v-bind` directive:

```HTML
<div v-bind:id="DynamicId"></div>
```

It also works for boolean attributes-the attribute will be removed if the condition evaluates to a false value:

```HTML
<button v-bind:disabled="someCondition">Button</button>
```

#### Using Javascript Expressions

So far we've only been binding to simple property keys in our templates, But Vue.js actually supports the full power of JavaScript expressions inside all data bindings:

```HTML
{{ number + 1 }}
{{ ok ? 'YES' : 'NO'}}
{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id "></div>

```

These expressions will be evaluated as JavaScript in the data scope of the owner Vue instance.One restriction is that each binding can only contain one single expression, so the following will **NOT** work:

```HTML
<!-- This is a statement not an expression -->
{{ var a = 1 }}

<!-- flow control wont work, use ternay expresion -->
{{ if (ok) { return message } }}
```

#### Filters

Vue.js allows you to define filters that can be used to apply common text formatting.Filters should be appended to the end of a mustache interpolation by the "pipe" symbol:

```HTML
{{ message | capitalize }}
```
The filters function always receive the **expression's value** as the first argument.

```js
new Vue({
  //...
  filters: {
    capitalize: function (value) {
      if(!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
})
```
Filters can be chained:

```HTML
{{ message | filterA | filterB }}
```
As above, filters are JavaScript functions, so they can get arguments:

```HTML
{{ message | filterA('arg1', arg2) }}
```
Here, the plain string 'arg1' will be passed into the filter as the second argument, and the value of arg2 will be passed in as the third argument.


### Direcives

Direcives are special attributes with `v-` prefix.Directive attribute values are expected to be a **a single JavaScript expression**(with the exception for`v-for`,which will be discussed later),A directive's job is to reactively apply side effects to the DOM when the value of its expression changes.Let's review the example we saw in the introduction:

```HTML
<P v-if="seen">Now you can see me </p>
```
Here, the `v-if` directives would remove/insert the `p` element based on the truthiness of the value of the expression `seen`.

#### Arguments

Some directives can take an "argument",denoted by a colon after the directive name, For example, the `v-bind` directive is used to reactively update an HTML attribute:

```HTML
<a v-bind:href = "url"></a>
```
Here `href` is the argument,which tells the `v-binf` directive to bind the element's href attribute to the value of the expression `url`.

Another example is the `v-on` directive,which listens on DOM events:

```HTML
<a v-bind:click="doSomething"></a>
```
Here the argument is the event name to listen to.

#### Modifiers

Modifiers are special postfixes denoted by a dot,which indicates that a directive should be bound in some special way.For example,the `.prevent` modifier tells the `v-on` directives to call `event.preventDefault()` on the trigged event:

```HTML
<form v-on:submit.prevent="onSubmit"></form>
```
We will see more use of modifiers later when we take a more thorough look at `v-on` and `v-model`.

### Shorthands

The `v-` prefix serves as a visual cue for identify Vue-specific attributes in your templates.This is usefull when you are using Vue.js to apply dynamic behavior to some exsiting markup,but can feel verbose for some frequently used directives.At the same time,the need for the `v-` prefix becomes less important when you are building an **SPA** where Vue.js manages every template.Therefore, Vue.js provides special shorthands for two of the most used directives,`v-bind` and `v-on`:

#### `v-bind` shorthand

```HTML
<!-- full syntax -->
<a v-bind:href="url"></a>

<!-- shorthand syntax -->
<a :href="url"></a>
```
#### `v-on` shorthand

```HTML
<!-- full syntax -->
<a v-on:click="doSomething"></a>

<!-- shorthand syntax -->
<a @click="doSomething"></a>
```

The may look differet from normal HTML, `:` and `@` are valid chars for attribute names and all Vue.js supported browsers can parse it correctly.In addition, they do not appear in the final rendered markup.The shorthand syntax is totally option,but you will likely appreciate it when you learn more its useage later.
