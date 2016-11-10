(function ($) { 
$.fn.quiz = function() {
	//object smiður
	function Question(question, options, answer) {
		this.question = question;
		this.options = options;
		this.answer = answer;
	}

	// Array heldur um spurningar, nota object smið til að búa til nýjar spurningar
	var Questions = [
		new Question("Is Yellow White ?", ["True","False"], 1),
		new Question("How long is the great wall of China ?", ["4000 miles", "10 cm", "0.1 mm", "10 Km"], 0),
		new Question("What is the largest number of five digits ?", ["10000", "19999", "99990", "99999"], 3),
		new Question("Who is the president of the USA ?", ["Donald Trump", "George Washington", "Barack Obama", "Hillary Clinton"], 2),
		new Question("Is Pikachu a Pokemon ?", ["Yes", "No", "He is a Digimon"], 0)
	];


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

	// ----------------------- PROGRESS BAR -----------------------------------
	function Progress_Bar(qnr, array) {
		$(document).ready(function() {
			current = (qnr); // current question
			total = array.length; // Total ammount of questions.
			val = (current / total) * 100; // Fær prósentu
				this.$bar = $('#progress') // Selector
					.progress({ // Setur value á progress bar
						percent: val
				});
				this.$lab = $('#progress_label') // Progress bar labelinn til að sýna notanda hversu mörg % er komið á quiz-inu
					.empty()
					.append(val + "% Complete")
		});
	}
// --------------------------------------------------------------------

	// Function til að halda um rétt/röng svör
	function Right_Wrong(arr) {
		$(document).ready(function() {
			$('#correct').empty()
			$('#wrong').empty()
			r = w = 0;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == 1) {
					r++;
				}
				if (arr[i] == 0) {
					w++;
				}
			}
			this.$r = $('#correct') // JQuery selector
				.append('Correct: ' + r)
			this.$w = $('#wrong') // JQuery selector
				.append('Wrong: ' + w)
		});
	}


	// Function display spurningum og svarmöguleikum
	function Display_Question(array, index, u_corr_wr) {
		corr_wr = u_corr_wr; // Heldur um rétt og röng svör hjá notanda
		var Options_Ammount = array[index].options.length; // Hversu margir svarmöguleikar eru í spurningu

		// JQUERY DISPLAY QUESTION
		$(document).ready(function() {
			this.$question = $('#question').empty() // Selector, byrjar á að tæma
				.append(array[index].question) // Setur inn spurningu
			$('#options').empty() // Selector, byrjar á að tæma
			for (let i = 0; i < Options_Ammount; i++) {
				this.$o = $("<button></button") // Býr til takka fyrir hvern svarmöguleika
					.append(array[index].options[i]) // Textinn fyrir takkann
					.attr('id', 'b' + i) // Setur id á takkann
					.attr('class', 'ui large button') // Setur class
				$('#options').append(this.$o) // Setur takkann inn í html

				this.$o.on('click', function() { // JQuery Listener
					buttonClicked(i, array[index].answer, index, array, corr_wr); // Ýtt var á takkann
				});
			}
		});

		/// -------------- PROGRESS BAR -------
		Progress_Bar(index, array);
	}


// ------- BUTTONS -------------------------------
	// Function ýtt var á takka/svarmöguleika
	function buttonClicked(i, ans, index, array, corr_wr) {
		c_w = corr_wr; // heldur um rétt/röng svör
		$(document).ready(function() {
			this.$b = $('#b' + i) // Selector, selectar id á takkanum sem var ýtt á
			if (i == ans) { // Ef rétt svar
				button_answer(this.$b, 'correct'); // Setur grænan lit á takkann

				c_w.push(1); // heldur um rétt svar

				if (array[index + 1]) { // Ef það er önnur spurning efir
					setTimeout(function() { // Bíður í 500ms
						$('.fader').fadeOut(400, function() { // JQuery Fadeout
							$('.fader').empty()
						});
						$('.fader').fadeIn(400, function () { // JQuery Fadein
							Display_Question(array, index + 1, c_w); // Ný spurning
						});
					}, 500);
				} 
				else { // Ef engin spurning eftir
					setTimeout(function() { // Bíður í 500ms
						$('.fader').fadeOut(400, function() { // fadeout
							$('.fader').empty()
						});
						$('.fader').fadeIn(400, function() { // fadein
							Quiz_finish(array.length, c_w, index + 1, array); // Quiz end
						});
					}, 500);
				}
			}
			else { // Svar var vitlaust
				button_answer(this.$b, 'wrong'); // Gerir takkann sem var ýtt á rauðan

				c_w.push(0); // Heldur um röng svör

				setTimeout(function() { // Bíður í 1000ms == 1 sec
					buttons(array[index].options); // Reset button class
				}, 1000);
			}
			Right_Wrong(c_w); // Heldur um rétt/röng svör
		});
	}

	// Function litar takka eftir svari
	function button_answer(button, ans) {
		if (ans == 'wrong') { // Ef svar er rangt
				button.attr('class', 'ui large red button') // Litar takkann rauðan
		} else if (ans == 'correct') { // Ef svar er rétt
				button.attr('class', 'ui large green button') // Litar takkann grænan		
		}
	}

	// Function reset button class
	function buttons(options) {
		$(document).ready(function() {
			for (var i = 0; i < options.length; i++) { // Keyrir í gegnum alla takkana
				this.$b = $('#b' + i)
					.attr('class', 'ui large button')
			}
		});
	}

	// Function Quiz end
	function Quiz_finish(length, c_w, index, array) {
		$(document).ready(function() {
			// Fer í gegnum rétt/röng svör
			w = 0;

			for (var i = 0; i < c_w.length; i++) {
				if (c_w[i] == 0) {
					w++;
				}
			}
			$('#question').empty() // Selector, tæmir
				.append('Quiz Score:')
			$('#options').empty() // Selector, tæmir
				.append('<h3>You had ' + w + ' wrong answer/s</h3>')
				.append('<h3>Thanks for playing!</h3>')
		});
		Progress_Bar(index, array); // Progress bar
	}

	// Function set title
	function setTitle(ttl) {
		document.title = ttl;
	}

	// Function create HTML
	function create_html() {
		$(document).ready(function() {
			this.$body = $('body')
				.append('<div class="ui middle aligned center aligned grid">'
							+'<div class="six wide column">'
								+'<h2 id="question" class="fader"></h2>' // QUESTION
								+'<div class="ui large form">'
									+'<div id="options" class="ui stacked segment fader"></div>' // OPTIONS
									+'<div class="ui two column centered grid">' // RIGHT/WRONG
										+'<div id="correct" class="five wide green column"></div>'
										+'<div id="wrong" class="five wide red column"></div>'
									+'</div>'
								+'</div>'
								+'<br>'
								+'<div class="ui teal progress" id="progress">' // PROGRESS BAR
									+'<div class="bar"></div>'
									+'<div id="progress_label" class="label"></div>'
								+'</div>'
							+'</div>'
						+'</div>');
			$('#progress').progress({ // Set progress bar to 0%
				percent: 0
			});
			$('#progress_label').append("0% Complete")
		});
	}

	// Núllstillir allt
	function init() {
		create_html();

		var index = 0 // Hvaða spurning maður er á
		var u_corr_wr = []; // Heldur um rétt/röng svör
		Right_Wrong(u_corr_wr);
		var shuffled = shuffle(Questions); // Spurningar shuffled
		Display_Question(shuffled, index, u_corr_wr); // Kallar á Display_Question

		setTitle("Quiz - The easiest quiz of your life"); // Kallar á setTitle
	}

	init(); // initialize
};
}) (jQuery);

$(document).quiz();
