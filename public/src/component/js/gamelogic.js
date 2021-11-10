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
     * @param {Person} person - object Person 
     * @param {String} url - url json
     * @returns {Person}
     */
let updateItem = (person, url) => {
        dataFetchAsync(url)
            .then(data => {
                data.items.forEach(elem => {
                    if (elem.name == person.item) {
                        person[elem.power] = person[elem.power] + elem.value
                    }
                })
            })
    }
    /**
     * Update Race
     * @param {Person} person - object Person  
     * @param {String} url - url json
     * @returns {Person}
     */
let updateRace = (person, url) => {
    dataFetchAsync(url)
        .then((data) => {
            let datas = data.race
            datas.forEach(elem => {
                if (elem.name == person.race) {
                    person[elem.power] = person[elem.power] + elem.value
                    if (elem.name == "Orc") {
                        person['maxHealth'] = person['maxHealth'] * (1 + (person['bonusHealth']))
                        person['currenthealth'] = person['maxHealth']
                    }
                }
            });

        })

}

/**
 * Create Race List
 * @param {HTMLElement} htmlElem -parent where append list
 * @param {String} target -url json 
 */
const createRaceList = (htmlElem, target) => {
        const item_array = new Array()
        dataFetchAsync(target)
            .then(data => {
                data.race.forEach(elem => {
                    item_array.push(elem.name)
                })
                item_array.forEach(elem => {
                    let newItem = document.createElement("option")
                    newItem.value = elem
                    newItem.innerHTML = elem
                    htmlElem.append(newItem)
                })
            })
    }
    /**
     * Create Item List
     * @param {HTMLElement} htmlElem -parent where append list
     * @param {String} target -url json 
     */
const createItemList = (htmlElem, target, race) => {
    const item_array = new Array()
    dataFetchAsync(target)
        .then(data => {
            data.items.forEach(elem => {
                elem.race.forEach(element => {
                    if (element == race)
                        item_array.push(elem.name)
                })

            })
            item_array.forEach(elem => {
                let newItem = document.createElement("option")
                newItem.value = elem
                newItem.innerHTML = elem
                htmlElem.append(newItem)
            })
        })
}
const clearItemSelect = (htmlElem) => {
    var i, L = htmlElem.options.length - 1;
    for (i = L; i >= 0; i--) {
        htmlElem.remove(i);
    }
}

// }
const abilitychance = (ability) => { return (Math.random() < ability) }

/**
 * Damage Calculation
 *@param {Person} attacker 
 * @param {Person} defender 
 */
let damageCalculation = (attacker, defender) => {

        let lifesteal = (attacker.lifeSteal) * (defender.currenthealth)
        let dmg = attacker.damage()

        let totdmg = dmg + lifesteal
        totdmg=Number(totdmg.toFixed(1))
        if (abilitychance(attacker.doubleAttack) == true) { //double attack calculator
            writeOnConsole(`${attacker.heroName} made a double attack`, console_action)
            totdmg = totdmg * 2
        }
        if (attacker.lifeSteal != 0) {
            attacker.currenthealth += lifesteal
            writeOnConsole(`${attacker.heroName} steal ${Number(lifesteal.toFixed(1))} lifepoints`, console_action);
            if (attacker.currenthealth > attacker.maxHealth) {
                attacker.currenthealth = attacker.maxHealth
            }
        }
        if (abilitychance(defender.dogeChance) == true) { //double attack calculator
            writeOnConsole(`${defender.heroName} doge the attack`, console_action)
        // } else if (abilitychance(defender.preventDmg) == true) { //double attack calculator
        //     writeOnConsole(`${defender.heroName} prevent the attack`, console_action)
        } else if (abilitychance(defender.deflectDmg) == true) { //double attack calculator
            writeOnConsole(`${defender.heroName} deflect the attack and deals ${totdmg}`, console_action)
            attacker.currenthealth = attacker.currenthealth - totdmg
        } else {
            if(defender.preventDmg>0){
                let prevent= totdmg*defender.preventDmg
                prevent=Number(prevent).toFixed(1)
                console.log(prevent)
                writeOnConsole(`${attacker.heroName} successfully attacked and deals ${totdmg}.\n`,console_action)
                totdmg=totdmg-prevent
                defender.currenthealth = defender.currenthealth - totdmg
                writeOnConsole(`${defender.heroName} prevent ${prevent} of damage\n`,console_action)
                writeOnConsole(` ${defender.heroName} has now ${Number(defender.currenthealth).toFixed(1)}`, console_action)  
            }
            else{
            defender.currenthealth = defender.currenthealth - totdmg
            writeOnConsole(`${attacker.heroName} successfully attacked and deals ${totdmg}.\n
                            ${defender.heroName} has now ${Number(defender.currenthealth).toFixed(1)}`, console_action)
        }
    }
    }
    /**
     * 
     * @param {Person} attacker 
     * @param {Person} defender 
     */
let checkLifeline = (attacker, defender) => {
    if (defender.currenthealth <= 0) {
        writeOnConsole(`${defender.heroName} is dead`, console_status)
        return true
    }
    if (attacker.currenthealth <= 0) {
        writeOnConsole(`${attacker.heroName} is dead`, console_status)
        return true
    }
}
let drawStat = (htmlElem, person) => {
    const attributeList = [ "extraDmg", "doubleAttack", "healingPower", "dogeChance", "preventDmg", "lifeSteal"]
    let playerName=document.createElement("th")
    playerName.innerHTML=(person.heroName)
    htmlElem.append(playerName)
    for (let i = 0; i < attributeList.length; i++) {
        if (person[attributeList[i]] != 0) {
            let row = document.createElement("tr")
            let data = document.createElement("td")
            let namedata = document.createElement("td")
            data.innerHTML = `${person[attributeList[i]]*100}%`
            namedata.innerHTML = attributeList[i]
            row.append(namedata)
            row.append(data)
            htmlElem.append(row)
        }
    }
}
let writeOnConsole = (string, parentNode) => {
    let message = document.createElement("li")
    message.innerHTML = string
    parentNode.append(message)
    let childnode_array = Array.from(parentNode.childNodes).length
    if (childnode_array > 1) {
        parentNode.removeChild(parentNode.childNodes[0])
    }
}
let updateHealthBar=(obj)=>{
    let htmlElem= document.querySelector(`#${obj.heroName.replace(" ","")}_health .bar`)
    let healt_percent= (obj.currenthealth/obj.maxHealth)*100
    htmlElem.style.height = `${healt_percent}%`
}
