# Building Large-Scale Application

## ECMAScript 6
Before we take a step further and see how we can build Large-Scale Applications, I would like to familiarize you with ECMAScript 6.

### ES6 features
1. Variable Declarations
- Let Declarations
**let** is the new **var**. You can basically replace var with let to declare a variable,but limit the varaibale's scope only to the current code block.Since let Declarations are not hoisted to the top of the enclosing block, you better always place let declarations first in the block, so that they are available to the entire block.

- Constant Declarations
Constant,like let declarations, are block-level declarations.There is one big difference between let and const. Once you declare a variable using const, it is defined as a constant, which means that **you can't change its value**.

2. Arrow Functions

One of the most interesting new parts of ES6 is the arrow functions.Arrow functions are function defined with a new syntax that uses an "arrow"(=>).They support both expression and statement bodies.Unlike functions, arrow share the same lexical **this** as their surrouding code.

3. Modules

This is, to me, the biggest improvement of the language.ES6 now support exporting and importing Modules across different files.

This simplest example is to create a *.js* file with a variable, and use it inside another file like this:

```js
export name = 'Alex';
```
4. Classes
5. Default Parameter Values

With ES6 you can define default Parameter values.

## Advanced Workflow

All these ES6 features may get you excited,but there is a catch here. As we mentioned before, not all browsers fully support.

In order to be able to write this new JavaScript syntax today, we need to have a middleman which will take our code and transpile it to **Vanilla JS**, which every browser understands. This procedure is realy important in production,vent though you might not think so.

### Compiling ES6 with Babel

# Mastering Single File Components

As we promised, in this chapter we are going to review Single File Components.To build these single-file Vue components we need tools like **Webpack** with **vue-loader**。

Single File Components or Vue Components allow us to specify a template, a script, and style rules, all in one files using ** .Vue ** extension. So, each component encapsulates its CSS styles, template and JavaScript code, in the same place. And that' were webpack steps in, to bundle this new type of files with the others.

In addtion, we need vue-loader to transform Vue components into plain JavaScript modules. *vue-loader* is a loader for Webpack that also provides a very nice set features, such as ES6 enabled by default, scoped CSS for each component, and more.

## The *vue-cli*
