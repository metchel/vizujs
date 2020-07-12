## Building the repo

```shell
npm run build
```

## Building only types

```shell
npm run build:types
```

## Example
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
