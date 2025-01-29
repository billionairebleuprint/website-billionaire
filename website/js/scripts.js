document.addEventListener("DOMContentLoaded", () => {
    // Initialiseer de pagina
    initializePage();
});

// Algemene functie om alle delen van de website te initialiseren
function initializePage() {
    loadBillionairesData();
    loadQuotes();
    loadToolsAndBooks();
    setupNavigation();
}

// ===================
// 1. Billionaires Data
// ===================
function loadBillionairesData() {
    const container = document.getElementById("billionairesList");

    fetch("data/Billionaires_Cleaned.csv")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load billionaires data.");
            return response.text();
        })
        .then(data => {
            const billionaires = parseCSV(data);
            if (billionaires.length === 0) throw new Error("No data found.");
            displayBillionaires(billionaires);
        })
        .catch(error => {
            console.error("Error loading billionaires:", error);
            container.innerHTML = `<p class="error">Failed to load billionaires. Please try again later.</p>`;
        });
}

// CSV Parseren
function parseCSV(data) {
    const rows = data.trim().split("\n").map(row => row.split(","));
    const headers = rows[0].map(header => header.trim());
    return rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index]?.trim() || "";
        });
        return obj;
    });
}

// Billionaires weergeven
function displayBillionaires(billionaires) {
    const container = document.getElementById("billionairesList");
    container.innerHTML = "";

    if (billionaires.length === 0) {
        container.innerHTML = `<p class="error">No billionaires found.</p>`;
        return;
    }

    billionaires.forEach(billionaire => {
        const card = document.createElement("div");
        card.className = "billionaire-card";
        card.innerHTML = `
            <h3>
                <a href="billionaire-backstory.html?name=${encodeURIComponent(billionaire.personName)}">
                    ${billionaire.personName}
                </a>
            </h3>
            <p><strong>Net Worth:</strong> $${(billionaire.finalWorth / 1000).toFixed(1)}B</p>
            <p><strong>Industry:</strong> ${billionaire.category}</p>
            <p><strong>Country:</strong> ${billionaire.country}</p>
            <p><strong>Age:</strong> ${billionaire.age || "N/A"}</p>
            <p><strong>Organization:</strong> ${billionaire.organization || "N/A"}</p>
        `;
        container.appendChild(card);
    });
}

// ===================
// 2. Quotes Data
// ===================
function loadQuotes() {
    const container = document.getElementById("quotes-list");

    fetch("data/quotes.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load quotes data.");
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";
            data.forEach(quote => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <blockquote>
                        "${quote.quote}"
                        <footer>- ${quote.author}</footer>
                    </blockquote>
                `;
                container.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading quotes:", error);
            container.innerHTML = `<p class="error">Failed to load quotes. Please try again later.</p>`;
        });
}

// ===================
// 3. Tools & Books Data
// ===================
function loadToolsAndBooks() {
    const container = document.getElementById("tools-books-list");

    fetch("data/tools-books.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load tools and books data.");
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";
            data.forEach(item => {
                const listItem = document.createElement("div");
                listItem.className = "tool-book-item";
                listItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">${item.price}</p>
                    <a href="${item.url}" target="_blank">Buy on ${item.type}</a>
                `;
                container.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading tools and books:", error);
            container.innerHTML = `<p class="error">Failed to load tools and books. Please try again later.</p>`;
        });
}

// ===================
// 4. Navigation Setup
// ===================
function setupNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href").replace("#", "");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault();
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}
function showError(container, message) {
    container.innerHTML = `<p class="error">${message}</p>`;
    console.error(message);

}
function adjustLayoutForScreenSize() {
    if (window.innerWidth < 768) {
        document.querySelectorAll(".billionaire-card").forEach(card => {
            card.style.flexDirection = "column";
        });
    } else {
        document.querySelectorAll(".billionaire-card").forEach(card => {
            card.style.flexDirection = "row";
        });
    }
}

window.addEventListener("resize", adjustLayoutForScreenSize);
adjustLayoutForScreenSize();
function showLoadingIndicator(container) {
    container.innerHTML = `<p class="loading">Loading...</p>`;
}
const container = document.getElementById("billionairesList");
showLoadingIndicator(container);
function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSectionId)) {
                link.classList.add("active");
            }
        });
    });
}

highlightActiveNavLink();
function loadVideos() {
    const container = document.getElementById("videos-list");

    fetch("data/videos.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load videos data.");
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";
            data.forEach(video => {
                const listItem = document.createElement("div");
                listItem.className = "video-item";
                listItem.innerHTML = `
                    <h3>${video.title}</h3>
                    <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
                `;
                container.appendChild(listItem);
            });
        })
        .catch(error => {
            showError(container, "Failed to load videos. Please try again later.");
        });
}
function displayBackstories(billionaires) {
    const container = document.getElementById("backstories-list");
    container.innerHTML = "";

    billionaires.forEach(billionaire => {
        const card = document.createElement("div");
        card.className = "backstory-card";
        card.innerHTML = `
            <h3>${billionaire.personName}</h3>
            <p><strong>Industry:</strong> ${billionaire.category}</p>
            <p><strong>Country:</strong> ${billionaire.country}</p>
            <p>${billionaire.backstory || "No backstory available."}</p>
        `;
        container.appendChild(card);
    });
}
function displayToolsAndBooks() {
    const container = document.getElementById("tools-books-list");


        fetch('data/tools-books.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch tools and books.');
                return response.json();
            })
            .then(data => {
                const container = document.getElementById('tools-books-list');
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.classList.add('tools-books-item');
                    div.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="price">${item.price}</div>
                        <a href="${item.url}" target="_blank">View on Amazon</a>
                    `;
                    container.appendChild(div);
                });
            })
            .catch(error => console.error('Error loading tools and books:', error));
    };