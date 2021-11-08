const url_class = "./src/component/data/class.json"
const url_item = "./src/component/data/items.json"
    /**
     * Async Fetch
     * @param {String} target -url json
     * @returns  {JSON} dataset
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
                        console.log("item found")
                        obj[elem.power] += elem.value
                    }
                })
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
                        console.log("Race found")
                        obj[elem.power] += elem.value
                        if (elem.name == "Orc") {
                            console.log("Orc trovato")
                            obj['maxHealth'] = obj['maxHealth'] * (1 + (obj['bonusHealth']))
                            obj['currenthealth'] = obj['maxHealth']
                        }
                    }
                });
            });
        return obj
    }
/**
 * Create Race List
 * @param {HTMLElement} htmlElem -parent where append list
 * @param {String} target -url json 
 */
 const createRaceList=(htmlElem,target)=>{
    const item_array=new Array()
        dataFetchAsync(target)
        .then (data=>{
            data.race.forEach(elem=>{
                item_array.push(elem.name)
            })
            item_array.forEach(elem=>{
                let newItem = document.createElement("option")
                newItem.value=elem
                newItem.innerHTML=elem
                htmlElem.append(newItem)
            })
        })
}
/**
 * Create Item List
 * @param {HTMLElement} htmlElem -parent where append list
 * @param {String} target -url json 
 */
const createItemList=(htmlElem,target,race)=>{
    const item_array=new Array()
        dataFetchAsync(target)
        .then (data=>{
            data.items.forEach(elem=>{
                elem.race.forEach(element=>{
                    if(element==race)
                    item_array.push(elem.name)
                })
              
            })
            item_array.forEach(elem=>{
                let newItem = document.createElement("option")
                newItem.value=elem
                newItem.innerHTML=elem
                htmlElem.append(newItem)
            })
        })
}
const clearItemSelect=(htmlElem)=>{
    var i, L = htmlElem.options.length - 1;
   for(i = L; i >= 0; i--) {
    htmlElem.remove(i);
   }
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
    console.log(obj)
    return obj
}
const abilitychance = (ability) => { return (Math.random() < ability) }

/**
 * Damage Calculation
 *@param {Person} attacker 
 * @param {Person} defender 
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
/**
 * 
 * @param {Person} attacker 
 * @param {Person} defender 
 */
let checkLifeline = (attacker, defender) => {
    if (defender.currenthealth < 0) {
        console.log("Defender is dead")
    }
    if (attacker.currenthealth < 0) {
        console.log("Attacker is dead")
    }

}