var user='root';
var pass='root';

function Login(){
    userLogin = document.getElementById('username').value;
    userPassword = document.getElementById('password').value;
    
    if(userLogin == user && userPassword == pass){
        console.log('valid user');
        document.getElementById('warnings').innerHTML = 'valid user, you may enter';
        window.location.href = "main.html";
    } 
    
    else {
        console.log('invalid user');
        document.getElementById('warnings').innerHTML = 'INVALID LOGIN';
    }
}