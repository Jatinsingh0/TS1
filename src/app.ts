
const getUsername = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector(".form") as HTMLFormElement;
const mainContainer = document.querySelector(".main-container") as HTMLElement;

interface UserData {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
}


const myCustomFetcher = async <T>(url: string, obj?: RequestInit): Promise<T> => {
    const res = await fetch(url, obj);
    if(!res.ok){
        throw new Error("Data error")
    }
    const data = await res.json();
    return data;
}

const fetchUserData =(url: string) =>{
    myCustomFetcher<UserData[]>(url, {});
}


fetchUserData("https://api.github.com/users");