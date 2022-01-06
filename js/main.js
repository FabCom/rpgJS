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
    resetDiv("turn_counter");
    addElementToDiv("turn_counter", "Tour " + (11 - this.turn_count) + " sur 10")
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
  constructor(game,players)
  {
    this.game = game
    this.players = players.filter(player => player.status == "playing");
    this.active_players = this.players.slice();
    this.active_player = null;    
  }
  
  target_select()
  {
    resetDiv("result");
    addElementToDiv("result","Joueurs encore en vie")
    this.players.filter(player => player.status == "playing").forEach(player => addElementToDiv("result",player.name +" hp: " + player.hp + " mana: " + player.mana + " Class: " + player.class_name))
    this.active_player = this.active_players[0];
    addElementToDiv("target", "C'est au tour de " + this.active_player.name)
    addElementToDiv("target", "Qui attaques-tu ?")
    let victims = this.players.filter(player => player != this.active_player)
    victims.forEach(victim => {this.createButtonTarget(this.active_player, victim)})
  }

  switch_player()
  {
    resetDiv("target");
    this.active_players = this.active_players.filter(player => player.status == "playing");
    this.players = this.players.filter(player => player.status == "playing");
    this.active_players.splice(0, 1);
    console.log("players : ")
    console.log(this.players)
    console.log("active_players : ")
    console.log(this.active_players)
    console.log("Changement de personnage");
    if (this.active_players.length !== 0){
      this.target_select();
    } else {
      this.game.begin_turn();
      console.log("Nouveau tour")
    }
    
  }

  createButtonTarget(player, victim){
    let turn = this
    var ResultDiv = document.getElementById('target');
    var btn = document.createElement("BUTTON");
    btn.innerHTML = victim.name + "<br>" + "hp: " + victim.hp;
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