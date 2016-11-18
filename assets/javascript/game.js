//Creating a function that doesn't allow jQuert to run until the HTML has loaded
$(document).ready(function(){
	
	//Setting an object containing our characters and all their base stats
	var characters = {
		reaper: { name: "Reaper", health: 100, counter: 25, image: "assets/images/reaper.png", attack: 10, constant: 10},
		winston: { name: "Winston", health: 180, counter: 5, image: "assets/images/winston.png", attack: 5, constant: 5},
		hanzo: { name: "Hanzo", health: 150, counter: 20, image: "assets/images/hanzo.png", attack: 7, constant: 7 },
		soldier: { name: "Solider 76", health: 120, counter: 10, image: "assets/images/soldier.png", attack: 8, constant: 8 }
	};

	//Function that applies all the characters stats to their respective divs
	$(".char").each(function(index, div){
		var jDiv  = $(div);
 		var value = $(div).attr('value');
 		jDiv.html("<p>" + characters[value].name + "</p>" +
 			"<img src=" + characters[value].image + " alt=" + characters[value].name + " />" +
 			"<p>Health: " + characters[value].health + "</p>" + 
 			"<p>Attack: " + characters[value].attack + "</p>" +
 			"<p>Counter: " + characters[value].counter + "</p>");
	})

	//Function that determines the players "Hero"
	$(".char").click(function() {
		if( $("#enemies").is(":empty")){
			var hero = $(this).addClass("hero");
			$(this).removeClass("initial");
			
			//This function removes all the characters that weren't selected and adds the "enemy" class
			if ($(".char").not("initial")) {
				var enemies = $(".initial").addClass("enemy");
				$("#enemies").hide().append(enemies).fadeIn(1000);
				
				//This allows the user to choose who to attack
				$(".enemy").click(function(){
					if ( $("#defender").is(":empty") ){
						$(this).removeClass("enemy");
						$(this).removeClass("initial")
						$(this).addClass("defender");
						var defender = $(this).addClass("defender");
						$("#defender").hide().append(defender).fadeIn(1000);
					}
				});
			}
		}
	});

	//This function allows the user to attack the requested defender.
	$("button").click(function(){
			
			//This checks to see if a defender has been selected. If no defender is present it will tell the user.
			if ($("#defender").is(":empty") ){
			alert("Please choose a defender");
			}
			
			//If a defender is present then this code will run
			else{
				var value = $(".hero").attr('value');
				var attackPower = characters[value].attack;
				
				//This will show how much damage the hero is dealing
				$(".yourAttack").html("<p>You attack for " + attackPower + " damage!</p>");
				var constant = characters[value].constant;
				
				//This section records the damage given and taken by the defender
				$(".defender").each(function(index, div){
					var value = $(div).attr('value');
					var counter = characters[value].counter;
					
					//Will display how much damage the defender has given and update the characters stats accordingly
					$(".enemyAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].counter + " damage!</p>");
					characters[value].health -= attackPower;
					console.log(characters[value].health)
					var jDiv  = $(div);
 					jDiv.html("<p>" + characters[value].name + "</p>" +
 					"<img src=" + characters[value].image + " alt=" + characters[value].name + " />" +
 					"<p>Health: " + characters[value].health + "</p>" + 
 					"<p>Attack: " + characters[value].attack + "</p>" +
 					"<p>Counter: " + characters[value].counter + "</p>");
 					
 					//This will run once the defender has been defeated and prompts the user to choose someone else to attack.
 					if (characters[value].health <= 0){
 						$(".hero").effect("shake");
 						$(".enemyAttack").empty();
 						$(".yourAttack").html("<p>Good job! Select the next defender!");
						$(".defender").effect("explode", 1000).remove(); 						
						
						//If no characters are left to attack this code will run and let the user know they won.
						if ($(".initial").length <= 0){
							$(".hero").effect("shake", 5000);
							$(".defender").effect("explode", 5000);
							setTimeout(function(){$(".defender").remove();}, 5000);
							$(".enemeyAttack").remove();
							$(".yourAttack").html("Congrats you win!");
							setTimeout(function(){alert("You Won!")}, 5000);
							setTimeout(function(){location.reload()}, 5000);
						}
 					}

 					//This function updates the heroes health based on the attacker
					$(".hero").each(function(index, div) {
						var value = $(div).attr('value');
						characters[value].health -= counter;
						var jDiv  = $(div);
	 					jDiv.html("<p>" + characters[value].name + "</p>" +
	 					"<img src=" + characters[value].image + " alt=" + characters[value].name + " />" +
	 					"<p>Health: " + characters[value].health + "</p>" + 
	 					"<p>Attack: " + characters[value].attack + "</p>" +
	 					"<p>Counter: " + characters[value].counter + "</p>");
 						
	 					//If the players health falls below 1 the game will end.
 						if (characters[value].health <= 0){
 							$(".hero").effect("explode", 5000);
 							setTimeout(function(){alert("Game Over :(")}, 5000);
 							setTimeout(function(){location.reload()}, 5000);
 						}
					})
				});

				//The increases the players attack value each time the button is pressed.
				characters[value].attack += constant;
			}
	});
});