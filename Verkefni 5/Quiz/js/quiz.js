(function () {
	//object smið.
	function Question(question, options, answer) {
		this.question = question;
		this.options = options;
		this.answer = answer;
	}


	// Function sem shufflar array
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // Á meðan það eru elements til að shuffla
	  while (0 !== currentIndex) {

	    // Velur element sem er eftir
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // Swappar við current element
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array; // Returnar shuffluðu array-i
	}


	// Function sem display-ar spurningum og svarmöguleikum
	function Display_Question(array, index) {
		var optionNumber = array[index].options.length; // Checkar hversu margir svarmöguleikar eru fyrir spurninguna

		var question = document.createElement("h2"); // Býr til nýtt element
		var node = document.createTextNode(array[index].question); // Býr til text node sem inniheldur spurninguna
		question.appendChild(node); // setur text node inn í elementið



		var element = document.getElementById("div1"); // Nær í element úr html skrá
		element.appendChild(question); // setur spurninguna inn í div1 í html skránni

		// Display-ar svarmöguleikum
		for(var i = 0; i < optionNumber; i++) {
			var buttons = document.createElement("button"); // Býr til takka element
			node = document.createTextNode(array[index].options[i]); // Nær í texta fyrir svarmöguleika
			buttons.appendChild(node); // Setur textann inn í takka

			buttons.setAttribute("id", "b" + i);  // Set Id on each button
			buttons.setAttribute("class", "buttons");  // Set a class on all buttons

			element.appendChild(buttons); // setur takkann inn í html skránna
		}
	}


	function init() {
		var QuestionNumber = 0; // variable sem heldur um á hvaða spurningu maður er á
		var shuffled = shuffle(Questions); // Setur spurninga arrayið inn í shuffle fallið
		Display_Question(shuffled, QuestionNumber); // Kallar á display question fallið
	}



	// Question array sem heldur um objects
	var Questions = [
		new Question("Is Yellow White ?", ["True","False"], 1),
		new Question("How long is the great wall of China ?", ["4000 miles", "10 cm", "0.1 mm", "10 Km"], 0),
		new Question("What is the largest number of five digits ?", ["10000", "19999", "99990", "99999"], 3),
		new Question("Who is the president of the USA ?", ["Donald Trump", "George Washington", "Barack Obama", "Hillary Clinton"], 2),
		new Question("Is Pikachu a Pokemon ?", ["Yes", "No", "He is a Digimon"], 0)
	];

	init();
}) ();
