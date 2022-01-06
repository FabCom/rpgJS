function addElement (text) {
  var ResultDiv = document.getElementById('result');
  element = document.createElement("p");
  element.innerHTML = text + "<br>" 
  ResultDiv.appendChild(element);
}

class Game {
  begin(){
    let player1=new Fighter
    let player2=new Paladin
    let player3=new Monk
    let player4=new Berzerker
    let player5=new Assassin
    let players=[player1, player2,player3,player4,player5]
    console.log(players)
    players.forEach(player => {
      addElement(player.name +"(hp="+player.hp+")")
    });
  }
}

function start(){
  game = new Game
  game.begin()
}