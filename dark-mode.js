// JavaScript for toggling dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    // Save user preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = 'Activate Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = 'Activate Dark Mode';
    }
});

// Check user preference on page load
const userPreference = localStorage.getItem('darkMode');
if (userPreference === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Activate Light Mode';
} else {
    body.classList.remove('dark-mode');
    darkModeToggle.textContent = 'Activate Dark Mode';
}