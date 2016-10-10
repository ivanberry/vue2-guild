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

## Create a new vue file

Once we create the **Login.vue**, In order to view the file in the browser we have to include our Login component somewhere.So, we'll import it into the main 'App.vue' file and append it to its components object.


## Nested Components

We could like to be able to display the most "famous" stories, at any place we want to. So after the creation of a "Famous" component, we should be able to use it anywhere.

We have filter the `story` array using computed properties, and create a template to display them. But where could we use this component? An idea is a have it within the Registration page, so the user could read the  most trending stories and become intrigued. This means - in the current project-that we need to have the Famous component within the Register one.Well, this can be done the same way we did it inside App.vue.

## Eliminating Duplicate State

In the previous examples we have hardcoded the data within each Component. This is not a proper way to work with data.

When more than one Component uses the same data, it's a good practice to create/fetch the array once, and then find a way to share it between application's components.

Stories.vue and Famous.vue are using the same data stories array. We will review two ways of creating the array once, and then sharing it between the components.

1. Using components properties.
2. Using a global store.

### Sharing with Properties

The first thing we are going to do is to move the stories array to App component.
The next step is remove the `data ()` from Stories and Famous components, and declare stories property.

```JS
export default {
  props: ['stories']
}
```
We have to update the way we reference our component within App.vue.Here we **bind stories prop** to **stories** array.

```HTML
<stories :stories="stories"></stories>
```
Success, we got our stories again, fetched from the parent component! We can't do the same for "famous" component because it is not referenced inside App.vue. We will have to pass our array to **Register** component in order to pass it to **Famous**.

This implementation works, but is not efficient, because **Famous** component is **not independent**. This means that we cannot use it whenever we want, unless we pass down the data from root component(APp.vue).

In a scenario where a not independent is deeply nested, you will have to pass a useless property , from component to component, just to be able to use it. In our case, if we wanted to use **Famous** component inside **Register** sidebar's widget, we would have to carry the stories array all the way long.

**APP** -> **Register** -> **Sidebar** -> **WidgetX** -> **Famous**

### Global Store

The "props" way seemed nice at fist, but as seen in the **famous** component, as a project get bigger and components get nested into others, data management and sharing between them gets really hard to track.

So let's make data of our example a bit easy to handle.

We can extract the stories data to a .js file, store them to a constant and later import them at the desirable locations.

We can name the file as store.js and put it inside */src* directory.

**Warning**:

The stories prop must be removed from all files, because we have changed the way of data storage and there can be conflicts, which can break our build.

After we have stored all data in store.js we can import it within Stories.vue using ES6 modules syntax.

Because we are importing the store object we have to change the component's template as well.
