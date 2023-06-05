export const setDataToLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};