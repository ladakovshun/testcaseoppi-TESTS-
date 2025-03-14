document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-btn");

    // Авторизація користувача
    const user = {
        isAuthenticated: true, // Це потрібно замінити на справжню перевірку
        role: "студент"
    };

    // Отримання голосів з LocalStorage
    let votes = JSON.parse(localStorage.getItem("votes_events")) || {
        science: 0,
        sports: 0,
        culture: 0
    };

    // Оновлення діаграми
    function updateChart() {
        const ctx = document.getElementById("voteChart").getContext("2d");

        if (window.voteChartInstance) {
            window.voteChartInstance.destroy();
        }

        window.voteChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Науковий форум", "Спортивний фестиваль", "Культурний вечір"],
                datasets: [{
                    label: "Кількість голосів",
                    data: [votes.science, votes.sports, votes.culture],
                    backgroundColor: ["#007bff", "#ff4500", "#28a745"]
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Голосування
    voteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (!user.isAuthenticated || user.role !== "студент") {
                alert("Голосувати можуть лише авторизовані студенти!");
                return;
            }

            if (localStorage.getItem("hasVoted_events")) {
                alert("Ви вже голосували!");
                return;
            }

            const eventChoice = event.target.dataset.event;
            votes[eventChoice]++;
            localStorage.setItem("votes_events", JSON.stringify(votes));
            localStorage.setItem("hasVoted_events", "true");

            updateChart();
        });
    });

    // Завантаження діаграми при відкритті сторінки
    updateChart();
});
