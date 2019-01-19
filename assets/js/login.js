let LogIn = {
    button: document.getElementById("logInButton"),
    mail: document.getElementById("logInMail"),
    password: document.getElementById("logInPassword"),
    logOut: document.getElementById("logOut"),
    mailStatus: false,
    passwordStatus: false,
    userIndex: 0,
    clearInputs: function(){
        LogIn.mail.value = "";
        LogIn.password.value = "";
    },
    action: function(){
        LogIn.button.addEventListener("click", function(){
            for(let i = 0; i < Users.storage.length; i++){
                if(LogIn.mail.value == Users.storage[i].eMail){
                    LogIn.mailStatus = true;
                    LogIn.userIndex = i;
                    break;
                }
            }
            if(LogIn.password.value == Users.storage[LogIn.userIndex].password){
                LogIn.passwordStatus = true;
            }
            if(LogIn.mailStatus == true && LogIn.passwordStatus == true){
                window.location.replace("logined.html");
                LogIn.passwordStatus = false;
                LogIn.mailStatus = false;
                localStorage.setItem("userIndex", LogIn.userIndex);
                LogIn.clearInputs();
            }else{
                alert("Wrong mail or password");
                LogIn.clearInputs();
            }
        });
    },
}
LogIn.action();