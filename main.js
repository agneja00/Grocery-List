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
import { setupDarkModeToggle } from "./utils/setupDarkModeToggle.js";
import { toggleRemoveAllBtnState } from "./utils/toggleRemoveAllBtnState.js";
import { updateProgressBar } from "./utils/updateProgressBar.js";

setupDarkModeToggle();
setupLocalStorage();
displayExistingGroceries();
onGroceryListChange();
toggleRemoveAllBtnState();
updateProgressBar();

const addGroceryBtn = document.querySelector("#add");
const groceryInput = document.querySelector("#grocery-input");
const removeAllBtn = document.querySelector(".remove-all");
const categoryDropdown = document.querySelector("#category");
const filterByDropdown = document.querySelector("#filter-by");

addGroceryBtn.addEventListener("click", () => {
  const groceries = getDataFromLocalStorage(localStorageKeys.groceries) || [];
  const groceryName = groceryInput.value.trim();

  if (!groceryName) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please enter a grocery item!",
      confirmButtonColor: "#3498db",
    });
    return;
  }

  if (
    groceries.some(
      (item) => item.name.toLowerCase() === groceryName.toLowerCase()
    )
  ) {
    Swal.fire({
      icon: "info",
      title: "Duplicate Item",
      text: "This item is already in your grocery list!",
      confirmButtonColor: "#f39c12",
    });
    return;
  }

  if (Number.isInteger(store.editableGroceryIndex)) {
    groceries[store.editableGroceryIndex].name = groceryName;
    groceries[store.editableGroceryIndex].category = categoryDropdown.value;
    groceries[store.editableGroceryIndex].purchased =
      groceries[store.editableGroceryIndex].purchased || false;
    addGroceryBtn.textContent = "Add";
    store.editableGroceryIndex = undefined;

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Your grocery item has been updated.",
      confirmButtonColor: "#2ecc71",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    groceries.push({
      id: Math.random(),
      category: categoryDropdown.value,
      name: groceryName,
      purchased: false,
    });

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `"${groceryName}" has been added to your grocery list.`,
      confirmButtonColor: "#2ecc71",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  groceryInput.value = "";
  groceryInput.focus();

  groceries.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  setDataToLocalStorage(localStorageKeys.groceries, groceries);
  rerenderGroceryList();
  toggleRemoveAllBtnState();
  updateProgressBar();
});

filterByDropdown.addEventListener("change", () => {
  if (filterByDropdown.value === "all") {
    rerenderGroceryList();
    toggleRemoveAllBtnState();
    updateProgressBar();
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

  toggleRemoveAllBtnState();
  updateProgressBar();
});

removeAllBtn.addEventListener("click", () => {
  setDataToLocalStorage(localStorageKeys.groceries, []);
  rerenderGroceryList();
  toggleRemoveAllBtnState();
  updateProgressBar();
});
