## HTML Portion

1. Where to find documentation for HTML, CSS, and Javascript attributes?
Referencing the Mozilla Developer Network (MDN) documentation is a good start ("mdn [tag] [attribute]")

2. How does the `accept` attribute work?
* The `accept` attribute provides **hints** for browsers to guide users to select the correct file types.
* The `accept` attribute itself doesn't validate the types of the selected files
* We can use **unique file type specifiers** to guide what a user can select:
  * A valid case-insensitive filename extension (`.gba`)
  * A valid MIME type string with no extension
  * `audio/*`, `video/*`, `image/*`

> References: 
> [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept)

3. Why does `<input>` not require `</input>`?
The official HTML spec is maintained by [WHATWG](https://html.spec.whatwg.org/multipage/syntax.html#void-elements), that specifies six kinds of elements:
    1. Void Elements
       * [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) lists 14 different kinds, with the deprecated <param> element
       * Void elements only have start tags and must not have end tags
    2. Template element
    3. Raw text elements (script, style)
    4. Escapable raw text elements (textarea, title)
    5. Foreign elements
      * Elements from namespaces like SVG, MathML, etc
    6. Normal elements
      * Basically everything else

> References:
> [WHATWG Docs](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)
> [MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/Void_element)

4. What is `defer` and when should I use it?

The `defer` property of the HTMLScriptElement interface is a boolean value that controls how the script should be executed. 

If `defer` is set to `true`, the external script will:
* Be downloaded asynchronously 
* Executed after the HTML document has been parsed, but before firing `DOMContentLoaded` event.

`defer` has no effect on module scripts.

> References:
> [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/defer)

## Javascript Portion
1. Can I declare a variable without explicitly initializing it?

Yes, Javascript automatically initializes it with the value `undefined`.

2. How can my `main.js` access methods from other scripts even though I didn't import them?

All scripts loaded on a page (`emulator.html`) share the same global scope. This is also referred to as `window`, the global object in a browser environment.

Although, if `main.js` is loaded before `gba.js`, then `window.GameBoyAdvance` doesn't exist in the global scope yet.

3. What is `window.onload`? Is it a function pointer?

In a sense, we're storing a reference to a function in a variable. But Javascript doesn't have pointers in the C sense, so they're officially referred to as **first-class functions**.

