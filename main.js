//HTML ELEMENTS

//SCREENS
const homeScreen = document.querySelector('.homeScreen');
const loggedInScreen = document.querySelector('.loggedInScreen');
// HOMESCREEN NAV-BAR
const homeNav = document.querySelector('.home-nav');
const showLogin = document.querySelector('#login');
const showSignUp = document.querySelector('#signup');
//HOMESCREEN BUTTONS
const loginArea = document.querySelector('.login-area');
const signUpArea = document.querySelector('.signUp-area');
const goBack = document.querySelectorAll('.back');
//LOGIN FORM
const loginForm = document.querySelector('.login-form');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
//SIGNUP FORM
const signUpForm = document.querySelector('.signup-form');
const signUpName = document.querySelector('#signup-name');
const signUpEmail = document.querySelector('#signup-email');
const signUpPassword = document.querySelector('#signup-password');
//LOGGED IN SCREEN HEADER
const helloUser = document.querySelector('#user-name');
const cocktailForm = document.querySelector('.search-form');
const searchCocktail = document.querySelector('#search-cocktail');
const navLinks = document.querySelectorAll('.nav-link');
//LOGGED IN SCREEN PROFILE AREA
const currentLocation = document.querySelector('#title');
const directory = document.querySelector('.directory');
const spiritScreen = document.querySelector(".spirit-screen")
const myDrinksScreen = document.querySelector('.my-drinks')
const createScreen = document.querySelector(".create-screen")
const myDrinksArea = document.querySelector('.mydrinks-container')
const addNew = document.querySelector('.create')
const sections = document.querySelectorAll('section')
const randomArea = document.querySelector('.random-drink')
const randoButton = document.querySelector('.new-random')
const spirits = document.querySelectorAll('.spirit')
//CREATE NEW DRINK FORM
const createForm = document.querySelector('.addCocktail-form')
const createName = document.querySelector('#add-name')
const createPic = document.querySelector('#add-pic')
const createInstructions = document.querySelector('#add-instructions')
const cIngredient1 = document.querySelector('#add-ingredient-1')
const cIngredient2 = document.querySelector('#add-ingredient-2')
const cIngredient3 = document.querySelector('#add-ingredient-3')
const cIngredient4 = document.querySelector('#add-ingredient-4')
const cIngredient5 = document.querySelector('#add-ingredient-5')
const back = document.querySelector('.goback')

const backEnd = 'http://localhost:3001'


//HOMESCREEN FUNCTIONS
// TO DO 1
//sends text from login form and posts it to the backend / backend verifys info and sends back user info or error if info is wrong 
const handleLogin = async () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    try {
        const response = await axios.post(`${backEnd}/users/login`, {
            email: email,
            password: password
        })
        const userId = response.data.user.id
        console.log(userId);
        localStorage.setItem('userId', userId)
        checkStorage()
        console.log('sup yo');
    } catch (error) {
        console.log(error);
    }
}

//TO DO 2
//sends text from sign up form and posts it to the backend / backend sends back new user info / saves userId to local storage
const handleSignUp = async () => {
    const name = signUpName.value;
    const email = signUpEmail.value;
    const password = signUpPassword.value;
    try {
      const response = await axios.post(`${backEnd}/users`, {
          name: name,
          email: email,
          password: password
        })
        const userId = response.data.newUser.id
        localStorage.setItem('userId', userId)
        checkStorage()
    } catch (error) {
        console.log(error);
    }
}




//HELPFUL BOIS

//takes in an element and removes all of its children
const removeAllChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//hides the homescreen and shows the logged in screen
const displayLoggedIn = () => {
    homeScreen.classList.add('hidden');
    loggedInScreen.classList.remove('hidden');
    getPopOrRecent(popular)
    currentLocation.innerHTML = 'Popular Cocktails'
}

const displayLoggedOut = () => {
    loggedInScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
}

const hideSections = () => {
    sections.forEach((section) => {
        section.classList.add('hidden')
    })
}



const clearForms = () => { 
const inputs = document.querySelectorAll('input')
// console.log(input);
inputs.forEach((input) => {
//    console.log(input)
   if(input.type === 'text'){
       input.value = ""
   }
})
}


//HOME EVENT LISTENERS

//shows login form when login is clicked
showLogin.addEventListener('click', () => {
    clearForms()
    homeNav.classList.add('hidden');
    loginArea.classList.remove('hidden');
})

