function perso(){
  console.log("perso")
}
class Character {
  constructor(hp, dmg, mana, name,status="playing") {
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.name = name;
    this.status = status;
    this.shield = 0
  }

  resetShield(){
    this.shield = 0
  }
  takeDamage(dmg) {
    let damage = dmg
    if (this.shield > 0){
      damage = dmg - this.shield
      if (damage < 0){
        damage = 0
      }
    }  
    this.hp -= damage
    if (this.hp <= 0) {
      this.status = "loser"
    }
    console.log(this.name + " a maintenant " + this.hp + " hp")
  }

  dealDamage(victim) {
    console.log(this.name + " attaque "+ victim.name + " et lui inflige "+ this.dmg + " dégats")
    victim.takeDamage(this.dmg)
    if (victim.status == "loser") {
      this.mana += 20
    }
  }
  hasEnoughMana(cost){
    if (cost <= this.mana) {
      return true
    } else {
      return false
    } 
  }
}

class Fighter extends Character {
  constructor(hp=12, dmg=4, mana=40, name="Grace",status,shield){
    super(hp,dmg,mana,name,status,shield);
    this.class_name = "Fighter";
  }

  darkVision(victim) {
    let cost = 20;
    if (this.hasEnoughMana(cost)) {
      this.mana -= cost ;
      console.log("Utilisation du pouvoir Dark Vision");
      victim.takeDamage(5)
      this.shield = 2
    }
    
  } 

}

class Paladin extends Character {
  constructor(hp=16, dmg=3, mana=160,name="Ulder",status,shield){
    super(hp,dmg,mana,name,status,shield)
    this.class_name = "Paladin";
  }

  healingLighting(victim) {
    let cost = 40;
    if (this.hasEnoughMana(cost)) {
      victim.takeDamage(4)
      this.hp += 5
      this.mana -= cost
    }

  }
}

class Monk extends Character {
  constructor(hp=8, dmg=2, mana=200,name="Moana",status,shield){
    super(hp,dmg,mana,name,status,shield)
    this.class_name = "Monk";
  }

  heal(){
    let cost = 25;
    if (this.hasEnoughMana(cost)) {
      this.hp += 8;
      this.mana -= cost;
    }
  }
}

class Berzerker extends Character {
  constructor(hp=8, dmg=4, mana=0,name="Draven",status,shield){
    super(hp,dmg,mana,name,status,shield);
    this.class_name = "Berzerker";
  }

  rage(){
    this.dmg +=1;
    this.hp -=1;
  }

}
class Assassin extends Character {
  constructor(hp=6, dmg=6, mana=20,name="Carl",status,shield){
    super(hp,dmg,mana,name,status,shield)
    this.class_name = "Assassin";
  }
  shadowHit(victim){
    let cost = 20
    if (this.hasEnoughMana(cost)) {
      victim.takeDamage(7);
      this.mana -= cost;
      this.shield=100;
    }
  }

}