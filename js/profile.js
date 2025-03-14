document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        window.location.href = "register.html"; // Якщо немає користувача, повертаємо на реєстрацію
    }

    document.getElementById("profile-name").textContent = user.name;
    document.getElementById("profile-role").textContent = `Роль: ${user.role}`;
    document.getElementById("profile-email").textContent = `Email: ${user.email}`;
    
    if (user.profileImage) {
        document.getElementById("profile-image").src = user.profileImage;
    } else {
        document.getElementById("profile-image").src = "../img/default-avatar.png";
    }

    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html"; // Повернення на головну після виходу
    });
});
