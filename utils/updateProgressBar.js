import { localStorageKeys } from "../constants/localStorageKeys.js";
import { getDataFromLocalStorage } from "./storageManagement/getDataFromLocalStorage.js";

export function updateProgressBar() {
  const groceries = getDataFromLocalStorage(localStorageKeys.groceries) || [];

  const total = groceries.length;
  const purchased = groceries.filter((item) => item.purchased).length;

  const percent = total > 0 ? Math.round((purchased / total) * 100) : 0;

  document.querySelector(".progress-fill").style.width = `${percent}%`;
  document.querySelector(".progress-percentage").textContent = `${percent}%`;
}