//shows signup form when signup form is clicked
showSignUp.addEventListener('click', () => {
    clearForms()
    homeNav.classList.add('hidden');
    signUpArea.classList.remove('hidden');
})

//hides forms and shows home nav buttons when goback is clicked
goBack.forEach((back) => {
    back.addEventListener('click', () => {
        homeNav.classList.remove('hidden');
        loginArea.classList.add('hidden');
        signUpArea.classList.add('hidden');
    })
})
//adds event listener to log in form and calls login function when form is submitted
loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    clearForms()
    handleLogin()
})
//adds event listener to sign up form and calls sign up function when form is submitted
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault()
    clearForms()
    handleSignUp()
})





//LOGGED IN SCREEN FUNCTIONS

//gets userid from local storage / gets info on user / shows "hello username"
const getProfile = async () => {
    try {
        const userInfo = await axios.get(`${backEnd}/users/profile`, {
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        })
        helloUser.innerText = `Hello There, ${userInfo.data.user.name}!`
    } catch (error) {
        alert('profile not found')
    }
}

//gets all popular or recent drinks from api / creates div for each and shows name
const getPopOrRecent = async (type) => {
    try {
        const res = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/${type.id}.php`)
        const allDrinks = res.data.drinks;
        showAllDrinks(allDrinks)
    } catch (error) {
        console.log(error);
    }
}

//creates div for each drink and shows name
const showAllDrinks = async (res) => {
    removeAllChildren(directory)
    let allDrinks
    if(res.length > 10){
        const rand = res.sort(function() {
            return 0.5 - Math.random();
            });
        allDrinks = rand.slice(res,10)
    }else{ 
        allDrinks = res
    }
    allDrinks.forEach((drink) => {
        const pic = drink.strDrinkThumb
        const drinkName = drink.strDrink
        const drinkDiv = document.createElement('div')
        drinkDiv.classList.add('drink')
        drinkDiv.setAttribute('id', drink.idDrink)
        drinkDiv.style.backgroundImage = `url(${pic})`;
        drinkDiv.innerHTML = drinkName
        directory.append(drinkDiv)
    }) 
    getPageDrinks()
}


//adds event listener to all drinks on page and calls drinkinfo function if a drink is clicked
const getPageDrinks = () => {
    const pageDrinks = document.querySelectorAll('.drink')
    pageDrinks.forEach((drink) => {
        drink.addEventListener('click', (e) => {
            const id =  e.target.id
            getDrinkInfo(id)
            
        })
    })
}

//gets all info from which ever drink is clicked
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

//creates divs for all info on the clicked drink
const displayDrinkInfo = (id, name, picUrl, [ingredients], instructions) => {
    removeAllChildren(directory)
    hideSections()
    directory.classList.remove('hidden')
    const cockTailContainer = document.createElement('div')
    const drinkPic = document.createElement('img')
    const drinkInstructions = document.createElement('div')
    cockTailContainer.classList.add('cocktail-container')
    drinkPic.classList.add('pic')
    drinkInstructions.classList.add('instructions')
    drinkPic.src = picUrl
    drinkInstructions.innerHTML = instructions
    directory.append(cockTailContainer, drinkInstructions)
    cockTailContainer.append(drinkPic)
    displayIngredients( [ingredients])
    currentLocation.innerHTML = name
    if(id !== "dont send"){ 
    sendDrink(id)
    }
}
//creates divs for all ingredients
const displayIngredients = ( [ingredients]) => {
    const container = document.querySelector('.cocktail-container')
    const ingredContainer = document.createElement('div')
    ingredContainer.classList.add('ingredient-container')
    container.append(ingredContainer)
    ingredients.forEach((ingredient) => {
        const ingredDiv = document.createElement('div')
        ingredDiv.classList.add('ingredient')
        ingredDiv.innerHTML = ingredient
        ingredContainer.append(ingredDiv)
    })
}
//adds drink to backend database if it is clicked on

const sendDrink = async (id) => {
    try {
        const theDrink = id
        const response = await axios.post(`${backEnd}/cocktails`, {
            webId: theDrink,
            userId: localStorage.getItem('userId')
        })
        createSaveOrDelete(response)
    } catch (error) {
        console.log(error);
    }
}

//checks whether drink has been added already or not and creates the appropriate button
const createSaveOrDelete = (response) => {
    if(response.data.message === 'not saved'){ 
        const saveDrink = document.createElement('div')
        saveDrink.classList.add('save')
        saveDrink.innerHTML = "Save Drink"
        directory.append(saveDrink)
        saveDrink.addEventListener('click', () => {
            currentLocation.innerHTML = "Favorite Cocktails"
            handleSave(response)
        })
    }else{
        const deleteDrink = document.createElement('div')
        deleteDrink.classList.add('save')
        deleteDrink.innerHTML = "Delete Drink"
        directory.append(deleteDrink)
        deleteDrink.addEventListener('click', async () => {
            currentLocation.innerHTML = "Favorite Cocktails"
            handleDelete(response);
        })
    }
}

//sends info to back end and adds row to userCocktails
const handleSave = async (response) => {
    try {
        const drinkId = response.data.newCocktail[0].id
        const save = await axios.put(`${backEnd}/users/save`, {
            userId: localStorage.getItem('userId'),
            drinkId: drinkId
        })
        getSavedDrinks()
    } catch (error) {
        console.log(error);
    }
}
//sends info to back end and removes row to userCocktails
const handleDelete = async (response) => {
    try {
        const userId = localStorage.getItem('userId')
        const drinkId = response.data.newCocktail[0].id
        const myDelete = await axios.delete(`${backEnd}/cocktails/${userId}/delete/${drinkId}`)
        getSavedDrinks()
    } catch (error) {
        console.log(error);
    }
}

//gets all saved drinks and creates a div for each displaying its name
const getSavedDrinks = async () => {
    removeAllChildren(directory)
    try {
        const res = await axios.put(`${backEnd}/cocktails/saved`, {
            userId: localStorage.getItem('userId')
        })
        const savedDrinks = res.data
        savedDrinks.forEach(async (drink) => {
            const info = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drink}`);
            const nameDiv = document.createElement('div')
            nameDiv.classList.add('drink')
            nameDiv.setAttribute('id', drink)
            nameDiv.innerHTML = info.data.drinks[0].strDrink
            // const pic = drink.strDrinkThumb
            nameDiv.style.backgroundImage = `url(${info.data.drinks[0].strDrinkThumb})`;
            directory.append(nameDiv)
            nameDiv.addEventListener('click', (e) => {
                const id = e.target.id
                getDrinkInfo(id)
            })
        })
    } catch (error) {
        console.log(error);
    }
}

