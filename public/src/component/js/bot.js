/**
 *Create Bot 
 * @param {Person} obj - Object Person
 * 
 */
let createBot=(obj)=>{
    obj.heroName="Bot Warrior"
    randomRaceBot(obj)
}
/**
 *Initialize Random parameter 
 * @param {Person} obj - Object Person
 * 
 */
let randomRaceBot=(obj)=>{
    var races_list=new Array()
        dataFetchAsync(url_class)
        .then(data=>{
            let datas=data.race
            datas.forEach(elem=>{
                races_list.push(elem.name)
            })
            let max=races_list.length
            let index=Math.floor(Math.random()*max)
            obj.race=races_list[index]
            var index1= Math.floor((Math.random()*3)+1)
           if (obj.race =='Elf') {
                    switch (index1){
                        case 1:{
                            obj.item ='Bow'
                           break
                        }
                        case 2:{
                            obj.item ='Dagger'
                            break
                        }
                        case 3:{
                            obj.item ='Magic Staff'
                            break
                        }
                    }
             }
            if  (obj.race =='Knight'){
                    switch (index1){
                        case 1:{
                            obj.item ='Spear'
                            break
                        }
                        case 2 :{
                            obj.item ='Axe'
                            break
                        }
                        case 3 :{
                            obj.item ='Sword'
                            break
                        }
                }
            }
            if (obj.race=='Orc'){
                    switch (index1){
                        case 1:{
                            obj.item ='Hammer'
                            break
                        }
                        case 2:{
                            obj.item ='Scimitar'
                            break
                        }
                        case 3:{
                            obj.item ='Axe'
                            break
                        }
                }
            }
            if(obj.race== 'Troll'){
    
                    switch (index1){
                        case 1:{
                            obj.item ='Bone'
                            break
                        }
                        case 2:{
                            obj.item ='Hammer'
                            break
                        }
                        case 3:{
                            obj.item ='Bat'
                            break
                        }
                    }    
            }
        model2 = selectModel(obj.race, obj.item) 
            model2 = model2.toString()
            updateRace(obj, url_class)
            updateItem(obj, url_item)
        
        })      
}
/**
 * Bot Action
 * @param {Person} obj - Object Person
 * @param {Person} obj1 - Object person
 */
let botAction=(obj,obj1)=>{
    let random_action=(Math.floor(Math.random()*2+1))
    console.log(random_action)
    if (random_action==1){
        hit.play()
        setTimeout(()=>{hurt.play()},500)
        damageCalculation(obj, obj1)
        updateHealthBar(obj)
        updateHealthBar(obj1)
        gameEnd = checkLifeline(obj, obj1)
    }else{
        obj.heal()
        updateHealthBar(obj)
        updateHealthBar(obj1)
        gameEnd = checkLifeline(obj, obj1)
    }  
}
/**
 * Take Player 1 action anvs vai for Bot
 * @param {Person} obj - Object Person
 * @param {Person} obj1 - Object person
 */
let takeActionVsBot = (obj, obj1) => {
    attBtn.addEventListener("click", () => {
        hit.play()
        setTimeout(()=>{hurt.play()},500)
        damageCalculation(obj, obj1)
        updateHealthBar(obj)
        updateHealthBar(obj1)
        gameEnd = checkLifeline(obj, obj1)
        if (gameEnd) {
            endGame()
            return
        }
        //switch
        let temp = obj
        obj = obj1
        obj1 = temp
        writeOnConsole(`${obj.heroName} turn`, console_status)
        attBtn.style.display="none"
        healBtn.style.display="none"
        setTimeout(()=>{
            botAction(obj,obj1)
            let temp = obj
            obj = obj1
            obj1 = temp
            writeOnConsole(` ${obj.heroName} turn`, console_status)
            attBtn.removeAttribute("style")
            healBtn.removeAttribute("style")},2000)
    })
        healBtn.addEventListener("click", () => {
        updateHealthBar(obj)
        updateHealthBar(obj1)
        gameEnd = checkLifeline(obj, obj1)
        let temp = obj
        obj = obj1
        obj1 = temp
        attBtn.style.display="none"
        healBtn.style.display="none"
        writeOnConsole(` ${obj.heroName} turn`, console_status)
        setTimeout(()=>{
            botAction(obj,obj1)
            let temp = obj
            obj = obj1
            obj1 = temp
            writeOnConsole(` ${obj.heroName} turn`, console_status)
            attBtn.removeAttribute("style")
            healBtn.removeAttribute("style")},2000)
    })
}
/**
 *  Start battle vs Bot
 * @param {Person} obj - 
 * @param {Person} obj1 -
 */
let startBattleBot = (obj, obj1) => {
    let player1_img = document.getElementById("player1_img")
    let player2_img = document.getElementById("player2_img")

    drawStat(stat,obj)  
    drawStat(stat_1, obj1)
 
    document.getElementById("player1_health").id=`${obj.heroName.replace(" ","")}_health`
    document.getElementById("player2_health").id=`${obj1.heroName.replace(" ","")}_health`
    selectPlayer.style.display = "none"
    main_game.removeAttribute("style")
    writeOnConsole(`The Battle between ${hero.heroName}and ${hero2.heroName} has started`, console_status)
    setBackGroundImg(backGround)
    animateImg(player1_img, obj.race, "IDLE", model, timer1)
    animateImg(player2_img, obj1.race, "IDLE", model2, timer2)
    attacker = selectFirstPlayerTurn(hero, hero2)
    writeOnConsole(`${attacker.heroName} start first`, console_status)
    if (attacker == obj) {
        defender = obj1
    } else {
        defender = obj
    }
    takeActionVsBot(attacker, defender)
}


