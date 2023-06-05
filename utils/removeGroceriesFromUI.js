export const removeGroceriesFromUI = () => {
    const groceriesList = document.querySelectorAll(".grocery");

    groceriesList.forEach((grocery) => {
        grocery.remove();
    });
};