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
      turn.character_turn();
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

  character_turn()
  {
    resetDiv("result");
    addElementToDiv("result","Joueurs encore en vie")
    this.players.filter(player => player.status == "playing").forEach(player => addElementToDiv("result",player.name +" hp: " + player.hp + " mana: " + player.mana + " shield: " + player.shield + " Class: " + player.class_name))
    var random_player = Math.floor(Math.random()*this.active_players.length);
    this.active_player = this.active_players[random_player];
    addElementToDiv("target", "C'est au tour de " + this.active_player.name)
    addElementToDiv("target", "Qui attaques-tu ?")
    this.target_select()
    this.select_power()
  }
  select_power(){
    let power;
    let text_btn;
    let victims = this.players.filter(player => player != this.active_player)
    if (this.active_player.class_name == "Fighter" && this.active_player.hasEnoughMana(20)){
      addElementToDiv("target", "Pouvoir spécial")
      victims.forEach(victim => {this.createButtonDarkVision(this.active_player, victim)})
    } else if (this.active_player.class_name == "Paladin" && this.active_player.hasEnoughMana(40)){
      addElementToDiv("target", "Pouvoir spécial")
      victims.forEach(victim => {this.createButtonHealingLighting(this.active_player, victim)})
    } else if (this.active_player.class_name == "Assassin" && this.active_player.hasEnoughMana(20)){
      addElementToDiv("target", "Pouvoir spécial")
      victims.forEach(victim => {this.createButtonShadowHit(this.active_player, victim)})
    }
  }
  target_select()
  {
    let victims = this.players.filter(player => player != this.active_player)
    victims.forEach(victim => {this.createButtonTarget(this.active_player, victim)})
  }

  switch_player()
  {
    resetDiv("target");
    this.active_players = this.active_players.filter(player => player.status == "playing");
    this.players = this.players.filter(player => player.status == "playing");
    this.active_players = this.active_players.filter(player => player != this.active_player);
    resetDiv("active_players")
    this.active_players.forEach(player => addElementToDiv("active_players", player.name));
    if (this.active_players.length !== 0){
      this.character_turn();
    } else {
      this.game.begin_turn();
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

  createButtonDarkVision(player, victim){
    let turn = this
    var ResultDiv = document.getElementById('target');
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Dark Vision" + "<br>" + victim.name + "<br>" + "hp: " + victim.hp;
    btn.onclick = function(){
      player.darkVision(victim);
      turn.switch_player();
      console.log("dark vision")
    }
    ResultDiv.appendChild(btn);
  }
  createButtonHealingLighting(player, victim){
    let turn = this
    var ResultDiv = document.getElementById('target');
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Healing Lighting" + "<br>" + victim.name + "<br>" + "hp: " + victim.hp;
    btn.onclick = function(){
      player.healingLighting(victim);
      turn.switch_player();
      console.log("Healing Lighting")
    }
    ResultDiv.appendChild(btn);
  }
  createButtonShadowHit(player, victim){
    let turn = this
    var ResultDiv = document.getElementById('target');
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Shadow Hit" + "<br>" + victim.name + "<br>" + "hp: " + victim.hp;
    btn.onclick = function(){
      player.shadowHit(victim);
      turn.switch_player();
      console.log("shadow")

    }
    ResultDiv.appendChild(btn);
  }
}

function start(){
  game = new Game
  game.begin_turn()
}