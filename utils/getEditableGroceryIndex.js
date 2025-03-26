import { localStorageKeys } from "../constants/localStorageKeys.js";
import { getDataFromLocalStorage } from "./storageManagement/getDataFromLocalStorage.js";

export const getGroceryIndex = (groceryId) => {
  const groceries = getDataFromLocalStorage(localStorageKeys.groceries);

  return groceries.findIndex(
    (groceryFromLocalStorage) => groceryFromLocalStorage.id === groceryId
  );
};
