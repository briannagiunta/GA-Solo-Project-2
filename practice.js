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