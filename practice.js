const displayDrinkInfo = (id, name, picUrl, [ingredients], instructions) => {
    removeAllChildren(directory)
    const cockTailContainer = document.createElement('div')
    const drinkPic = document.createElement('img')
    const drinkInstructions = document.createElement('div')
    cockTailContainer.classList.add('cocktail-container')
    cockTailContainer.setAttribute('id', id)
    drinkPic.classList.add('pic')
    drinkInstructions.classList.add('instructions')
    drinkInstructions.setAttribute('id', id)
    drinkPic.src = picUrl
    drinkInstructions.innerHTML = instructions
    if(directory.classList[1] === 'hidden'){ 
        const nameDiv = document.createElement('div')
        nameDiv.classList.add('name')
        nameDiv.setAttribute('id', id)
        nameDiv.innerHTML = name
        savedScreen.append(nameDiv)
        savedScreen.append(cockTailContainer, drinkInstructions)
    }else{ 
        directory.append(cockTailContainer, drinkInstructions)
        currentLocation.innerHTML = name
    }
    cockTailContainer.append(drinkPic)
    displayIngredients([ingredients])
    sendDrink(id)
    handleSaveScreen()
    // createSaveButton(id)
}


const getDrinkInfo = async (id) => {
    try {
        let ingredients =[]
        let measurements = []
        console.log(measurements);
        const drinkInfo = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`);
        const currentDrink = drinkInfo.data.drinks[0]
        const name = currentDrink.strDrink
        const picUrl = currentDrink.strDrinkThumb
        const instructions = currentDrink.strInstructions
        for(key in currentDrink){
            for(let i = 1; i<=15; i++){
                if(key === `strIngredient${i}` && currentDrink[key] !== null){
                    ingredients.push(currentDrink[key])
                }else if(key === `strMeasure${i}` && currentDrink[key] !== null){
                    measurements.push(currentDrink[key])
                }
            }
        }
        displayDrinkInfo(id, name, picUrl, [ingredients], instructions)
    } catch (error) {
        console.log(error);
    }
}