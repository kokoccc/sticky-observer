# Sticky Observer

_[🇷🇺 На русском](./RU.md)_

JavaScript utility to observe sticky elements using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

The script slightly adjusts the provided `offsets`, reducing them by 1px, and passes changed values as [rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).
When the observer triggers, we calculate the difference between boundaries of the element and those of the root element.
If the difference is approximately 1px, the element is considered stuck.


## Demo

HTML page: https://kokoccc.github.io/sticky-observer

CodePen: https://codepen.io/kokoc/pen/MWNxzdr


## ⚠️ Keep in mind

There's no standard way to detect if an element is stuck. Besides, the observer returns calculation results with varying precision, which is an uncontrollable process. The script allows a small margin of error — a little less than one pixel, and tests indicate that this approach significantly improves the likelihood of correct behavior in most scenarios.

But it can't be guaranteed the script will always work consistently across all browsers and devices. Carefully check the functionality before using this utility in your project.


## Installation (NPM package)

If you want to install `StickyObserver` as an NPM package, add it as a dependency:

```shell
# NPM
npm install @kokoccc/sticky-observer

# Yarn
yarn add @kokoccc/sticky-observer
```

Then import it:

```js
// Node.js
const StickyObserver = require('@kokoccc/sticky-observer')

// ES6 Module
import StickyObserver from '@kokoccc/sticky-observer'
```


## Installation (web browser)

Load a script via `<script>` tag:

```html
<!-- Remove '.min' before the extension for a non-minified version -->
<script src="https://unpkg.com/@kokoccc/sticky-observer/dist/sticky-observer.umd.min.js"></script>
```


## Usage

Create an instance of `StickyObserver` and invoke the method `observe` to start an observation process:

```js
const observer = new StickyObserver(callback, offsets, root)
observer.observe(element) // Pass target HTML element here
```

### Parameters:

`callback` (required) — a callback function which is called every time the element becomes stuck or unstuck. Receives 3 arguments:

- `states` — an object with boolean flags: `isTop`, `isRight`, `isBottom`, `isLeft` and `isStuck` (`true` if at least one of the direction flags equals `true`)
- `entries` — see [MDN description](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#entries)
- `observer` — see [MDN description](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#observer)

`offsets` (optional) — an object with optional properties: `top`, `right`, `bottom`, `left`. Their values should be the same as a target element's CSS same-name offsets (in pixels). E.g., if we have `top: 20px` in CSS, we should set `{ top: 20 }` here

`root` (optional) — see [MDN description](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#root)


## Example

```js
const element = document.querySelector('.header')
const offsets = { top: 0 } // We want the header to be stuck at the top

const onIntersect = ({ isStuck }, [entry], observer) => {
  const { target } = entry // `target` equals `element` here
  target.classList.toggle('stuck', isStuck) // toggle class to change styles
}

// Third parameter is omitted here, so it will be a page viewport
const observer = new StickyObserver(onIntersect, offsets)

// Pass the element and run the observer
observer.observe(element)

// …stop observing after a while, if needed
observer.disconnect()
```

See the [demo](#demo) source code for more details.


## License

[MIT](./LICENSE)


