(function () {

	//object smiður
	function Question(question, options, answer) {
		this.question = question;
		this.options = options;
		this.answer = answer;
	}

	// Question array sem heldur um objects
	var Questions = [
		new Question("Is Yellow White ?", ["True","False"], 1),
		new Question("How long is the great wall of China ?", ["4000 miles", "10 cm", "0.1 mm", "10 Km"], 0),
		new Question("What is the largest number of five digits ?", ["10000", "19999", "99990", "99999"], 3),
		new Question("Who is the president of the USA ?", ["Donald Trump", "George Washington", "Barack Obama", "Hillary Clinton"], 2),
		new Question("Is Pikachu a Pokemon ?", ["Yes", "No", "He is a Digimon"], 0)
	];


	// Shuffle function
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

	// Function sem býr til element og text node
	function Element_TextNode(element, text) {
			var c_element = document.createElement(element); // Býr til nýtt element
			var c_node = document.createTextNode(text); // Býr til text node sem inniheldur texta
			c_element.appendChild(c_node); // setur text node inn í elementið

			return c_element; // Skilar elementinu.
	}

	// Function sem heldur um á hvaða spurningu notandinn er á og birtir því á skjáinn.
	function Question_number(qnr, array) {
		current = (qnr + 1); // current question
		total = array.length; // Total ammount of questions.

		var ele = Element_TextNode("h4", current + ' / ' + total); // Til að birta á skjáinn        current question / total questions

		get_ele = document.getElementById("div1"); // Hvaða element á að birta á
		get_ele.appendChild(ele); // Birtir á skjáinn
	}

	// Function sem heldur um rétt og röng svör hjá notanda
	function Right_Wrong(arr) {
		// Get elements
		R_element = document.getElementById('correct'); 
		W_element = document.getElementById('wrong');

		// Þegar ég ýti á takka pusha ég 0 eða 1 í array
		// Hér loopa ég svo í gegnum arrayið
		// 1 = rétt, 0 = rangt
		r = w = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == 1) {
				r++;
			}
			if (arr[i] == 0) {
				w++;
			}
		}

		R_element.innerHTML = "";
		W_element.innerHTML = "";

		R = Element_TextNode('h3', 'Correct:');
		R_element.appendChild(R);
		R = Element_TextNode('h3', r);
		R_element.appendChild(R);

		W = Element_TextNode('h3', 'Wrong:');
		W_element.appendChild(W);
		W = Element_TextNode('h3', w);
		W_element.appendChild(W);
	}


	// Function sem display-ar spurningum og svarmöguleikum
	function Display_Question(array, index, u_corr_wr) {
		corr_wr = u_corr_wr; // Heldur um rétt og röng svör hjá notanda
		var Options_Ammount = array[index].options.length; // Checkar hversu margir svarmöguleikar eru fyrir spurninguna

		// Birtir sputningu
		var question = Element_TextNode('h2', array[index].question);
		question.setAttribute('id', 'question');


		var element = document.getElementById("div1"); // Nær í element úr html skrá
		element.appendChild(question); // setur spurninguna inn í div1 í html skránni

		// Display-ar svarmöguleikum
		for(let i = 0; i < Options_Ammount; i++) {
			var buttons = Element_TextNode('button', array[index].options[i]);

			buttons.setAttribute("id", "b" + i);  // Set Id on each button
			buttons.setAttribute('class', 'buttons'); // Setur clasa á hvern takka

			//(function (i) {
				// Setur hlustanda á hvern takka
				buttons.addEventListener('click', function () {
					buttonClicked(i, array[index].answer, index, array, corr_wr);
				});
			//}(i))

			element.appendChild(buttons); // setur takkann inn í html skránna
		}
		Question_number(index, array);
	}


// ------- BUTTONS -------------------------------
	// Function sem keyrir þegar user smellir á takka
	function buttonClicked(i, ans, index, array, corr_wr) {
		c_w = corr_wr;
		element = document.getElementById('div1');

		button_clicked = document.getElementById('b' + i); // Hvaða takki var ýtt á
		
		if (i == ans) { // ef svarið var rétt
			button_answer(button_clicked, 'correct'); // Takkinn verður grænn til að sýna að svar var rétt

			c_w.push(1); // Push 1 inn í array sem heldur um rétt og röng svör

			if (array[index + 1]) { // Ef það er önnur spurning
				// Fer í næstu spurning eftir nokkrar sek.
				setTimeout(function() {
						element.innerHTML = ""; // Tæmir div tagið
						Display_Question(array, index + 1, c_w); // Næsta spurning   index + 1
				}, 1000);
			} else { // Ef það er ekki önnur spurning
				setTimeout(function() { // keyrir eftir nokkrar sek
					element.innerHTML = "";
					Quiz_finish(array.length, c_w); // Birtir upplýsingar
				}, 1000);
			}
		} 
		else { // Ef svar er ekki rétt
			button_answer(button_clicked,'wrong'); // Takkinn verður rauður til að sýna notanda að svar var rangt

			c_w.push(0); // Push 0 inn í rétt/rangt arrayið

			setTimeout(function() { // Keyrir eftir nokkrar sek
				buttons(button_clicked, array[index].options); // Allir takkar verða venjulegir aftur
			}, 1000);
		}
		Right_Wrong(c_w); // Sýnir rétt og röng svör hjá notanda
	}


	// Setur clasa á takka, fer eftir svar er rétt eða rangt
	function button_answer(button, ans) {
		if (ans == 'wrong') { // Ef svar er rangt
				button.setAttribute('class', 'wrong'); // Setur wrong class á takkann (litar takkan rauðan)
		} else if (ans == 'correct') { // Ef svar er rétt
				button.setAttribute('class', 'correct'); // Setur correct class á takkann (litar takkann grænan)
		}
	}

	// 
	function buttons(button, options) {
		for (var i = 0; i < options.length; i++) { // Keyrir í gegnum alla takkana
				button = document.getElementById('b' + i);
				button.setAttribute('class', 'buttons'); // Setur class á alla takkana
		}
	}

	// Quiz finish function
	function Quiz_finish(length, c_w) {
		element = document.getElementById('div1');

		// Fer í gegnum arrayið sem heldur um rétt og röng svör
		w = 0;

		for (var i = 0; i < c_w.length; i++) {
			if (c_w[i] == 0) {
				w++;
			}
		}

		// Birtir upplýsingar
		newh2 = Element_TextNode('h2', 'Quiz Score:');
		element.appendChild(newh2);

		newh3 = Element_TextNode('h3', "You had " + w + " wrong answer/s");
		element.appendChild(newh3);


		newh3 = Element_TextNode('h3', 'Thanks for playing!');
		element.appendChild(newh3);
	}

	// Núllstillir allt
	function init() {
		var index = 0 // variable sem heldur um á hvaða spurningu maður er á
		var u_corr_wr = [];
		Right_Wrong(u_corr_wr);
		var shuffled = shuffle(Questions); // Setur spurninga arrayið inn í shuffle fallið
		Display_Question(shuffled, index, u_corr_wr); // Kallar á display question fallið
	}

	init();

}) ();
