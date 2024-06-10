// Assignment 11
// Login System

var user = {name:'', email:'', password:''};
var userList = [];
var userLogged
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var incorrect = document.getElementById('incorrect');
var username = document.getElementById('username');

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

var passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
// /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/


function login(){
    if(signinEmail.value == '' || signinPassword.value == ''){
        incorrect.innerHTML = 'All inputs is required';
        }else if(!emailRegex.test(signinEmail.value)){
            incorrect.innerHTML = 'invalid email';
        }else if(!passwordRegex.test(signinPassword.value)){
            incorrect.innerHTML = 'invalid password';
        }else{
            for (let i = 0; i < userList.length; i++) {
                if(userList[i].email == signinEmail.value && userList[i].password == signinPassword.value){
                    user = {
                        name: userList[i].name,
                        email: userList[i].email,
                        password: userList[i].password
                    };

                    userLogged = [user];
                    localStorage.setItem('userLogged', JSON.stringify(userLogged));
                    location.replace("home.html");
                }else if(userList[i].email == signinEmail.value && userList[i].password != signinPassword.value){
                    incorrect.innerHTML = 'incorrect password';
                }
            }
            incorrect.innerHTML = 'email not register';
        }
}

var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var exist = document.getElementById('exist');

function signUp(){
    if(signupName.value == '' || signupEmail.value == '' || signupPassword.value == ''){
        exist.innerHTML = 'All inputs is required';
        }else if(!emailRegex.test(signupEmail.value)){
            exist.innerHTML = 'invalid email';
        }else if(!passwordRegex.test(signupPassword.value)){
            exist.innerHTML = 'invalid password';
        }else{
            var emailRegisted = 0
            for (let i = 0; i < userList.length; i++) {
                if(userList[i].email == signupEmail.value){
                    exist.innerHTML = 'email is register';
                    emailRegisted = 1;
                    break;
                }
            }
            if(emailRegisted == 0){
                user = {
                    name: signupName.value.trim(),
                    email: signupEmail.value.trim(),
                    password: signupPassword.value.trim()
                };
                
                userList.push(user);
                localStorage.setItem('userList', JSON.stringify(userList));
                exist.innerHTML = 'Success';
                setTimeout(function (){location.replace("index.html");},2000);
            }
        }
}

(function(){
    if(localStorage.getItem('userList') === null){
        userList = [];
    }else{
        userList = JSON.parse(localStorage.getItem('userList'));
    }
})()

function welcome(){
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
    username.innerHTML = 'Welcome ' + userLogged[0].name;
}

function logout(){
    userLogged = [];
    localStorage.removeItem('userLogged');
    signinEmail.value = '';
    signinPassword.value = '';
}