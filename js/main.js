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

  begin_turn(){
    addElementToDiv("turn_counter", this.turn_count)
    resetDiv("turn_counter");
    console.log(this.players)
    if (this.turn_count != 0){
      let turn = new Turn(this, this.players);
      turn.target_select();
      console.log(turn.players)
      this.turn_count -= 1;
    } else {
      console.log("END")
    }
  }

  
}

class Turn
{
  constructor(game,players,active_players=players, active_player, turn_status = 1)
  {
    this.game = game
    this.players = players;
    this.active_players = active_players;
    this.active_player = active_player;
    this.turn_status = turn_status;
    addElementToDiv("result","Joueurs encore en vie")
    players.forEach(player => addElementToDiv("result",player.name))
  }
  
  target_select()
  {
    let active_player = this.active_players[0];

    this.players.forEach(victim => {this.createButtonTarget(active_player, victim)})
  }

  switch_player()
  {
    resetDiv("target");
    this.active_players.splice(0, 1);
    console.log("Changement de personnage");
    if (this.active_players.length !== 0){
      this.target_select();
    } else {
      this.game.begin_turn();
      console.log("Grrrrrr")
    }
    
  }

  createButtonTarget(player, victim){
    let turn = this
    var ResultDiv = document.getElementById('target');
    var btn = document.createElement("BUTTON");
    btn.innerHTML = victim.name + "<br>" + victim.hp;
    btn.onclick = function(){
      player.dealDamage(victim);
      turn.switch_player();
    }
    ResultDiv.appendChild(btn);
  }
}

function start(){
  game = new Game
  game.begin_turn()
}