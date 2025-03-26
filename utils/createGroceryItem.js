import { localStorageKeys } from "../constants/localStorageKeys.js";
import { store } from "../storage/store.js";
import { getGroceryIndex } from "./getEditableGroceryIndex.js";
import { onGroceryListChange } from "./onGroceryListChange.js";
import { rerenderGroceryList } from "./rerenderGroceryList.js";
import { getDataFromLocalStorage } from "./storageManagement/getDataFromLocalStorage.js";
import { setDataToLocalStorage } from "./storageManagement/setDataToLocalStorage.js";

const groceriesListContainer = document.querySelector(".groceries");
const addGroceryBtn = document.querySelector("#add");
const groceryInput = document.querySelector("#grocery-input");
const categoryDropdown = document.querySelector("#category");

export const createGroceryItem = (grocery) => {
  const itemContainer = document.createElement("div");
  const nameParagraph = document.createElement("p");
  const actionsContainer = document.createElement("div");
  const editBtn = document.createElement("button");
  const editIcon = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("span");

  itemContainer.classList.add("grocery");
  nameParagraph.textContent = grocery.name;
  editBtn.classList.add("edit");
  editIcon.classList.add("material-symbols-outlined");
  editIcon.textContent = "edit";
  deleteBtn.classList.add("remove");
  deleteIcon.classList.add("material-symbols-outlined");
  deleteIcon.textContent = "delete";

  editBtn.addEventListener("click", () => {
    const editableGroceryIndex = getGroceryIndex(grocery.id);
    store.editableGroceryIndex = editableGroceryIndex;
    addGroceryBtn.textContent = "Edit";
    groceryInput.value = grocery.name;
    categoryDropdown.value = grocery.category;
  });
  deleteBtn.addEventListener("click", () => {
    const deletableGroceryIndex = getGroceryIndex(grocery.id);
    const groceries = getDataFromLocalStorage(localStorageKeys.groceries);

    if (deletableGroceryIndex !== null) {
      itemContainer.style.transition = "opacity 0.3s ease-out";
      itemContainer.style.opacity = "0";

      setTimeout(() => {
        groceries.splice(deletableGroceryIndex, 1);
        setDataToLocalStorage(localStorageKeys.groceries, groceries);
        rerenderGroceryList();
      }, 300);
    }

    onGroceryListChange();
  });

  editBtn.append(editIcon);
  deleteBtn.append(deleteIcon);
  actionsContainer.append(editBtn, deleteBtn);
  itemContainer.append(nameParagraph, actionsContainer);
  groceriesListContainer.append(itemContainer);
};
