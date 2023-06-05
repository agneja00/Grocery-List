import { displayExistingGroceries } from "./displayExistingGroceries.js";
import { removeGroceriesFromUI } from "./removeGroceriesFromUI.js";
import { onGroceryListChange } from "./onGroceryListChange.js";

export const rerenderGroceryList = () => {
    removeGroceriesFromUI();
    displayExistingGroceries();
    onGroceryListChange();
};
