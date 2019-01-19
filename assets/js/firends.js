let Friends = {
    box: document.getElementById("chatBox"),
    selfRemove: function(){
        for(let i = 0; i < Users.storage[Pictures.userIndex].friends.length; i++){
            if(Users.storage[Pictures.userIndex].eMail == Users.storage[Pictures.userIndex].friends[i].eMail){
                Users.storage[Pictures.userIndex].friends.splice(i, 1);
                Users.resetStorage();
            }
        }
    },
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
            Friends.box.appendChild(Friends.structure(Users.storage[Pictures.userIndex].friends[i].profilePicture, Users.storage[Pictures.userIndex].friends[i].name + " " + Users.storage[Pictures.userIndex].friends[i].lastName, Users.storage[Pictures.userIndex].friends[i].eMail));
        }
    },
}
Friends.selfRemove();
Friends.drawList();