//gets random drink from api and displays it in rando area
const getRandoDrink = async () => {
    try {
        const res = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/random.php`)
        const id = res.data.drinks[0].idDrink
        const name = res.data.drinks[0].strDrink
        const pic = res.data.drinks[0].strDrinkThumb
        const nameDiv = document.createElement('div')
        // const picDiv = document.createElement('img')
        nameDiv.classList.add('drink')
        nameDiv.classList.add('randDrink')
        nameDiv.style.backgroundImage = `url(${pic})`
        nameDiv.setAttribute('id', id)
        // picDiv.classList.add('pic')
        nameDiv.innerHTML = name
        // picDiv.src = pic
        randomArea.append(nameDiv)
        getPageDrinks()
    } catch (error) {
        console.log(error);
    }
}
getRandoDrink()


//takes value from import form and adds it to the api url then searches the api for that drink
const handleSearch = async () => {
    try {
        removeAllChildren(directory)
        hideSections()
        directory.classList.remove('hidden')
        const cocktail = searchCocktail.value
        currentLocation.innerHTML = cocktail
        const res = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/search.php?s=${cocktail}`)
        const allDrinks = res.data.drinks
        searchCocktail.value = ""
        showAllDrinks(allDrinks)
    } catch (error) {
        console.log(error);
    }
}

