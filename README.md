# AdvancedHTMLXBlock
Advanced HTML XBlock for OpenEdx(https://github.com/edx) [Beta]

### Features :
- Full CSS support
- Live Preview HTML
- Code Indentation
- Autocomplete Tags
- Autocomplete Brackets

### Introduction :
OpenEdx's current HTML component does not allow you add internal and/or external CSS(via \<link\>), also the raw HTML editor does nt save your indentation and shows a dirty minified coe.
Even if you add <style> tag in OpenEdx html component and try to theme basic elements, the CSS will spill all over the page as shown [here](https://imgur.com/a/v1imOMd)

### So why does this happen ?
The HTML component uses very old versions of editors TinyMCE and CodeMirror which did not support code indentation by default. Whatever content received from editors is put directly into the course without checking any tags and that is why styles spill all over the page

### How does AdvancedHTMLXblock work ?
AdvancedHTMLXBlock essentially extends the raw HTML component of OpenEdx. This XBlock uses the latest version of CodeMirror(5.38 as of June 2018).
Editor is configured to enable code folding/code indentation etc. All the html content received from the editor is then put into an iframe.
The height of the iframe is chanegd on changing html content and iframe is styled so that it looks virtually absent.
