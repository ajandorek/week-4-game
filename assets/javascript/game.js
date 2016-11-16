$(document).ready(function(){
	var attackPower = 8
	var characters = {
		reaper: { name: "Reaper", health: 120, counter: 25},
		winston: { name: "Winston", health: 180, counter: 15},
		hanzo: { name: "Hanzo", health: 150, counter: 20 },
		soldier: { name: "Solider 76", health: 100, counter: 30 }
	};

	$(".char").each(function(index, div){
		var jDiv  = $(div);
 		var value = $(div).attr('value');
 		jDiv.html("<h3>" + characters[value].name + "</h3>" +
 			"<p>Health: " + characters[value].health + "</p>" + 
 			"<p>Attack: " + characters[value].counter + "</p>");
	})

	$(".char").click(function() {
		if( $("#enemies").is(":empty")){
			var hero = $(this).addClass("hero");
			$(this).removeClass("initial");
			if ($(".char").not("initial")) {
				var enemies = $(".initial").addClass("enemy");
				$("#enemies").append(enemies);
				$(".enemy").click(function(){
					if ( $("#defender").is(":empty") ){
						$(this).removeClass("enemy");
						$(this).removeClass("initial")
						$(this).addClass("defender");
						var defender = $(this).addClass("defender");
						$("#defender").append(defender);
					}
				});
			}
		}
	});
	$("button").click(function(){
			if ($("#defender").is(":empty") ){
			alert("Please choose a defender");
			}
			else{
				$(".yourAttack").html("<p>You attack for " + attackPower + " damage!</p>");
				$(".defender").each(function(index, div){
					var value = $(div).attr('value');
					var counter = characters[value].counter;
					$(".enemyAttack").html("<p>" + characters[value].name + " attacks you for " + characters[value].counter + " damage!</p>");
					characters[value].health -= attackPower;
					console.log(characters[value].health)
					var jDiv  = $(div);
 					jDiv.html("<h3>" + characters[value].name + "</h3>" +
 					"<p>Health: " + characters[value].health + "</p>" + 
 					"<p>Attack: " + characters[value].counter + "</p>");
 					if (characters[value].health <= 0){
 						$(".defender").remove();
 						$(".enemyAttack").empty();
 						$(".yourAttack").html("<p>Good job! Select someone else to attack!");
 					}
					$(".hero").each(function(index, div) {
						var value = $(div).attr('value');
						characters[value].health -= counter;
						var jDiv  = $(div);
	 					jDiv.html("<h3>" + characters[value].name + "</h3>" +
	 					"<p>Health: " + characters[value].health + "</p>" + 
	 					"<p>Attack: " + characters[value].counter + "</p>");
 						/*if (characters[value].health <= 0){
 							alert("Game Over :(");
 							location.reload();*/
 						//}
					})
				});
			}
		attackPower += 8
	});
	if ($(".initial").length <= 0){
		$(".enemeyAttack").empty();
		$(".yourAttack").html("Congrats you win!");
	}
});