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
                        obj[elem.power] += elem.value
                    }
                })
                return obj
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
                    person[elem.power] += elem.value
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
        let x = attacker.damage()
        let totdmg = x + lifesteal
        if (abilitychance(attacker.doubleAttack) == true) { //double attack calculator
            writeOnConsole(`${attacker.heroName} made a double attack`)
            totdmg = totdmg * 2
        }
        if (abilitychance(defender.dogeChance) == true) { //double attack calculator
            writeOnConsole(`${defender.heroName} doge the attack`)
        } else if (abilitychance(defender.preventDmg) == true) { //double attack calculator
            writeOnConsole(`${defender.heroName} prevent the attack`)
        } else if (abilitychance(defender.deflectDmg) == true) { //double attack calculator
            writeOnConsole(`${defender.heroName} deflect the attack and deals ${totdmg}`)
            attacker.currenthealth = attacker.currenthealth - totdmg
        } else {
            defender.currenthealth = defender.currenthealth - totdmg
            writeOnConsole(`${attacker.heroName} successfully attacked and deals ${totdmg}.\n
                            ${defender.heroName} has now ${defender.currenthealth}`)
        }
    }
    /**
     * 
     * @param {Person} attacker 
     * @param {Person} defender 
     */
let checkLifeline = (attacker, defender) => {
    if (defender.currenthealth <= 0) {
        writeOnConsole(`${defender.heroName} is dead`)

        return true
    }
    if (attacker.currenthealth <= 0) {
        writeOnConsole(`${attacker.heroName} is dead`)
        return true
    }
}
let drawStat = (htmlElem, obj) => {
    const attributeList = ["heroName", "currenthealth", "extraDmg", "doubleAttack", "healingPower", "dogeChance", "preventDmg", "preventDmg"]
    let list = document.createElement("ul")
    for (var propriety in obj) {
        for (let i = 0; i < attributeList.length; i++) {
            if (attributeList[i] == propriety) {
                let elem = document.createElement("li")
                elem.innerHTML = `${propriety}: ${obj[propriety]}`
                list.append(elem)
            }
        }
    }
    htmlElem.append(list)
}
let writeOnConsole = (string) => {
    let message = document.createElement("li")
    message.innerHTML = string
    let parentNode = document.getElementById("console_message")
    parentNode.append(message)
    let childnode_array = Array.from(parentNode.childNodes).length
    if (childnode_array > 5) {
        parentNode.removeChild(parentNode.childNodes[0])
    }

}