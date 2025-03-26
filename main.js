import { createGroceryItem } from "./utils/createGroceryItem.js";
import { getDataFromLocalStorage } from "./utils/storageManagement/getDataFromLocalStorage.js";
import { setupLocalStorage } from "./utils/storageManagement/setupLocalStorage.js";
import { localStorageKeys } from "./constants/localStorageKeys.js";
import { setDataToLocalStorage } from "./utils/storageManagement/setDataToLocalStorage.js";
import { store } from "./storage/store.js";
import { displayExistingGroceries } from "./utils/displayExistingGroceries.js";
import { rerenderGroceryList } from "./utils/rerenderGroceryList.js";
import { onGroceryListChange } from "./utils/onGroceryListChange.js";
import { removeGroceriesFromUI } from "./utils/removeGroceriesFromUI.js";

setupLocalStorage();
displayExistingGroceries();
onGroceryListChange();

const addGroceryBtn = document.querySelector("#add");
const groceryInput = document.querySelector("#grocery-input");
const removeAllBtn = document.querySelector(".remove-all");
const categoryDropdown = document.querySelector("#category");
const filterByDropdown = document.querySelector("#filter-by");

addGroceryBtn.addEventListener("click", () => {
  const groceries = getDataFromLocalStorage(localStorageKeys.groceries) || [];
  const groceryName = groceryInput.value.trim();

  if (!groceryName) {
    alert("Please enter a grocery item!");
    return;
  }

  if (Number.isInteger(store.editableGroceryIndex)) {
    const editableGrocery = groceries[store.editableGroceryIndex];
    groceries[store.editableGroceryIndex] = {
      ...editableGrocery,
      name: groceryName,
      category: categoryDropdown.value,
    };
    addGroceryBtn.textContent = "Add";
    store.editableGroceryIndex = undefined;
  } else {
    groceries.push({
      id: Math.random(),
      category: categoryDropdown.value,
      name: groceryName,
    });
  }

  groceryInput.value = "";
  groceryInput.focus();

  groceries.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  setDataToLocalStorage(localStorageKeys.groceries, groceries);
  rerenderGroceryList();
});

filterByDropdown.addEventListener("change", () => {
  if (filterByDropdown.value === "all") {
    rerenderGroceryList();
    return;
  }

  const groceries = getDataFromLocalStorage(localStorageKeys.groceries);
  const groceriesByCategory = groceries
    .filter((grocery) => grocery.category === filterByDropdown.value)
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  removeGroceriesFromUI();
  groceriesByCategory.forEach((grocery) => {
    createGroceryItem(grocery);
  });

  if (groceriesByCategory.length) {
    removeAllBtn.removeAttribute("disabled");
  } else {
    removeAllBtn.setAttribute("disabled", true);
  }
});

removeAllBtn.addEventListener("click", () => {
  setDataToLocalStorage(localStorageKeys.groceries, []);
  rerenderGroceryList();
});
