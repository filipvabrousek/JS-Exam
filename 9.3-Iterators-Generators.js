/*-----------------------ITERATORS------------1-----------*/
var arr = [4, 5, 6, 7, 8, 9];

arr[Symbol.iterator] = function*() {
    var idx = 1;
    do {
        yield this[idx];
    } while ((idx += 2) < this.length);
};

for (var v of arr) {
    console.log(v);
}
// 5 7 9 (just values from odd indexes)



/*-----------------------ITERATORS------------2-----------*/
var greeting = "hello world";
var ita = greeting[Symbol.iterator]();

ita.next(); // { value: "h", done: false }
ita.next(); // { value: "e", done: false }



/*-----------------------ITERATORS------------3-----------*/
var m = new Map();
m.set("foo", 42);
m.set({
    cool: true
}, "hello world");

var itb = m[Symbol.iterator]();
var itb = m.entries();

itb.next(); // { value: [ "foo", 42 ], done: false }
itb.next(); // { value: [ "foo", 42 ], done: false }
    

/*-----------------------ITERATORS------------4-----------*/
var a = [1, 2, 3, 4, 5];
var itd = a[Symbol.iterator]();

var [x, y] = itd; // take just the first two elements from `it`
var [z, ...w] = itd; // take the third, then the rest all at once

// is `it` fully exhausted? Yep.
itd.next(); // { value: undefined, done: true }

x; // 1
y; // 2
z; // 3
w; // [4,5]


/*-----------------------ITERATORS------------5-----------*/
/* Overwrite species to the parent Array constructor
For example, when using methods such as map() that return the default constructor,
you want these methods to return a parent Array object, instead of the MyArray object.
*/

class coolArray extends Array{
    static get[Symbol.species](){
        return Array;
    }
}

var x = new coolArray(1, 2, 3);
var mapped = x.map(x => x*x);
console.log(mapped);

console.log(mapped instanceof coolArray); // false
console.log(mapped instanceof Array);   // true









/*--------------------GENERATORS--------------1----------*/
const myGen = function*(){
const one = yield 1;
const two = yield 2;
const three = yield 3;
console.log(one, two, three);
};

const gen = myGen();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

/*--------------------GENERATORS--------------2----------*/    
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

function* bar() {
    var x = yield* foo();
    console.log("x:", x);
}

for (var v of bar()) {
    console.log(v);
}
// 1 2 3
// x: 4
