"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector(".main-container");
const myCustomFetcher = async (url, obj) => {
    const res = await fetch(url, obj);
    if (!res.ok) {
        throw new Error("Data error");
    }
    const data = await res.json();
    return data;
};
const showResult = (singleUser) => {
    mainContainer.insertAdjacentHTML("beforeend", `<div class="card">
    <img src="${singleUser.avatar_url}" alt="${singleUser.login}"/>
    </hr>
    <div class="card-footer">
    <img src="${singleUser.avatar_url}" alt="${singleUser.login}"/>
    <a href="${singleUser.url}"> Github </a>
    </div>
    </div>`);
};
const fetchUserData = (url) => {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResult(singleUser);
        }
    });
};
fetchUserData("https://api.github.com/users");
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUser = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        mainContainer.innerHTML = "";
        if (matchingUser.length === 0) {
            mainContainer?.insertAdjacentHTML("beforeend", `<P class="empty-msg">No matching users found.</P>`);
        }
        else {
            for (const singleUser of matchingUser)
                showResult(singleUser);
        }
    }
    catch (error) {
        throw new Error("something wrong in search Functionality");
    }
});
