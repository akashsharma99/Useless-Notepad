const switchIcon = document.querySelector('#switchIcon');
const appIcon = document.querySelector('#appIcon');
// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    if (themeName === 'theme-light') {
        switchIcon.src = "assets/moon.svg";
        appIcon.src = "assets/light-icon.svg";
    } else {
        switchIcon.src = "assets/sun.svg";
        appIcon.src = "assets/dark-icon.svg";
    }
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }

}
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
})();

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
};

document.querySelector('#btnsave').addEventListener('click', () => {
    const textArea = document.querySelector('textarea');
    downloadToFile(textArea.value, 'useless-notes.txt', 'text/plain');
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/Useless-Notepad/sw.js')
            .then(registration => {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
