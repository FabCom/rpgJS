function addElementToResultDiv (text) {
  var ResultDiv = document.getElementById('result');
  element = document.createElement("p");
  element.innerHTML = text + "<br>" 
  ResultDiv.appendChild(element);
}



function resetResultDiv()
{
  var ResultDiv = document.getElementById('result');
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

  

  begin(){
    resetResultDiv();
    console.log(this.players)
    let turn = new Turn(this.players);
    turn.target_select();
    this.turn_count -= 1;
  }

  
}

class Turn
{
  constructor(active_players, turn_status = 1)
  {
    this.active_players = active_players;
    this.turn_status = turn_status;
    console.log(active_players)
  }
  
  target_select()
  {
    let active_player = this.active_players[0];
    this.players.forEach(victim => {createButtonTarget(active_player, victim)})
  }
  
  switch_player()
  {
    active_players.splice(0, 1);
    if (active_players.length === 0)

    target_select();
  }

  createButtonTarget(player, victim){
    var ResultDiv = document.getElementById('result');
    var btn = document.createElement("BUTTON");
    btn.innerHTML = victim.name + "<br>" + victim.hp;
    btn.onclick = function(){
      player.dealDamage(victim);
      switch_player();
    }
    ResultDiv.appendChild(btn);
  }
}

function start(){
  game = new Game
  game.begin()
}