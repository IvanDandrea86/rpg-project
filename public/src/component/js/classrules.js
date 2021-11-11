/**
 * Selcet Image model based on the race and Item
 * @param {String} race 
 * @param {String} item 
 * @returns 
 */
let selectModel=(race,item)=>{
    let modelNumber
    switch(race){
        case 'Elf' :{
            switch (item){
                case 'Bow':{
                    modelNumber =1
                    return modelNumber
                }
                case 'Dagger':{
                    modelNumber =2
                    return modelNumber
                }
                case 'Magic Staff':{
                    modelNumber =3
                    return modelNumber
                }
            }
        }
        case 'Knight':{
            switch (item){
                case 'Spear':{
                    modelNumber =1
                    return modelNumber
                }
                case 'Axe':{
                    modelNumber =2
                    return modelNumber
                }
                case 'Sword':{
                    modelNumber =3
                    return modelNumber
                }
        }
    }
        case 'Orc':{
            switch (item){
                case 'Hammer':{
                    modelNumber =1
                    return modelNumber
                }
                case 'Scimitar':{
                    modelNumber =2
                    return modelNumber
                }
                case 'Axe':{
                    modelNumber =3
                    return modelNumber
                }
        }
        }
        case 'Troll':{
            switch (item){
                case 'Bone':{
                    modelNumber =3
                    return modelNumber
                }
                case 'Hammer':{
                    modelNumber =2
                    return modelNumber
                }
                case 'Bat':{
                    modelNumber =1
                    return modelNumber
                }
            }

        }

    }
    }  
 
  
        
