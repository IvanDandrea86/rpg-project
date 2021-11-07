const url_class = "./src/component/data/class.json"
const url_item = "./src/component/data/items.json"
    /**
     * Async Fetch
     * @param {String} target-url json
     * @returns  {Object} dataset
     */
const dataFetchAsync = async(target) => {
        const response = await fetch(target)
        const dataset = await response.json()
        return dataset
    }
    /**
     * Update Item
     * @param {Person} onj - object Person 
     * @param {String} url - url json
     * @returns {Person}
     */
let updateItem = (obj, url) => {
        dataFetchAsync(url)
            .then(data => {
                data.items.forEach(elem => {
                    if (elem.name == obj.item) {
                        obj[elem.power] += elem.value
                    }
                });

            })
        return obj
    }
    /**
     * Update Race
     * @param {Person} onj - object Person  
     * @param {String} url - url json
     * @returns {Person}
     */
let updateRace = (obj, url) => {
        dataFetchAsync(url)
            .then(data => {
                data.race.forEach(elem => {
                    if (elem.name == obj.race) {
                        console.log("found")
                        obj[elem.power] += elem.value
                        if (elem.name == "Orc") {
                            console.log("trovato")
                            obj['maxHealth'] = obj['maxHealth'] * (1 + (obj['bonusHealth']))
                            obj['currenthealth'] = obj['maxHealth']
                        }
                    }
                });
            });
        return obj
    }
    /**
     * Add New Player
     * @param {String} name_character 
     * @param {String} race 
     * @param {String} item 
     * @returns {Person}
     */
const addNewPlayer = (name_character, race, item) => {
    let obj = new Person(name_character, race, item)
    obj = updateRace(obj, url_class)
    obj = updateItem(obj, url_item)
    return obj
}
const abilitychance = (ability) => { return (Math.random() < ability) }

/**
 * Damage Calculation
 * @param {Person} attacker - 
 * @param {Person} defeder -
 */
let damageCalculation = (attacker, defender) => {

    console.log(attacker.lifeSteal)
    console.log(defender.currenthealth)
    let lifesteal = (attacker.lifeSteal) * (defender.currenthealth)
    console.log(lifesteal)
    let x = attacker.damage()
    let totdmg = x + lifesteal
    if (abilitychance(attacker.doubleAttack) == true) { //double attack calculator
        console.log("attacker made a double attack")
        totdmg = totdmg * 2
    }
    if (abilitychance(defender.dogeChance) == true) { //double attack calculator
        console.log("defender doge the attack")
    } else if (abilitychance(defender.preventDmg) == true) { //double attack calculator
        console.log("defender prevent damage")
    } else if (abilitychance(defender.deflectDmg) == true) { //double attack calculator
        console.log("defender deflect damage and deal" + totdmg + " to attacker")
        attacker.currenthealth = attacker.currenthealth - totdmg
    } else {
        defender.currenthealth = defender.currenthealth - totdmg
        console.log(totdmg)
    }
}
let checkLifeline = (attacker, defender) => {
    if (defender.currenthealth < 0) {
        console.log("Defender is dead")
    }
    if (attacker.currenthealth < 0) {
        console.log("Attacker is dead")
    }

}