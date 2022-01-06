function addElementToDiv (div, text) {
  var div = document.getElementById(div);
  element = document.createElement("p");
  element.innerHTML = text + "<br>" 
  div.appendChild(element);
}

function resetDiv(div)
{
  var ResultDiv = document.getElementById(div);
  ResultDiv.innerHTML = "";
}

function resetAllDivs()
{
  resetDiv("turn_counter")
  resetDiv("active_players")
  resetDiv("result")
  resetDiv("target")
}

function compare( a, b ) {
  if ( a.hp < b.hp ){
    return -1;
  }
  if ( a.hp > b.hp ){
    return 1;
  }
  return 0;
}



class Game {
  constructor(turn_count = 10, status="ongoing", players){
    this.turn_count = turn_count;
    let player1=new Fighter
    let player2=new Paladin
    let player3=new Monk
    let player4=new Berzerker
    let player5=new Assassin
    this.players = [player1, player2,player3,player4,player5];
    this.status = status;

  }

  addCharacter(name)
  {
    let jobs = ["Fighter","Paladin", "Assassin", "Monk", "Berzerker"]
    // this.player6 = new Fighter();
    this.player6 = eval(`new ${jobs[Math.floor(Math.random()*jobs.length)]}()`);
    alert("Tu vas jouer un " + this.player6.class_name);
    this.player6.name = name;
    this.players.push(this.player6);
  }
  endGame()
  {
    resetAllDivs();
    let winners = this.players.filter(player => player.status == "winner");
    console.log(winners)
    winners = winners.sort(compare)
    console.log(winners)
    addElementToDiv("result", "Le Winner est " + winners[winners.length - 1].name);
  }

  begin_turn(){
    resetDiv("turn_counter");
    addElementToDiv("turn_counter", "Tour " + (11 - this.turn_count) + " sur 10")
    this.players.forEach(player => {player.resetShield()});
    console.log(this.players)
    if (this.turn_count != 0){
      let turn = new Turn(this, this.players);
      turn.character_turn();
      console.log(turn.players)
      this.turn_count -= 1;
    } else {
      this.players = this.players.filter(player => player.status == "playing")
      this.players.forEach(player =>{ player.status = "winner"})
      this.endGame();
    }
  }
}

function start(){
  game = new Game
  let new_character = prompt("Donne le nom de ton personnage, laisse vide si tu ne veux pas de personnage en plus");
  if (new_character !== "")
  {
    game.addCharacter(new_character);
  }
  game.begin_turn()
}