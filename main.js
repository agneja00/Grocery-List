import { createGroceryItem } from './utils/createGroceryItem.js';
import { getDataFromLocalStorage } from './utils/storageManagement/getDataFromLocalStorage.js';
import { setupLocalStorage } from './utils/storageManagement/setupLocalStorage.js';
import { localStorageKeys } from './constants/localStorageKeys.js';
import { setDataToLocalStorage } from './utils/storageManagement/setDataToLocalStorage.js';
import { store } from './storage/store.js';
import { displayExistingGroceries } from './utils/displayExistingGroceries.js';
import { rerenderGroceryList } from './utils/rerenderGroceryList.js';
import { onGroceryListChange } from './utils/onGroceryListChange.js';
import { removeGroceriesFromUI } from './utils/removeGroceriesFromUI.js';

setupLocalStorage();
displayExistingGroceries();
onGroceryListChange();

const addGroceryBtn = document.querySelector('#add');
const groceryInput = document.querySelector('#grocery-input');
const removeAllBtn = document.querySelector('.remove-all');
const categoryDropdown = document.querySelector('#category');
const filterByDropdown = document.querySelector('#filter-by');

addGroceryBtn.addEventListener('click', () => {
    const groceries = getDataFromLocalStorage(localStorageKeys.groceries);
    if (Number.isInteger(store.editableGroceryIndex)) {
        const editableGrocery = groceries[store.editableGroceryIndex];
        groceries[store.editableGroceryIndex] = { ...editableGrocery, name: groceryInput.value, category: categoryDropdown.value };
        addGroceryBtn.textContent = 'Add';
        groceryInput.value = '';
        store.editableGroceryIndex = undefined;
        setDataToLocalStorage(localStorageKeys.groceries, groceries);
        rerenderGroceryList();
    } else if (groceryInput.value !== "") {
        const grocery = {
            id: Math.random(),
            category: categoryDropdown.value,
            name: groceryInput.value,
        };
        groceryInput.value = '';
        createGroceryItem(grocery);
        setDataToLocalStorage(localStorageKeys.groceries, [...groceries, grocery]);
        onGroceryListChange();
    };
});

filterByDropdown.addEventListener('change', () => {
    if (filterByDropdown.value === 'all') {
        rerenderGroceryList();
        return;
    };

    const groceries = getDataFromLocalStorage(localStorageKeys.groceries);
    const groceriesByCategory = groceries.filter((grocery) => {
        return grocery.category === filterByDropdown.value;
    });

    removeGroceriesFromUI();
    groceriesByCategory.forEach((grocery) => {
        createGroceryItem(grocery);
    })

    if (groceriesByCategory.length) {
        console.log(groceriesByCategory.length)
        removeAllBtn.removeAttribute("disabled");
    }
    else {
        removeAllBtn.setAttribute('disabled', true);
    }
});

removeAllBtn.addEventListener('click', () => {
    setDataToLocalStorage(localStorageKeys.groceries, []);
    rerenderGroceryList();
});