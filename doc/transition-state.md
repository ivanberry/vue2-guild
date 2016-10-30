# Transition State
Vue's transition system offers many ways to animate entering, leaving, and lists, but what about animating your data itself? For exmaple:

- numbers and calculations
- colors displayed
- the positions of SVG nodes
- the sizes and other properties of elements

All of these are either already stored as raw numbers or can be converted into numbers. Once we do that, we can animate these state changes using 3rd-party libraries to tween state, in combination with Vue's reactivity and component systems.
