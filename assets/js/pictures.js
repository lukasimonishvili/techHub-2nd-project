let Pictures = {
    userIndex: localStorage.getItem("userIndex"),
    profile: document.getElementById("profilePicture"),
    headerProfile: document.getElementById("headerProfilePicture"),
    cover: document.getElementById("cover"),
    makePostProfile: document.getElementById("makePostProfile"),
    headerName: document.getElementById("headerName"),
    drawName: function(){
        Pictures.headerName.innerHTML = Users.storage[Pictures.userIndex].name + " " + Users.storage[Pictures.userIndex].lastName;
    },
    starterProfile: function(imgSrc){
        let element = document.createElement("img");
        element.src = imgSrc;
        return element;
    },
    renderProfile: function(){
        if(Users.storage[Pictures.userIndex].profilePicture.length === 0){
            if(Users.storage[Pictures.userIndex].gender == "Female"){
                Users.storage[Pictures.userIndex].profilePicture.push("https://scontent.fgyd4-2.fna.fbcdn.net/v/t31.0-1/c282.0.960.960a/p960x960/1402926_10150004552801901_469209496895221757_o.jpg?_nc_cat=1&_nc_ht=scontent.fgyd4-2.fna&oh=10922c8e96a492b8ffb27dc29c14b7bf&oe=5CC1EE52");
                Users.resetStorage();
                Pictures.profile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
                Pictures.headerProfile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
                Pictures.makePostProfile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
            }else if(Users.storage[Pictures.userIndex].gender == "Male"){
                Users.storage[Pictures.userIndex].profilePicture.push("https://scontent.fgyd4-2.fna.fbcdn.net/v/t31.0-1/c282.0.960.960a/p960x960/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&_nc_ht=scontent.fgyd4-2.fna&oh=33ec19f96e1ecb32d33ce930644e333e&oe=5CCA7569");
                Users.resetStorage();
                Pictures.profile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
                Pictures.headerProfile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
                Pictures.makePostProfile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
            }
        }else{
            Pictures.profile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
            Pictures.headerProfile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
            Pictures.makePostProfile.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1]));
        }
    },
    renderCover: function(){
        if(Users.storage[Pictures.userIndex].coverPicture.length == 0){
            Pictures.cover.innerHTML = "";
        }else{
            Pictures.cover.appendChild(Pictures.starterProfile(Users.storage[Pictures.userIndex].coverPicture[Users.storage[Pictures.userIndex].coverPicture.length - 1]));
        }
    },
    checkProfile: function(){
        let picture = Pictures.profile.childNodes[0];
        picture.addEventListener("error", function(){
            Users.storage[Pictures.userIndex].profilePicture.pop();
            Users.resetStorage();
            Pictures.profile.innerHTML = "";
            Pictures.headerProfile.innerHTML = "";
            Pictures.makePostProfile.innerHTML = "";
            Pictures.renderProfile();
            alert("Wrong image adress, please try again");
        });
    },
    checkCover: function(){
        let coverPicture = Pictures.cover.childNodes[0];
        coverPicture.addEventListener("error", function(){
            Users.storage[Pictures.userIndex].coverPicture.pop();
            Users.resetStorage();
            Pictures.cover.innerHTML = "";
            Pictures.renderCover();
            alert("Wrong image adress, please try again");
        });
    },
    changePostProfile: function(){
        for(let i = 0; i < Statuses.storage.length; i++){
            if(Statuses.storage[i].eMail == Users.storage[Pictures.userIndex].eMail){
                Statuses.storage[i].profilePicture = Users.storage[Pictures.userIndex].profilePicture[Users.storage[Pictures.userIndex].profilePicture.length - 1];
                Statuses.resetStorage();
                Posts.draw();
            }
        }
    },
    changeProfile: function(){
        Pictures.profile.addEventListener("click", function(){
            let element = prompt("Enter profile link");
            Users.storage[Pictures.userIndex].profilePicture.push(element);
            Users.resetStorage();
            Pictures.profile.innerHTML = "";
            Pictures.headerProfile.innerHTML = "";
            Pictures.makePostProfile.innerHTML = "";
            Pictures.renderProfile();
            Pictures.checkProfile();
            Pictures.changePostProfile();
            Pictures.changeForFriends();
        });
        Pictures.cover.addEventListener("click", function(){
            let element = prompt("Enter cover link");
            Users.storage[Pictures.userIndex].coverPicture.push(element);
            Users.resetStorage();
            Pictures.cover.innerHTML = "";
            Pictures.renderCover();
            Pictures.checkCover();
        });
    },
}
Pictures.drawName();
Pictures.renderProfile();
Pictures.renderCover();
Pictures.changeProfile();