// Function to create a dropdown menu item
function createMenuItem(item) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = item.name;

    if (item.url) {
        a.href = item.url;
        a.target = "_blank"; // Open in a new tab
    }

    li.appendChild(a);

    if (item.children && item.children.length > 0) {
        const ul = document.createElement('ul');
        item.children.forEach(child => {
            ul.appendChild(createMenuItem(child));
        });
        li.appendChild(ul);
    }

    return li;
}

// Function to categorize menu items into improved categories
function categorizeMenu(data) {
    const categories = {
        "Search": {
            "People": [],
            "Social Networks": [],
            "Telephone Numbers": [],
            "Records": [],
            "Media": [],
            "Domain/IP": []
        },
        "Vault": [],
        "Sites": [],
        "Tools": [],
        "Exploits": [],
        "Malicious Activity": [],
        "Miscellaneous": []
    };

    data.children.forEach(item => {
        if (item.name.includes("Username") || item.name.includes("Email") || item.name.includes("People")) {
            categories["Search"]["People"].push(item);
        } else if (item.name.includes("Social")) {
            categories["Search"]["Social Networks"].push(item);
        } else if (item.name.includes("Business") || item.name.includes("Public") || item.name.includes("Records") || item.name.includes("Transportation")) {
            categories["Search"]["Records"].push(item);
        } else if (item.name.includes("Images") || item.name.includes("Videos") || item.name.includes("Docs")) {
            categories["Search"]["Media"].push(item);
        } else if (item.name.includes("Telephone Numbers")) {
            categories["Search"]["Telephone Numbers"].push(item);
        } else if (item.name.includes("Domain") || item.name.includes("IP") || item.name.includes("MAC")) {
            categories["Search"]["Domain/IP"].push(item);
        } else if (item.name.includes("Metadata") || item.name.includes("Archives") || item.name.includes("Classifieds")) {
            categories["Vault"].push(item);
        } else if (item.name.includes("Tools") || item.name.includes("Emulation") || item.name.includes("Translation") || item.name.includes("Analysis") || item.name.includes("Encoding") || item.name.includes("Digital")) {
            categories["Tools"].push(item);
        } else if (item.name.includes("Dark Web") || item.name.includes("Terrorism")) {
            categories["Malicious Activity"].push(item);
        } else if (item.name.includes("Exploit") || item.name.includes("Threat") || item.name.includes("OpSec")) {
            categories["Exploits"].push(item);
        } else if (item.name.includes("Dating") || item.name.includes("Instant Messaging") || item.name.includes("Search Engines")) {
            categories["Sites"].push(item);
        } else {
            categories["Miscellaneous"].push(item);
        }
    });

    return categories;
}

// Function to generate the categorized menu under the "OSINT" link
function generateMenu(menu, categories) {
    const osintLi = document.createElement('li');
    const osintA = document.createElement('a');
    osintA.textContent = 'OSINT';
    osintLi.appendChild(osintA);

    const osintUl = document.createElement('ul'); // Create a nested <ul> under OSINT
    osintUl.classList.add('dropdown'); // Add class to style dropdown

    for (const category in categories) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = category;
        li.appendChild(a);

        const ul = document.createElement('ul');

        if (typeof categories[category] === 'object' && !Array.isArray(categories[category])) {
            // If it's an object (i.e., "Search"), generate subcategories
            for (const subcategory in categories[category]) {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.textContent = subcategory;
                subLi.appendChild(subA);

                const subUl = document.createElement('ul');
                categories[category][subcategory].forEach(item => {
                    subUl.appendChild(createMenuItem(item));
                });
                subLi.appendChild(subUl);
                ul.appendChild(subLi);
            }
        } else {
            // Normal category with no subcategories
            categories[category].forEach(item => {
                ul.appendChild(createMenuItem(item));
            });
        }

        li.appendChild(ul);
        osintUl.appendChild(li);
    }

    osintLi.appendChild(osintUl);
    menu.appendChild(osintLi);
}

// Fetching JSON data and generating the menu on page load
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu-osint');
    fetch('https://raw.githubusercontent.com/lockfale/OSINT-Framework/refs/heads/master/public/arf.json')
        .then(response => response.json())
        .then(data => {
            const categories = categorizeMenu(data);
            generateMenu(menu, categories);
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});