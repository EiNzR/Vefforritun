// 1.
var family = {
	parents:
	{
		fathers: [{"name":"Jakob"},{"name":"Nonni"}],
		mothers: [{"name":"Rakel"},{"name":"Sara"}]
	}
};
// Þarf að fara inn í family objectið -> svo inn í parents objectið svo er fathers property-ið array.
console.log(family.parents.fathers[1].name);


// 2.
function Jakob (nafn, species) {
	this.nafn = nafn;
	this.species = species;
};
Jakob.prototype.printName = function () {
	console.log(this.name);
}

function Hundur (name) {
	this.name = name;
	this.species = "Hundur";
};

Hundur.prototype = new Jakob();
var Snati = new Hundur("Snati")

Snati.printName();
