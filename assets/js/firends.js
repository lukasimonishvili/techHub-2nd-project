let Friends = {
    box: document.getElementById("chatBox"),
    loginedCount: localStorage.getItem("loginedCount"),
    structure: function(profileSrc, chatName, chatMail){
        let chatItem = document.createElement("div");
        chatItem.classList.add("chat__item");
        let chatImg = document.createElement("img");
        chatImg.classList.add("chat__img");
        chatImg.src = profileSrc;
        let hiddenMail = document.createElement("p");
        hiddenMail.style.display = "none";
        hiddenMail.innerHTML = chatMail;
        chatItem.appendChild(hiddenMail);
        chatItem.appendChild(chatImg);
        let nameLastName = document.createElement("p");
        nameLastName.classList.add("chat__name");
        nameLastName.innerHTML = chatName;
        chatItem.appendChild(nameLastName);
        chatActive = document.createElement("div");
        chatActive.classList.add("chat__active");
        chatItem.appendChild(chatActive);
        return chatItem;
    },
    drawList: function(){
        for(let i = 0; i < Users.storage[Pictures.userIndex].friends.length; i++){
            Friends.box.appendChild(Friends.structure(Users.storage[i].profilePicture[Users.storage[i].profilePicture.length - 1], Users.storage[Pictures.userIndex].friends[i].name + " " + Users.storage[Pictures.userIndex].friends[i].lastName, Users.storage[Pictures.userIndex].friends[i].eMail));
        }
    },
    changeForFriends(){
        for(let i = 0; i < Users.storage.length; i++){
            if(Users.storage[Pictures.userIndex].eMail == Users.storage[i].eMail){
                continue;
            }else{
                for(let p = 0; p < Users.storage[i].friends.length; p++){
                    if(Users.storage[i].eMail !== Users.storage[i].friends[p].eMail){
                        continue;
                        
                    }else{
                        Users.storage[i].friends[p].profilePicture = Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1];
                        Users.resetStorage();
                        Friends.drawList();
                    }
                }
            }
        }
    },
}
Friends.drawList();