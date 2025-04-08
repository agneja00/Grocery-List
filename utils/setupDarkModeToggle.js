export const setupDarkModeToggle = () => {
  const toggleBtn = document.querySelector(".dark-mode-btn");

  const enableDarkMode = () => {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
    toggleBtn.textContent = "☀️ Light Mode";
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
    toggleBtn.textContent = "🌙 Dark Mode";
  };

  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  toggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
};
