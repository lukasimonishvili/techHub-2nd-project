let Chat = {
    box: document.getElementById("messengerBox"),
    mainInput: document.getElementsByClassName("chat__messenger__box__input")[0],
    structure: function(messangeMail, messageProfileImg, txt){
        let messageItem = document.createElement("div");
        messageItem.classList.add("chat__messenger__box");
        let hiddenMail = document.createElement("P");
        hiddenMail.style.display = "none";
        hiddenMail.innerHTML = messangeMail;
        messageItem.appendChild(hiddenMail);
        let messageImg = document.createElement("img");
        messageImg.classList.add("chat__messenger__box__profile-picture");
        messageImg.src = messageProfileImg;
        messageItem.appendChild(messageImg);
        let messageName = document.createElement("p");
        messageName.classList.add("chat__messenger__box__name");
        messageName.innerHTML = txt;
        messageItem.appendChild(messageName);
        let closeChat = document.createElement("div");
        closeChat.classList.add("chat__messenger__box__close");
        messageItem.appendChild(closeChat);
        let chatArea = document.createElement("div");
        chatArea.classList.add("chat__messenger__box__texts");
        messageItem.appendChild(chatArea);
        let chatInput = document.createElement("input");
        chatInput.classList.add("chat__messenger__box__input");
        chatInput.type = "text";
        chatInput.placeholder = "type a message...";
        chatInput.id = "messageInput";
        messageItem.appendChild(chatInput);
        let messageSend = document.createElement("div");
        messageSend.classList.add("chat__messenger__box__send");
        messageItem.appendChild(messageSend);
        return messageItem;
    },
    drawMessages: function(){
        for(let y = 0; y < Users.storage[Pictures.userIndex].friends.length; y++){
            if(Users.storage[Pictures.userIndex].friends[y].chat.length > 0){
                for(var i = 0; i < Users.storage[Pictures.userIndex].friends.length; i++){
                    let openChatMail = document.getElementsByClassName("chat__messenger__box")[0].childNodes[0];
                    if(openChatMail.innerHTML == Users.storage[Pictures.userIndex].friends[i].eMail){
                        break;
                    }
                }
                let openChatFriend = Users.storage[Pictures.userIndex].friends[i].chat;
                document.getElementsByClassName("chat__messenger__box__texts")[0].innerHTML = "";
                for(let k = 0; k < openChatFriend.length; k++){
                    if(openChatFriend[k].content == ""){
                        openChatFriend.splice(k, 1);
                        Users.resetStorage();
                    }else{
                        if(openChatFriend[k].side == "left"){
                            let messageTextItem = document.createElement("p");
                            messageTextItem.classList.add("chat__messenger__box__texts__left");
                            messageTextItem.innerHTML = openChatFriend[k].content;
                            document.getElementsByClassName("chat__messenger__box__texts")[0].appendChild(messageTextItem);
                        }else if(openChatFriend[k].side == "right"){
                            let messageTextItem = document.createElement("p");
                            messageTextItem.classList.add("chat__messenger__box__texts__right");
                            messageTextItem.innerHTML = openChatFriend[k].content;
                            document.getElementsByClassName("chat__messenger__box__texts")[0].appendChild(messageTextItem);
                        }
                    }
                }
                Chat.openChat();
                break;
            }

        }
    },
    closeChat: function(){
        if(Chat.box.childElementCount > 0){
            let element = document.getElementsByClassName("chat__messenger__box__close")[0];
            element.addEventListener("click", function(){
            Chat.box.innerHTML = "";
        });
        }
    },
    newMessage: function(){
        document.getElementsByClassName("chat__messenger__box__send")[0].addEventListener("click", function(){
            for(var i = 0; i < Users.storage[Pictures.userIndex].friends.length; i++){
                let openChatMail = document.getElementsByClassName("chat__messenger__box")[0].childNodes[0];
                if(openChatMail.innerHTML == Users.storage[Pictures.userIndex].friends[i].eMail){
                    break;
                }
            }
            let friendIndex = Users.storage[Pictures.userIndex].friends[i];
            friendIndex.chat.push(
                {
                    side: "right",
                    content: document.getElementById("messageInput").value,
                }
            );
            Users.resetStorage();
            for(let j = 0; j < Users.storage.length; j++){
                if(Users.storage[j].eMail == friendIndex.eMail){
                    for(var l = 0; l < Users.storage[j].friends.length; l++){
                        if(Users.storage[j].friends[l].eMail == Users.storage[Pictures.userIndex].eMail){
                            Users.storage[j].friends[l].chat.push(
                                {
                                    side: "left",
                                    content: document.getElementById("messageInput").value,
                                }
                            );
                            Users.resetStorage();
                            break;
                        }
                    }
                    break;
                }
            }
            document.getElementById("messageInput").value = "";
            Chat.drawMessages();
        });
    },
    openChat: function(){
        let element = document.getElementsByClassName("chat__item");
        for(let i = 0; i < element.length; i++){
            element[i].addEventListener("click", function(){
                if(Chat.box.childElementCount > 0){
                    Chat.box.innerHTML = "";
                    Chat.box.appendChild(Chat.structure(this.childNodes[0].innerHTML, this.childNodes[1].src, this.childNodes[2].innerHTML));
                    Chat.drawMessages();
                    Chat.closeChat();
                    Chat.newMessage();
                }else{
                    Chat.box.appendChild(Chat.structure(this.childNodes[0].innerHTML, this.childNodes[1].src, this.childNodes[2].innerHTML));
                    Chat.drawMessages();
                    Chat.closeChat();
                    Chat.newMessage();
                }
            });
        }
    },
}
Chat.openChat();