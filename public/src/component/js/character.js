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
    this.heal = () => {
        if (this.currenthealth < this.maxHealth) {
            let heal = (Math.floor(Math.random() * (this.maxHealth - this.min + 1) + this.min))
            this.currenthealth += heal
            console.log("I Heal myself i gain =" + heal);
            if (this.currenthealth > this.maxHealth) {
                this.currenthealth = this.maxHealth
            }
        }
    };

    this.damage = () => {
        let dmg = (1 + this.extraDmg) * (Math.floor(Math.random() * (this.maxDamage - this.min + 1) + this.min))
        console.log("I Attack and i deal = " + dmg * (1 + this.extraDmg))
        return dmg
    }
    this.showStat = () => {
            var stat = {
                "Name": this.heroName,
                "Race": this.race,
                "Item": this.item,
                "Healt": this.currenthealth,
                "Max Health": this.maxHealth,
                "Bonus Health": this.bonusHealth,
                "Min Damage": this.min,
                "Max Damage": this.maxDamage,
                "Extra Damage": this.extraDmg,
                "Max Healing": this.maxHealing,
                "Mana": this.mana,
                "Healing Power": this.healingPower,
                "Double Attack Chance": this.doubleAttack,
                "Doge Chage": this.dogeChance,
                "Life Steal": this.lifeSteal,
                "Prevent Damage": this.preventDmg,
                "Deflect Dalage": this.deflectDmg
            }
            console.table(stat)
        }
        // this.totalDamage = this.damage();
    this.displayChar = () => {
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.currenthealth}`);
    };

 

}