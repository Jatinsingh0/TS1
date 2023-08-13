"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector(".form");
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
            console.log("login" + singleUser.id);
        }
    });
};
fetchUserData("https://api.github.com/users");
