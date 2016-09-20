// Pizza Constructor
function Pizza (name, size, toppings, price) {
	this.name = name;
	this.size = size;
	this.toppings = toppings;
	this.price = price;
}

var pizzaArray = new Array();

// New Pizza Objects
pizzaArray[0] = new Pizza("Big Margherita", "L", "Cheese, Oregano", 2195);
pizzaArray[1] = new Pizza("Medium Meat Tornado", "M", "Cheese, Chicken, Beef, Bacon", 4500);
pizzaArray[2] = new Pizza("Medium Hot", "M", "Cheese, Pepperoni, Jalapeno, Nachos", 3000);
pizzaArray[3] = new Pizza("Small Pepperoni", "S", "Cheese, Pepperoni, Black Pepper", 2395);




for (var x in pizzaArray) {
		document.getElementById("Pizzas").innerHTML += "<br>" + pizzaArray[x].name + "<br>";
		document.getElementById("Pizzas").innerHTML += pizzaArray[x].size + "<br>";
		document.getElementById("Pizzas").innerHTML += pizzaArray[x].toppings + "<br>";
		document.getElementById("Pizzas").innerHTML += pizzaArray[x].price + "<br>";
}
