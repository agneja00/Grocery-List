import { store } from "../storage/store.js";
import { onGroceryListChange } from "./onGroceryListChange.js";
import { toggleRemoveAllBtnState } from "./toggleRemoveAllBtnState.js";
import { updateProgressBar } from "./updateProgressBar.js";

export function createGroceryItem(grocery) {
  const groceryList = document.querySelector(".groceries");

  const groceryEl = document.createElement("div");
  groceryEl.classList.add("grocery");

  if (grocery.purchased) {
    groceryEl.classList.add("purchased");
  }

  const label = document.createElement("label");
  label.style.display = "flex";
  label.style.alignItems = "center";
  label.style.gap = "0.5rem";
  label.style.flex = "1";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = grocery.purchased;
  checkbox.addEventListener("change", () => {
    grocery.purchased = checkbox.checked;

    const groceries = JSON.parse(localStorage.getItem("groceries")) || [];
    const index = groceries.findIndex((item) => item.id === grocery.id);
    if (index > -1) {
      groceries[index].purchased = grocery.purchased;
      localStorage.setItem("groceries", JSON.stringify(groceries));
    }

    groceryEl.classList.toggle("purchased", grocery.purchased);
    updateProgressBar();
  });

  const nameSpan = document.createElement("span");
  nameSpan.textContent = grocery.name;

  label.appendChild(checkbox);
  label.appendChild(nameSpan);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML = "✏️";
  editBtn.addEventListener("click", () => {
    document.querySelector("#grocery-input").value = grocery.name;
    document.querySelector("#category").value = grocery.category;
    document.querySelector("#add").textContent = "Update";
    const groceries = JSON.parse(localStorage.getItem("groceries")) || [];
    const index = groceries.findIndex((item) => item.id === grocery.id);
    store.editableGroceryIndex = index;
  });

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  removeBtn.innerHTML = "🗑️";
  removeBtn.addEventListener("click", () => {
    const groceries = JSON.parse(localStorage.getItem("groceries")) || [];
    const filtered = groceries.filter((item) => item.id !== grocery.id);
    localStorage.setItem("groceries", JSON.stringify(filtered));
    groceryEl.remove();
    onGroceryListChange();
    toggleRemoveAllBtnState();
    updateProgressBar();
  });

  actions.appendChild(editBtn);
  actions.appendChild(removeBtn);

  groceryEl.appendChild(label);
  groceryEl.appendChild(actions);
  groceryList.appendChild(groceryEl);
}
