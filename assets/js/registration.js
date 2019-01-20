let Registration = {
    button: document.getElementById("registration"),
    mail: document.getElementById("mail"),
    mailCheck: true,
    name: document.getElementById("name"),
    lastName: document.getElementById("lastName"),
    birthYear: document.getElementById("year"),
    birthMonth: document.getElementById("month"),
    birthDay: document.getElementById("day"),
    gender: "",
    friendList: [],
    clearInputs: function(){
        Registration.name.value = "";
        Registration.lastName.value = "";
        Registration.mail.value = "";
        Registration.password.value = "";
        Registration.birthYear.value = "Year";
        Registration.birthMonth.value = "Month";
        Registration.birthDay.value = "Day"
    },
    genderRender: function(){
        let element = document.getElementsByName("gender");
        for(let i = 0; i < element.length; i++){
            if(element[i].checked){
                Registration.gender = element[i].value;
                break;
            }
        }
    },
    allForOne: function(){
        for(let k = 0; k < Users.storage.length; k++){
            var profileSrc = "";
            if(Users.storage[k].profilePicture.length > 0){
                profileSrc = Users.storage[k].profilePicture[Users.storage[k].profilePicture.length - 1];
            }
            Registration.friendList.push(
                {
                    name: Users.storage[k].name,
                    lastName: Users.storage[k].lastName,
                    eMail: Users.storage[k].eMail,
                    chat: [],
                    profilePicture: profileSrc,
                }
            );
        };
        return Registration.friendList;
    },
    addforNewObject: function(){
        Users.storage[Users.storage.length - 1].friends = Registration.allForOne();
        Users.resetStorage();
        Registration.friendList = [];
    },
    addNewforAll: function(){
        var profileSrc = "";
        if(Users.storage[Users.storage.length - 1].profilePicture.length > 0){
            profileSrc = Users.storage[Users.storage.length - 1].profilePicture[Users.storage[Users.storage.length - 1].profilePicture.length - 1];
        }
        for(let i = 0; i < Users.storage.length - 1; i++){
            Users.storage[i].friends.push(
                {
                    name: Users.storage[Users.storage.length - 1].name,
                    lastName: Users.storage[Users.storage.length - 1].lastName,
                    eMail: Users.storage[Users.storage.length - 1].eMail,
                    chat: [],
                    profilePicture: profileSrc,
                }
            );
            Users.resetStorage();
        }
    },
    password: document.getElementById("password"),
    action: function(){
        let item = Registration.button;
        item.addEventListener("click", function(){
            Registration.genderRender();
            for(let i = 0; i < Users.storage.length; i++){
                if(Registration.mail.value == Users.storage[i].eMail){
                   Registration.mailCheck = false;
                   break;
                }
            }
            if(Registration.mailCheck !== false){
                Users.storage.push(
                    {
                        name: Registration.name.value,
                        lastName: Registration.lastName.value,
                        eMail: Registration.mail.value,
                        password: Registration.password.value,
                        birthDay: {
                            year: Registration.birthYear.value,
                            month: Registration.birthMonth.value,
                            day: Registration.birthDay.value
                        },
                        gender: Registration.gender,
                        friends: [],
                        profilePicture: [],
                        coverPicture: [],
                    }
                );
                Registration.mailCheck = true;
                Registration.addforNewObject();
                Registration.addNewforAll();
                Users.resetStorage();
                Registration.clearInputs();
                alert("You are now registred");
            }else{
                alert("registration went wrong");
                Registration.clearInputs();
            }
        });
    }
}
Registration.action();