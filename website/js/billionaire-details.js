document.addEventListener("DOMContentLoaded", () => {
    const detailsSection = document.getElementById('billionaire-details');

    // Haal de naam uit de URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    function loadBillionaireDetails() {
        fetch('data/Billionaires_Cleaned.csv')
            .then(response => response.text())
            .then(csv => Papa.parse(csv, { header: true }).data)
            .then(data => {
                const billionaire = data.find(b => b.personName === name);
                if (billionaire) {
                    displayBillionaireDetails(billionaire);
                } else {
                    detailsSection.innerHTML = `<p>Billionaire not found.</p>`;
                }
            })
            .catch(error => {
                detailsSection.innerHTML = `<p>Failed to load details. Try again later.</p>`;
            });
    }

    function displayBillionaireDetails(billionaire) {
        detailsSection.innerHTML = `
            <h2>${billionaire.personName}</h2>
            <p><strong>Net Worth:</strong> $${(billionaire.finalWorth / 1000).toFixed(1)}B</p>
            <p><strong>Age:</strong> ${billionaire.age}</p>
            <p><strong>Industry:</strong> ${billionaire.category}</p>
            <p><strong>Country:</strong> ${billionaire.country}</p>
            <p><strong>Organization:</strong> ${billionaire.organization}</p>
        `;
    }

    loadBillionaireDetails();
});