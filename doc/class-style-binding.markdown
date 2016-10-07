# Class and Style Bindings

A common need for data binding is manipulating an element's class list and its inline styles.Since they are both attributes,we can use `v-bind` to handle them:we just need to calculate a final string with our expressions.However,meddling with string concatenation is annoying and error-prone.For this reason,Vue provide special enhancements when `v-bind` is used with `class` and `style`.In addition to strings,the expressions can also evaluate to objects or arrays.

## Binding with HTML Classes

### Object Syntax

We can pass an object to `v-bind:class` to dynamically toggle classes:

```HTML
<div v-bind:class="{ active: isActive }"></div>
```
The above syntax means the presence of the `active` class will be determined by the **truthiness** of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object.In addition, the `v-bind:class` direction can also co-exit with plain `class` attributes.So given the following template:

```HTML
<div class="static" v-bind:class="{ active: isActive, 'text-danger':hasError }"
</div>
```

```js
data: {
  isActive: true,
  hasError: false
}
```
The bound object doesn't have to inline, they can be object also:

```HTML
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    isActive: true,
    hasError: false
  }
}
```
#### Array Syntax

We can pass an array to `v-bind:class` to apply a list of classes:

```HTML
<div v-bind:class="[activeClass, errorClass]"</div>
```
```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

### Binding inline Styles

#### object syntax

The object syntax for `v-bind:style` is pretty straightforward-it looks almost like CSS,except it's a JavaScript object.You can use either camelClass or kebab-case for the CSS property names:

```HTML
<div v-bind:class="{color: activeColor, fontSize: fontSize + 'px'}"</div>
```
it's often a good idead to bind a style object directly so that the templates is cleaner:

```HTML
<div v-bind:class="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

#### Array Syntax

The array syntax for `v-bind:style` allows you to apply myltiple style objects to the same element:

```HTML
<div :style="[baseStyle, overidingStyles]"</div>
```

#### Auto-prefixing

When you use a CSS property that requires vendor prefixes in `:style`, for example `transform`, Vue will automatically detect and add appropriate prefixs to applied styles
