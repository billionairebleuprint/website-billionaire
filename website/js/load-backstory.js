document.addEventListener("DOMContentLoaded", () => {
    const backstoryContainer = document.getElementById("backstory-container");

    // Haal de naam van de miljardair uit de URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (!name) {
        backstoryContainer.innerHTML = "<p>Error: No billionaire specified.</p>";
        return;
    }

    // Laad de JSON met backstories
    fetch("data/billionaires-backstories.json")
        .then(response => response.json())
        .then(data => {
            const billionaire = data.find(b => b.personName === name);
            if (billionaire) {
                displayBackstory(billionaire);
            } else {
                backstoryContainer.innerHTML = "<p>Backstory not found for this billionaire.</p>";
            }
        })
        .catch(error => {
            console.error("Error loading backstory:", error);
            backstoryContainer.innerHTML = "<p>Failed to load backstory. Please try again later.</p>";
        });
});

function displayBackstory(billionaire) {
    const backstoryContainer = document.getElementById("backstory-container");
    backstoryContainer.innerHTML = `
        <h2>${billionaire.personName}</h2>
        <p>${billionaire.backstory}</p>
    `;
}