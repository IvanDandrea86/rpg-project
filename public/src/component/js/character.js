//Use this script to generate your character
function Person(heroName, race, item) {
    {
        this.heroName = heroName
        this.race = race;
        this.item = item;
        //healt stats
        this.currenthealth = 100;
        this.maxHealth = 100;
        this.bonusHealth = 0;
        //attack stats
        this.min = 3;
        this.maxDamage = 20;
        this.extraDmg = 0
        this.doubleAttack = 0.05;
        this.lifeSteal = 0;
        //mana stats
        this.mana = 60;
        //healing stats
        this.maxHealing = 30;
        this.healingPower = 0.05;
        //defending stas
        this.dogeChance = 0.05;
        this.preventDmg = 0.05;
        this.deflectDmg = 0.05;
    }
    this
    this.heal = () => {
        if (this.currenthealth < this.maxHealth) {
            let heal = (Math.floor(Math.random() * (this.maxHealth - this.min + 1) + this.min))
            this.currenthealth += heal
            writeOnConsole(`I Heal myself i gain = ${heal}`);
            if (this.currenthealth > this.maxHealth) {
                this.currenthealth = this.maxHealth
            }
        }else{
            console.log("Your Healt is Max")
        }
    };

    this.damage = () => {
        let dmg = (1 + this.extraDmg) * (Math.floor(Math.random() * (this.maxDamage - this.min + 1) + this.min))
        return dmg
    }
  
        // this.totalDamage = this.damage();
    this.displayChar = () => {
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.currenthealth}`);
    };

 

}