export const getDataFromLocalStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
};