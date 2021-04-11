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
const directory = document.querySelector('.directory');
const currentLocation = document.querySelector('#title');
const spiritScreen = document.querySelector(".spirit-screen")
const savedScreen = document.querySelector(".saved-screen")
const createScreen = document.querySelector(".create-screen")
const sections = document.querySelectorAll('section')





//HOMESCREEN FUNCTIONS
// TO DO 1
//sends text from login form and posts it to the backend / backend verifys info and sends back user info or error if info is wrong 
const handleLogin = async () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email: email,
        password: password
      })
      const userId = response.data.user.id
      localStorage.setItem('userId', userId)
      checkStorage()
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
      const response = await axios.post('http://localhost:3001/users', {
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


//HOME EVENT LISTENERS

//shows login form when login is clicked
showLogin.addEventListener('click', () => {
    homeNav.classList.add('hidden');
    loginArea.classList.remove('hidden');
})

//shows signup form when signup form is clicked
showSignUp.addEventListener('click', () => {
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
    handleLogin()
    // displayLoggedIn()
})
//adds event listener to sign up form and calls sign up function when form is submitted
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault()
    handleSignUp()
    // displayLoggedIn()
})





//LOGGED IN SCREEN FUNCTIONS

//gets userid from local storage / gets info on user / shows "hello username"
const getProfile = async () => {
    try {
        const userInfo = await axios.get('http://localhost:3001/users/profile', {
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
const getDrinks = async (type) => {
 try {
    const res = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/${type.id}.php`)
    removeAllChildren(directory)
    const allDrinks = res.data.drinks;
    // console.log(res.data);
    allDrinks.forEach((drink) => {
        const drinkName = drink.strDrink
        const drinkDiv = document.createElement('div')
        drinkDiv.classList.add('drink')
        drinkDiv.setAttribute('id', drink.idDrink)
        drinkDiv.innerHTML = drinkName
        directory.append(drinkDiv)
    })
    getPageDrinks()
 } catch (error) {
     console.log(error);
 }
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
    displayIngredients([ingredients])
    sendDrink(id)
    currentLocation.innerHTML = name
}
//creates divs for all ingredients
const displayIngredients = ([ingredients]) => {
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
//TO DO  - findOrCreate
const sendDrink = async (id) => {
    try {
        const theDrink = id
        const response = await axios.post('http://localhost:3001/cocktails', {
            webId: theDrink
            })
        createSaveButton(response)
    } catch (error) {
      console.log(error);
    }
}

//makes save button and adds event listener to it
const createSaveButton = (response) => {
    const saveDrink = document.createElement('div')
    saveDrink.classList.add('save')
    saveDrink.innerHTML = "Save Drink"
    directory.append(saveDrink)
    saveDrink.addEventListener('click', () => {
        handleSave(response)
    })
}

//sends info to back end and adds column to userCocktails
const handleSave = async (response) => {
    try {
        const drinkId = response.data.newCocktail.id
        const save = await axios.put('http://localhost:3001/users/save', {
            userId: localStorage.getItem('userId'),
            drinkId: drinkId
        })
    } catch (error) {
        console.log(error);
    }
}

//gets all saved drinks and creates a div for each displaying its name
const getSavedDrinks = async () => {
    removeAllChildren(directory)
    try {
        const res = await axios.get('http://localhost:3001/cocktails/saved')
        const savedDrinks = res.data
        savedDrinks.forEach(async (drink) => {
        const info = await axios.get(`https://thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drink}`);
        const nameDiv = document.createElement('div')
        nameDiv.classList.add('name')
        nameDiv.setAttribute('id', drink)
        nameDiv.innerHTML = info.data.drinks[0].strDrink
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

// LOGGED IN SCREEN EVENTLISTENERS
    
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        
        const theLink = event.target.id
        if(theLink === "popular"){
            getDrinks(popular)
            currentLocation.innerHTML = "Popular Drinks"
        }else if(theLink === "recent"){
            getDrinks(recent)
            currentLocation.innerHTML = "Most Recent Drinks"
        }else if(theLink === "spirits"){
            currentLocation.innerHTML = "Spirits"
        }else if(theLink === "saved"){
            getSavedDrinks()
            currentLocation.innerHTML = "Favorite Drinks"
        }else if(theLink === "create"){
            currentLocation.innerHTML = "Add New Drink"
        }else if(theLink === "logout"){
            displayLoggedOut();
            homeNav.classList.remove('hidden');
            loginArea.classList.add('hidden');
            signUpArea.classList.add('hidden');
            localStorage.removeItem('userId');
        }
    })
})







const checkStorage = () => { 
if(localStorage.getItem('userId')){
    getProfile()
    displayLoggedIn()
}else{
    displayLoggedOut()
}}
checkStorage()