//searches api based on spirit
const spiritSearch = async (type) => {
    try {
        const res = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/filter.php?i=${type}`)
        const drinks = res.data.drinks
        showAllDrinks(drinks)
    } catch (error) {
        console.log(error);
    }
}

//takes input from form and adds an addedCocktail
const handleCreate = async () => {
    try {
        const response = await axios.post(`${backEnd}/addedCocktails`, {
            name: createName.value,
            picUrl: createPic.value,
            instructions: createInstructions.value,
            ingredient1: cIngredient1.value,
            ingredient2: cIngredient2.value,
            ingredient3: cIngredient3.value,
            ingredient4: cIngredient4.value,
            ingredient5: cIngredient5.value
        })
        const drinkId = response.data.newCocktail.id
        makeAssociation(drinkId)
    } catch (error) {
        console.log(error);
    }
}

//adds row to userAddedCocktails table to associate the added cocktail with the user
const makeAssociation = async (drinkId) => {
   try {
        const save = await axios.put(`${backEnd}/users/save/added`, {
        userId: localStorage.getItem('userId'),
        drinkId: drinkId
        })
        console.log(save);
        getAddedCocktails()
   } catch (error) {
       console.log(error);
   }
}


// gets all added cocktails and creates divs for each name// adds an event listener to each // if its clicked, takes that divs info and sends it to displayDrinksInfo
const getAddedCocktails = async () => {
    try {
        const res = await axios.put(`${backEnd}/addedCocktails/added`,{
            userId: localStorage.getItem('userId')
        })
        removeAllChildren(myDrinksArea)
        const addedDrinks = res.data
        addedDrinks.forEach((drink) => {
            const drinkId = drink.id
            const name = drink.name
            const nameDiv = document.createElement('div')
            nameDiv.classList.add('drink')
            nameDiv.innerHTML = name
            myDrinksArea.append(nameDiv)
            nameDiv.addEventListener('click', (e) => {
                const id = "dont send"
                const name = drink.name
                const picUrl = drink.picUrl
                const ingredients = [drink.ingredient1,drink.ingredient2,drink.ingredient3,drink.ingredient4,drink.ingredient5]
                const instructions = drink.instructions
                myDrinksScreen.classList.add('hidden')
                directory.classList.remove('hidden')
                displayDrinkInfo(id, name, picUrl, [ingredients], instructions)
                createDeleteButton(drinkId)
            })
        })
    } catch (error) {
        console.log(error);
    }
}
//adds delete button && event listener to each added drink//deletes drink if its clicked
const createDeleteButton = (drinkId) => {
    const deleteButton = document.createElement('div')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = "Delete"
    directory.append(deleteButton)
    deleteButton.addEventListener('click', async () => {
        const userId = localStorage.getItem('userId')
        const myDelete = await axios.delete(`${backEnd}/addedCocktails/${userId}/delete/${drinkId}`)
        console.log(myDelete);
        getAddedCocktails()
        hideSections()
        myDrinksScreen.classList.remove('hidden')
        currentLocation.innerHTML = "My Cocktails"
    })
}





// LOGGED IN SCREEN EVENTLISTENERS

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        
        const theLink = event.target.id
        if(theLink === "popular"){
            currentLocation.innerHTML = "Popular Cocktails"
            getPopOrRecent(popular)
            hideSections()
            directory.classList.remove('hidden')
        }else if(theLink === "recent"){
            currentLocation.innerHTML = "Most Recent Cocktails"
            getPopOrRecent(recent)
            hideSections()
            directory.classList.remove('hidden')
        }else if(theLink === "spirits"){
            currentLocation.innerHTML = "Spirits"
            hideSections()
            spiritScreen.classList.remove("hidden")
        }else if(theLink === "saved"){
            currentLocation.innerHTML = "Favorite Cocktails"
            getSavedDrinks()
            hideSections()
            directory.classList.remove('hidden')
        }else if(theLink === "mine"){
            currentLocation.innerHTML = "My Cocktails"
            getAddedCocktails()
            hideSections()
            myDrinksScreen.classList.remove('hidden')
        }else if(theLink === "logout"){
            displayLoggedOut();
            homeNav.classList.remove('hidden');
            loginArea.classList.add('hidden');
            signUpArea.classList.add('hidden');
            localStorage.removeItem('userId');
        }
    })
})

randoButton.addEventListener('click', () => {
    removeAllChildren(randomArea)
    getRandoDrink()
})

cocktailForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleSearch()
})

spirits.forEach((spirit) => {
    spirit.addEventListener('click', (e)=> {
        const type = e.target.innerHTML
        currentLocation.innerHTML = type
        spiritSearch(type)
        hideSections()
        directory.classList.remove('hidden')
    })
})


addNew.addEventListener('click', () => {
    currentLocation.innerHTML = "Add a New Cocktail"
    hideSections()
    clearForms()
    createScreen.classList.remove('hidden')
})


createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleCreate()
    hideSections()
    myDrinksScreen.classList.remove('hidden')
})

back.addEventListener('click', () => {
    currentLocation.innerHTML = "My Cocktails"
    hideSections()
    myDrinksScreen.classList.remove('hidden')
})





const checkStorage = () => { 
    if(localStorage.getItem('userId')){
        getProfile()
        displayLoggedIn()
    }else{
        displayLoggedOut()
    }}
    checkStorage()
    
    // window.addEventListener('load', (e) => {
        //     checkStorage()
        // })