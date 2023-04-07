# Character Data Structure

### CHARACTER:

```js
{
  owner: "xxx",   // uid of owner
  data: {...},    // key-value pairs of data values
  layout: {       // object tree of declarative layout
    order: [...], // display order of head nodes
    ...           // node objects
  }
}
```

### NODE:

```js
name: {         // name of node matching order strings
  order: [...], // display order of nested nodes
  type: "xxx",  // component name, "none" reserved for no component
  props: {...}, // component props
  slot: {...},  // slot config
  nest: {...}   // nodes with names matching order strings
}
```

```js
name: {         // name of node matching order strings
  order: [...], // display order of nested nodes
  type: "xxx" or null,  // component name
  props: {...} or null, // component props
  slot: {...} or null,  // slot config
  nest: {...} or null  // nodes with names matching order strings
}
```

### STANDARD NODE CONFIG (required fields):

```js
props: {
  data: "one two",               // space separated keys
  label: "amogus",               // string constant
  method: "test.func test.dunc", // space separated extension.method keys
  style: "green",                // additional classes
}

slot: {
  on: true,       // boolean if component(s) should be rendered in div-slot
  style: "green", // classes for div wrapper
}
```

```js
props: {
  data: "one two",               // space separated keys
  label: "amogus",               // string constant
  method: "test.func test.dunc" or null, // space separated extension.method keys
  style: "green",                // additional classes
}

slot: {
  style: "green", // classes for div wrapper
}
```

### COMPRESSED LAYOUT: // temp

```js
order -> o: []
type  -> t: ""
props -> p: {d,l,m,s}
slot  -> s: {o,s}
nest  -> n: {}
```
