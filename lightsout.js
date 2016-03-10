var gameplan = document.getElementById("gameplan"),
    moves = document.getElementById("moves"),
    playNormal = document.getElementById("playNormal"),
    playRandom = document.getElementById("playRandom"),
    clicked = 0,
    lightBoxes = 0;

playNormal.addEventListener("click", function() {
  createGameplan(false);
});

playRandom.addEventListener("click", function() {
  createGameplan(true);
});


/*
* Creates the gameplan
* @param y - number of vertical boxes
* @param x - number of horizontal boxes
*/
function createGameplan(randomPlan) {
  var tr, td;
  
  //remove current gameplan
  while (gameplan.firstChild) {
    gameplan.removeChild(gameplan.firstChild);
  }
  clicked = 0;
  lightBoxes = 0;
  moves.innerHTML = clicked
  
  for(var i = 0; i < 5; i++) {
    tr = document.createElement("tr");
    for(var j = 0; j < 5; j++) {
      td = document.createElement("td");
      td.id = i + "" + j;
      td.className = "light";
      lightBoxes++;
      tr.appendChild(td);
      td.addEventListener("click", turn);
    }
    gameplan.appendChild(tr);
  }
  
  //create random gameplan
  if(randomPlan) {
    var min = [0,10,20,30,40];
    var max = [4,14,24,34,44];
    for(var i = 0; i < 8; i++) {
      var randTemp = random(0,min.length-1);
      var numStr = "" + random(min[randTemp],max[randTemp]);
      numStr = numStr.length == 1 ? "0" + numStr : numStr
      flip(numStr);
    }
  }
}


/*
* flip boxes in the game (light -> dark, dark -> light)
* @param num - id to flip
*/
function flip(flipId) {
  var id, right, left, up, down, flipping, box;
  
  id = flipId;
  right = isValid(id[0] + (Number(id[1]) + 1));
  left = isValid(id[0] + (Number(id[1]) - 1));
  up = isValid((Number(id[0]) - 1) + id[1]);
  down = isValid((Number(id[0]) + 1) + id[1]);
  flipping = [id, right, left, up, down];

  for(var i = 0; i < flipping.length; i++) {
    if(flipping[i]) {
      box = document.getElementById(flipping[i]);
      if(box.classList.contains("dark")) {
        box.className = "light";
        lightBoxes++;
      } else {
        box.className = "dark";
        lightBoxes--;
      }
    }
  }
}


/*
* every turn
*/
function turn() {
  var id = this.id;

  flip(id);
  clicked++;
  moves.innerHTML = clicked;
  //end game
  if(lightBoxes == 0) {
    alert("du vann");
  }
}


/*
* Check if a box on the gameplan is valid (exists in the gameplan)
* @param num - Number to test
* @return - return the number if it is valid else false
*/
function isValid(num) {
  if(num[0] >= 0 && num[0] < gameplan.rows.length && num[1] >= 0 && num[1] < gameplan.rows[0].cells.length) {
    return num;
  } else {
    return false; 
  }
}


/*
* Generates a random number between min and max
* @param min - minimum value
* @param max - max value
* @return - random number
*/
function random(min, max) {
  return Math.floor(Math.random()*(max+1-min))+min;
}