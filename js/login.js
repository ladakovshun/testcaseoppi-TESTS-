document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.querySelector(".login-btn");
    const closeBtn = document.querySelector(".close");

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Перевіряємо, чи є авторизований користувач
    function checkAuth() {
        const authContainer = document.querySelector(".buttonlog");
        if (currentUser) {
            authContainer.innerHTML = `
                <a href="user-profile.html"><button class="profile-btn">${currentUser.name}</button></a>
                <button class="logout-btn">Вийти</button>
            `;
            document.querySelector(".logout-btn").addEventListener("click", logout);
        }
    }

    // Функція виходу
    function logout() {
        localStorage.removeItem("currentUser");
        location.reload(); // Перезавантаження сторінки
    }

    // Обробка входу
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let login = document.getElementById("login").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let role = document.getElementById("role").value;

        if (!login || !email || !password || role === "") {
            alert("Будь ласка, заповніть усі поля!");
            return;
        }

        let user = {
            name: login,
            email: email,
            role: role
        };

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Вхід успішний! Перехід до профілю.");
        window.location.href = "user-profile.html";
    });

    // Закриття модального вікна входу
    closeBtn.addEventListener("click", function () {
        loginModal.style.display = "none";
    });

    // Відкриття вікна входу
    loginBtn.addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    // Перевірка статусу авторизації
    checkAuth();
});
