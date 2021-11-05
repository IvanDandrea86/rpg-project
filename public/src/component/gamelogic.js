const url_class= "./src/component/data/class.json"
const url_item="./src/component/data/items.json"

const dataFetchAsync= async(target)=>{
    const response = await fetch(target)
    const dataset  = await response.json()
    return dataset
}
let updateItem=(obj,url)=>{
    dataFetchAsync(url)
    .then(data=>{
        data.items.forEach(elem => {
        if(elem.name==obj.item){
            obj[elem.power]+=elem.value
        }
        });  
        
})
return obj
}
let updateRace=(obj,url)=>{
    dataFetchAsync(url)
    .then(data=>{
        data.race.forEach(elem => {
        if(elem.name==obj.race){
            console.log("trovato")
            obj[elem.power]=elem.value
            }
        });  
      obj.showStat()  
    }); 
    return obj 
}

const addNewPlayer=(name_character,race,item)=>{
    let hero = new Person(name_character,race,item)
    hero = updateRace(hero,url_class)
    hero.displayChar(); //dispay char
    return hero
}