let Statuses = {
    storage: JSON.parse(localStorage.getItem("posts")),
    check: function(){
        if(Statuses.storage == null){
            let starterArr = [];
            localStorage.setItem("posts", JSON.stringify(starterArr));
        }
    },
    resetStorage: function(){
        localStorage.removeItem("posts");
        localStorage.setItem("posts", JSON.stringify(Statuses.storage));
    }
}
Statuses.check();