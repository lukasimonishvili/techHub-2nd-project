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
        friends: [
            {
                name: "beqa",
                lastName: "revazishvili",
                chat: []
            }
        ],
        profilePicture: [],
        coverPicture: [],
    }
]


let Users = {
    storage: JSON.parse(localStorage.getItem("users")),
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
    }
}
Users.check();