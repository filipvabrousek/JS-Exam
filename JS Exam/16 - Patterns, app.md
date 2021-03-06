# DESIGN PATTERNS

* module
* prototype
* singleton - bad
* OLOO
* observer


## Module pattern

```js
const B = ((() => {
    
    let x = 23;
    const add = (a) => x + a;
    
    return{
        public(b) {
            return add(b);
        }
    }
}))();



const C = (((BC) => {
   var z = B.public(4);

    return {
       do(){
           console.log(z);
       } 
    }
}))(B); //This name can't change!!! (the above can be whatever you want)


C.do();
    
    

```
## Prototype (regular class)
* just regular class



## OLOO
* objects linked to other objects
* designed by Kyle Simpson

```js

let C = {
   init(name){
       this.name = name;
   },
    say(){
        console.log(`I have ${this.name} car`);
    }
};

let fc = Object.create(C);
fc.init("Audi");
fc.say(); // I have ...
    
    
```

## Twitter word counter - observer
```js
class T{
    constructor(){
        this.observers = [];
    }
    
    subscribe(fn){
        this.observers.push(fn);
    }
    
    unsubscribe(fn){
        this.observers = this.observers.filter(sub => sub !== fn);
    }
    
    broadcast(data){
        this.observers.forEach(sub => sub(data));
    }
}
    
    
const count = (text) => text ? text.trim().split(/\s+/).length : 0;

    
const ob = new T();
ob.subscribe(text => {
    console.clear(); 
    console.log(` ${140 - count(text)} Words remaining `);
});
    

const post = document.querySelector("textarea");
post.addEventListener('keyup', () => ob.broadcast(post.value));
```



# Canvas
```js
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
```
* ctx methods: (canvasrenderingContext2d)

Name | Name
------------ | -------------
strokeStyle()| lineWidth
beginPath()| lineTo(x,y)
moveTo(x,y) | stroke()
fillStyle(color) | fillStyle(x,y, w, h)
lineJoin() | lineCap()
lineWidth() | arc()
bezierCurveTo()| shadowOffsetX/Y


* ctx.globalCompositeOperation = "soft-light"; // copy, xor, multiply, screen, overlay, soft/hard-light


## Animation

```js
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let radius = 1, hue = 0;
ctx.fillRect(0,0,canvas.width, canvas.height);
    

function draw(){
    ctx.fillStyle = `hsl(${hue++}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0.2 * Math.PI, false);
    ctx.fill();
    radius += 0.4;
    if (radius < 200){
        requestAnimationFrame(draw);
    }
}

    draw();
// <canvas width= "400" height = "400"></canvas>
    
```


# DOM Manipulation
```js


(() => {
  /*---------------------------DOM ELEMENT CLASS---------------------------*/
  class DE {
    constructor(selector) {
      this.selector = selector || null;
      this.element = null;
    }

    init() {
      this.element = document.querySelector(this.selector);
      return this;
    }

    prepend(text) {
      this.element.textContent = text + this.element.textContent;
      return this;
    }

    append(text) {
      this.element.textContent = this.element.textContent + text;
      return this;
    }

    on(event, cb) {
      this.element.addEventListener(event, cb);
      return this;
    }
  }

  /*------------------------------SELECTOR--------------------------------*/
  S = (selector) => {
    const el = new DE(selector);
    el.init();
    return el;
  };

  /*------------------------MAKE FUNCTION ACCESSIBLE------------------------*/
  return {
    S
  };
    
    
})();

S("p").prepend("Hi, ").append("!");
// <p>Filip</p>

```
# App - marks

```js

const dataCtrl = (() => {


	class Mark {
		constructor(value, weight) {
			this.value = value;
			this.weight = weight;
		}
	}



	let storage = {
		data: {
			marks: []
		}
		, totals: {
			total: 0
			, avg: 0
		}
	}


	return {
		addMark(val, weight) {
			let newMark = new Mark(val, weight);
			storage.data["marks"].push(newMark);
		},

		calc() {
			let sum = 0;
			let avg = 0;
			let weightsSum = 0;

			/*
			sum all marks mutliplied by their weight
			divide them by the sum of weights
			*/

			storage.data["marks"].forEach(cur => sum += cur.value * cur.weight);
			storage.data["marks"].forEach(cur => weightsSum += cur.weight);
			avg = sum / weightsSum;

			storage.totals["total"] = sum;
			storage.totals["avg"] = avg;
			return storage.totals["total"];
		},


		getData() {
			this.calc();
			let res = storage.totals["avg"].toPrecision(3);
			console.log(res);
			return res;
		}
	}



})();





/*----------------------------------------*/
const UICtrl = ((dataCtrl) => {

	const DOMStrings = {
		marks: "#marks"
		, avg: "#avg"
		, val: "#value"
		, weight: "#weight"
		, btn: "#btn"
	};

	return {

		getInput() {
			let selected = document.querySelector(DOMStrings.val);
			let index = selected[selected.selectedIndex].value; // mark value (1-5)

			return {
				value: parseFloat(index)
				, weight: parseFloat(document.querySelector(DOMStrings.weight).value) // mark weight (1-10)
			}
		},

		add2DOM() {
			let input = UICtrl.getInput();
			dataCtrl.addMark(input.value, input.weight);
			let html = "<h2 class='mark'>" + input.value + "(" + input.weight + ")" + "</h2>";
			document.querySelector(DOMStrings.marks).insertAdjacentHTML("beforeBegin", html);

			let avg = dataCtrl.getData();
			document.querySelector(DOMStrings.avg).innerHTML = avg;
		},

		addELs() {
			document.querySelector(DOMStrings.btn).addEventListener("click", this.add2DOM);
		},

		init() {
			UICtrl.addELs();
		}
	}

})(dataCtrl);

UICtrl.init();

```

```html
<section id="input">
    <select id="value">
<optgroup>
    
    <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
    </optgroup>


</select>


    <input type="number" id="weight" placeholder="Enter weight" value="10" min="1" max="10" />



    <button id="btn">+</button>

</section>




<h2 id="avg">Average will appear here (currently works just with same weights)</h2>

<section id="marks">

    <!-----This will be managed by the app------>
</section>

<style>
    * {
        margin: 0;
        padding: 0;
        font-family: Arial;
    }

    input {
        padding: 1em;
    }

    button {
        background: orange;
        color: #fff;
        border: none;
        padding: 1.3em;
        border-radius: 50%;
        margin: 1em;
    }

    #marks {
        padding: 1em;

    }

    .mark {
        color: blue;
        padding: 0.6em;
    }

    select {
        padding: 2em;
    }

    h2 {
        padding: 1em;
    }


    #input {
        background: gray;
        display: flex;
        justify-content: center;

    }

    #input>* {
        margin: 1em;
    }
</style>

```















