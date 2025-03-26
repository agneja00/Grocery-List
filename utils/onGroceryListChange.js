import { localStorageKeys } from "../constants/localStorageKeys.js";
import { getDataFromLocalStorage } from "./storageManagement/getDataFromLocalStorage.js";

const removeAllBtn = document.querySelector(".remove-all");

export const onGroceryListChange = () => {
  const groceries = getDataFromLocalStorage(localStorageKeys.groceries);
  if (groceries.length) {
    removeAllBtn.removeAttribute("disabled");
  } else {
    removeAllBtn.setAttribute("disabled", true);
  }
};
