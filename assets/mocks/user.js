let indexZeroUser = [
    {
        name: "luka",
        lastName: "simonishvili",
        eMail: "luka",
        password: "luka",
        birthDay: {
            year: "1998",
            month: "may",
            day: "11"
        },
        gender: "Male",
        friends: [],
        profilePicture: [],
        coverPicture: [],
    }
]


let Users = {
    storage: JSON.parse(localStorage.getItem("users")),
    userIndex: localStorage.getItem("userIndex"),
    friendList: [],
    check: function(){
        if(Users.storage == null){
            let starterStorage = [];
            starterStorage.push(indexZeroUser[0]);
            localStorage.setItem("users", JSON.stringify(starterStorage));
            Users.storage = JSON.parse(localStorage.getItem("users"));
        }
    },
    resetStorage: function(){
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(Users.storage));
    },
    allForOne: function(){
        for(let k = 0; k < Users.storage.length; k++){
            var profileSrc = "";
            if(Users.storage[k].profilePicture.length > 0){
                profileSrc = Users.storage[k].profilePicture[Users.storage[k].profilePicture.length - 1];
            }
            Users.friendList.push(
                {
                    name: Users.storage[k].name,
                    lastName: Users.storage[k].lastName,
                    eMail: Users.storage[k].eMail,
                    chat: [],
                    profilePicture: profileSrc,
                }
            )
        };
        return Users.friendList;
    },
    friendsRender: function(){
        for(let i = 0; i < Users.storage.length; i++){
            Users.storage[i].friends = Users.allForOne();
            Users.friendList = [];
            Users.resetStorage();
        }
    }
}
Users.check();
Users.friendsRender();