import { localStorageKeys } from "../constants/localStorageKeys.js";
import { createGroceryItem } from "./createGroceryItem.js";
import { getDataFromLocalStorage } from "./storageManagement/getDataFromLocalStorage.js";

export const displayExistingGroceries = () => {
  const groceriesFromLocalStorage =
    getDataFromLocalStorage(localStorageKeys.groceries) || [];
  groceriesFromLocalStorage.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  groceriesFromLocalStorage.forEach((grocery) => {
    createGroceryItem(grocery);
  });
};
