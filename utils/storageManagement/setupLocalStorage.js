import { getDataFromLocalStorage } from './getDataFromLocalStorage.js';
import { setDataToLocalStorage } from './setDataToLocalStorage.js';
import { localStorageKeys } from '../../constants/localStorageKeys.js';

export const setupLocalStorage = () => {
    const groceriesFromLocalStorage = getDataFromLocalStorage(localStorageKeys.groceries);
    if (!groceriesFromLocalStorage) {
        setDataToLocalStorage(localStorageKeys.groceries, []);
    }
};