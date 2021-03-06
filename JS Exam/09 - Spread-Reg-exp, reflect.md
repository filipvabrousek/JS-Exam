# Spread

* allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) or multiple variables (for destructuring assignment) are expected
* ```...``` way to split items in an array into separate function parameters
* aruments object is not reall array, but rest parameters are Array instances
(can access) methods



## 1
```js
var arr = [1, 2, 3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4); 

// arr2 becomes [1, 2, 3, 4]
// arr remains unaffected
```



## 2

```js
let a = [1, 2, 3];

function F(a, b, c){
    console.log( a + b + c);
}

F( ...a);
```

 
## 3
```js
function mix(... words){
    return words.join(" ");
}

let result = mix("I", "love", "JS!");
console.log(result); // I love JS
```

## 4
```js
let arr = [9,8,7];

function square(... e){
   e.forEach(n => n * n);
    return e;
}


let res = square(2, 3, ...arr); // [2, 3, 9, 8, 7]

```


## 5
```js
function pick(object, ...keys){
    let res = Object.create(null);
    keys.forEach((el, i) => res[keys[i]] = object[keys[i]]);
    return res;
}

let book = {
    author: "Petr Vabrousek"
};

let data = pick(book, "author");
console.log(data.author); // Petr Vabrousek

```

## 6

```js
function F(a, b){
    let args = Array.prototype.slice.call(args, F.length);
}
    
function N(a, b, ...args){
    
};
    
    
function M(m, ...args){
    return args.map(el => m * el);
}
    
M(2, 3, 8); // [6, 16]
```


## 7

```js
let n = [[1], [2], [3]];
let w = [...n];
w.shift().shift(); // 1, n is [[2], [3]]
```


# REFLECT
* built-in object that provides methods for interceptable JS operations
* not a function object, so it's not constructible

```js
Reflect.has({x: 0}, 'x'); //true
   
let obj = { x: 1, y: 2 };
Reflect.get(obj, 'x'); // 1
Reflect.deleteProperty(obj, "x");    
  
Reflect.apply(''.charAt, 'ponies', [3]); // "i"  

let d = Reflect.construct(Date, [1776, 6, 4]);
d instanceof Date; // true, Date methods work
```    




# Regular expressions
* patterns used to match character combinations in strings
* test, exec used also with string methods: search, split, replace, match

```
RegExp(pattern[, flags])
```
**Flags:** g, i, m, u, y
* RegExp.prototype.flags
* can have any combination

* ```/[0-9a-f]*/``` matches hex color
* ```/./``` matches any character
* ```/[0-9a-zA-Z]/``` matches alphanumeric strings
* ```/a{2}/``` doesn't match the "a" in "candy", but it matches all of the "a"'s in "caandy"

```js
// Tes, exec, search
let re = /^\d{9}$/;
re.test("604193716"); // true
re.exec("604193716"); // ["604193716", index: 0, input: "604193716"]
"604193716".search(re); // 0

// Split
let names = "Filip; Terka ;Marek";
let p = /\s*;\s*/
let list = names.split(p); // ["Filip", "T...]
```

```js
// Replace, Match
let str = "I am Terka";
let re = /terka/i;
str.replace(re, "Filip"); // Filip
str.match(re); // ["Terka", index: 5, input: "I am Terka"]

// 30.6.2019 ???
```

## Sort
```js
// Sort array (by name, not article)
const bands = ["The Coders", "A Abords", "The Brovers"];
const strip = name => name.replace(/^(a |the |an)/i, "").trim(""); // remove "a" "the" "an"
const sorted = bands.sort((a,b) => strip(a) > strip(b) ? 1 : -1); // sorted array
```


