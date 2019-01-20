let Posts = {
    box: document.getElementById("postBox"),
    area: document.getElementById("newPost"),
    share: document.getElementById("share"),
    userIndex: localStorage.getItem("userIndex"),
    makeElement: function(elementName, styleClass, content){
        let element = document.createElement(elementName);
        element.classList.add(styleClass);
        element.innerHTML = content;
        return element;
    },
    makeImg: function(imgSrc){
        let element = document.createElement("img");
        element.classList.add("post__img");
        element.src = imgSrc;
        return element;
    },
    strucure: function(time, txt, userMail, profilePicture, author){
        let post = Posts.makeElement("div", "post", "");
        let hiddenMail = Posts.makeElement("p", "post__author", userMail);
        hiddenMail.style.display = "none";
        post.appendChild(hiddenMail);
        post.appendChild(Posts.makeImg(profilePicture));
        post.appendChild(Posts.makeElement("p", "post__author", author));
        post.appendChild(Posts.makeElement("p", "post__time", time));
        post.appendChild(Posts.makeElement("p", "post__content", txt));
        return post;
    },
    draw: function(){
        if(Statuses.storage !== null){
            Posts.box.innerHTML = "";
            for(let i = 0; i < Statuses.storage.length; i++){
                Posts.box.appendChild(Posts.strucure(Statuses.storage[i].date, Statuses.storage[i].content, Statuses.storage[i].eMail, Statuses.storage[i].profilePicture, Statuses.storage[i].author));
            }
        }
    },
    getPostDate: function(){
        let postTime = new Date();
        let postMonth = postTime.getMonth();
        switch(postMonth){
            case 0: postMonth = "January"; break;
            case 1: postMonth = "February"; break;
            case 2: postMonth = "March"; break;
            case 3: postMonth = "April"; break;
            case 4: postMonth = "May"; break;
            case 5: postMonth = "June"; break;
            case 6: postMonth = "July"; break;
            case 7: postMonth = "August"; break;
            case 8: postMonth = "September"; break;
            case 9: postMonth = "October"; break;
            case 10: postMonth = "November"; break;
            case 11: postMonth = "December"; break;
        }
        let postDay = postTime.getDate();
        let postminutes = postTime.getHours() + ":" + postTime.getMinutes();
        let renderedDate = postMonth + " " + postDay + " at " + postminutes;
        return renderedDate;
    },
    deletePost: function(){
        if(Statuses.storage.length == 1){
            let zeroIndexPost = Posts.box.childNodes[0];
            if(zeroIndexPost.childNodes[0].innerHTML == Users.storage[Posts.userIndex].eMail){
                Posts.box.childNodes[0].addEventListener("click", function(){
                    let answer = confirm("Are you shure you want delete this post?");
                    if(answer){
                        Statuses.storage = [];
                        Statuses.resetStorage();
                        window.location.replace("logined.html");
                    }
                });
            }
        }else{
            for(let i = 0; i < Posts.box.childElementCount; i++){
                let element = document.getElementsByClassName("post")[i];
                if(element.childNodes[0].innerHTML == Users.storage[Posts.userIndex].eMail){
                    element.addEventListener("click", function(){
                        let answer = confirm("Are you shure you want delete this post?");
                        if(answer){
                            Statuses.storage.splice(i, 1);
                            Statuses.resetStorage();
                            Posts.draw();
                            Posts.deletePost();
                        }
                    });
                }
            }
        }
    },
    new: function(){
        Posts.share.addEventListener("click", function(){
            if(Posts.area.value !== ""){
                Statuses.storage.push(
                    {
                        author: Users.storage[Posts.userIndex].name + " " + Users.storage[Posts.userIndex].lastName,
                        date: Posts.getPostDate(),
                        content: Posts.area.value,
                        eMail: Users.storage[Posts.userIndex].eMail,
                        profilePicture: Users.storage[Posts.userIndex].profilePicture[Users.storage[Posts.userIndex].profilePicture.length - 1],
                    }
                );
                Statuses.resetStorage();
                document.getElementById("newPost").value = "";
                Posts.draw();
                Posts.deletePost();
            }
        })
    },
}
Posts.draw();
Posts.new();
Posts.deletePost();