//HTML ELEMENTS

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

//HOMESCREEN FUNCTIONS

//sends text from login form and posts it to the backend / backend verifys info and sends back user info or error if info is wrong 

// TO DO 1
const handleLogin = async () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email: email,
        password: password
      })
      const userId = response.data.user.id
    //   localStorage.setItem('userId', userId)
    console.log(userId);
    } catch (error) {
      console.log(error);
    }
}


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
    } catch (error) {
      console.log(error);
    }
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
//adds event listener to log in form and calls login function
loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    handleLogin()
})
//adds event listener to sign up form and calls sign up function
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault()
    handleSignUp()
})

























//logged in screen


const popular = document.querySelector('#popular');
const directory = document.querySelector('#directory');
const currentLocation = document.querySelector('.title');

const getPopularDrinks = async () => {
    const res = await axios.get('https://thecocktaildb.com/api/json/v2/9973533/popular.php')
    // console.log(res.data.drinks);
    currentLocation.innerHTML = "Popular Drinks"
    const allDrinks = res.data.drinks;
    allDrinks.forEach(function(drink){
        const drinkName = drink.strDrink
        const drinkDiv = document.createElement('div')
        drinkDiv.classList.add('drink')
        drinkDiv.innerHTML = drinkName
        directory.append(drinkDiv)

    })
}



popular.addEventListener('click',() =>{
    getPopularDrinks()
})