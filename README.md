## Building the repo

```shell
npm run build
```

## Building only types

```shell
npm run build:types
```

## Example

Create an html element in which the vizualization will live.
```html
<!DOCTYPE html>
<html>
    <head>
        <title>vizujs</title>
    </head>
    <body>
        <div id="container"></div>
    </body>
</html>
```

Write some javascript code and use the Vizu.mount api with a data structure (Array, Object, Map, Set) and an html element as arguments.
```javascript
import * as Vizu from '../../../lib/dist/vizu.cjs';

let container = document.getElementById("container");

let arr = Vizu.mount([1, 2, 3, 4, 5], container);

arr.forEach((element, index) => {
    if (element % 2) {
        arr[index]++;
    }
});
```

![alt text](https://github.com/metchel/vizujs/raw/master/demo.gif "Example")

## Data Structures

For now things are working smoothly for arrays and objects, and not smoothly for Maps and Sets (i.e., there are limitations of using the Proxy API with Sets and Maps).
