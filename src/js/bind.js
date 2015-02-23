// import diff from 'virtual-dom/diff'
// import patch from 'virtual-dom/patch'
// import createElement from 'virtual-dom/create-element'
// import virtualize from 'vdom-virtualize'

// function render(count)  {
//   var html = '<div id="test">Count is <span>' + count + '</span></div>';
//   return virtualize.fromHTML(html);
// }

// // 2: Initialise the document
// var count = 0;      // We need some app data. Here we just store a count.

// var tree = render(count);               // We need an initial tree
// var rootNode = createElement(tree);     // Create an initial root DOM node ...
// document.body.appendChild(rootNode);    // ... and it should be in the document

// // 3: Wire up the update logic
// setInterval(function update(){
//   count++;
//   var newTree = render(count);
//   var patches = diff(tree, newTree);
//   patch(rootNode, patches);
// }, 500);

function bind(obj, property, element, template) {
  Object.defineProperty(obj, property, {
    set: newValue => {
      // render the template with the new value
      // patch the dom
      element.innerHTML = template.render(obj)
      domElem.value = newValue
    },
    configurable: true,
    enumerable: true
  });
}

export default bind
