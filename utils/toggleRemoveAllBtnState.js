import { getDataFromLocalStorage } from "./storageManagement/getDataFromLocalStorage.js";
import { localStorageKeys } from "../constants/localStorageKeys.js";

export function toggleRemoveAllBtnState() {
  const groceries = getDataFromLocalStorage(localStorageKeys.groceries) || [];
  const removeAllBtn = document.querySelector(".remove-all");

  if (groceries.length === 0) {
    removeAllBtn.setAttribute("disabled", true);
  } else {
    removeAllBtn.removeAttribute("disabled");
  }
}
