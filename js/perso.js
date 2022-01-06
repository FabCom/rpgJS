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
  }

  takeDamage(dmg) { 
    this.hp -= dmg
    if (this.hp <= 0) {
      this.status = "loser"
    }
  }

  dealDamage(victim) {
    victim.takeDamage(this.dmg)
    if (victim.status == "loser") {
      this.mana += 20
    }
  }
  hasEnoughMana(mana_need){
    if (mana_need < this.mana) {
      return true
    } else {
      return false
    } 
  }
}

class Fighter extends Character {
  constructor(hp=12, dmg=4, mana=40, name="Grace", status){
    super(hp,dmg,mana,name,status);
  }

  darkVision(victim) {
    cost = 20;
    if (hasEnoughMana(cost)) {
      activ_power = "darkVision"
      this.mana -= cost ;
      console.log("Utilisation du pouvoir Dark Vision");
      victim.takeDamage(5)
    }
      //bouclier  =2 jusqu'au prochain tour
  } 

}

class Paladin extends Character {
  constructor(hp=16, dmg=3, mana=160,name="Ulder",status){
    super(hp,dmg,mana,name,status)
  }

  healingLighting(victim) {
    victim.takeDamage(4)
    this.hp += 5
  }
}

class Monk extends Character {
  constructor(hp=8, dmg=4, mana=0,name="maana",status){
    super(hp,dmg,mana,name,status)
  }
}

class Berzerker extends Character {
  constructor(hp=8, dmg=4, mana=0,name="Draven",status){
    super(hp,dmg,mana,name,status)
  }

}
class Assassin extends Character {
  constructor(hp=6, dmg=6, mana=20,name="Carl",status){
    super(hp,dmg,mana,name,status)
  }
}