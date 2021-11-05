//Use this script to generate your character
function Person(heroName,race,item){
    {
    this.heroName= heroName
    this.race=race;
    this.item=item;
    this.currenthealth = 100;
    this.maxHealth = 100;
    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;
    this.extraDmg=1
    this.mana=60;
    this.healingPower=1.05;
    this.doubleAttack=1.05;
    this.dogeChance=1.05;
    this.lifeSteal=1;
    this.preventDmg=1;
    this.deflectDmg=1.05;
    }
    this.heal =()=>{
        if(this.currenthealth<this.maxHealth){
            let heal=(Math.floor(Math.random()*(maxDamage-min+1)+min))
            this.currenthealth+=heal
            console.log("I Heal myself i gain ="+  heal);
            if(this.currenthealth>this.maxHealth){
             this.currenthealth=this.maxHealth
            }
        }
    };

    this.damage =()=>{
        let dmg= this.extraDmg*(Math.floor(Math.random()*(this.maxDamage-this.min+1)+this.min))
        return console.log("I Attack and i deal = "+  dmg*this.extraDmg)
    }
    this.showStat=()=>{
      
        console.table( 
            this.heroName,
            this.race,
            this.item,
            this.currenthealth,
            this.maxHealth,
            this.min,
            this.maxDamage ,
            this.extraDmg,
            this.maxHealing,
            this.mana,
            this.healingPower,
            this.doubleAttack,
            this.dogeChance,
            this.lifeSteal,
            this.preventDmg,
            this.deflectDmg)
    }
    // this.totalDamage = this.damage();
    this.displayChar = ()=>{
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    };
}
