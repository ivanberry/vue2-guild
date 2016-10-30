# Render Functions

## Basics

Vue recommends using templates to build your HTML in the vast majority of cases. There are situations however, where you really need the full programmatic power of JavaScript. That's where you can use the **render function**, a closer-to-the-compiler alternative to templates.

Let's dive into a simple example where a `render` function would be practical. Say you want to generate anchored headings:

```HTML
<h1>
  <a name="hello-world" href="#hello-world">
    Hello World
  </a>
</h1>
```
For the HTML above, you decide you want this component interface:

```HTML
<anchored-heading :level="1">Hello world</anchored-heading>
```
