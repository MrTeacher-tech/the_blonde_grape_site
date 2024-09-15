// script.js

// Function to create card HTML for each menu item
function createMenuCard(item) {
    return `
        <div class="col-12 col-lg-6">
            <div class="card my-4">
                <div class="card-body">
                    <h2>${item.title}</h2>
                    <p class="card-text">${item.description}</p>
                </div>
                <img src="${item.image}" class="img-fluid menu-image">
            </div>
        </div>
    `;
}

function createEntreeCard(item) {
    return `
        <div class="container-fluid">
                <div class="row my-4 justify-content-center text-center">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h2>${item.title}</h2>
                                <p class="card-text">${item.description}</p>
                            </div>
                            <img src="${item.image}" class="img-fluid menu-image">
                        </div>
                    </div>
                </div>
            </div>
        `;
}

// Function to create card HTML for each snack item
function createSnackCard(item) {
    return `
        <div class="col-12 col-lg-6 text-center">
            <div class="card my-4">
                <div class="card-body">
                    <h2>${item.title}</h2>
                    
                </div>
                
            </div>
        </div>
    `;
}

// Function to fetch and display menu items
function loadMenu() {
    fetch('menu_items.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            let htmlContent = '';

            // Loop through categories (entrees, pasta, tapas)
            for (const [category, items] of Object.entries(data.menu)) {
                
                if ( !category.includes('cocktails') ){

                    htmlContent += `
                        <div class="row">
                            <div class="col-12 text-center">
                                <h1 class='main-title-2 section-header'>${category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                            </div>
                        </div>
                        <div class="row">
                `;
                }

                // Loop through each item in the category
                items.forEach(item => {
                    if( category == 'entrees'){

                        htmlContent += createEntreeCard(item);

                    }

                    else if ( category == 'snacks') {
                        htmlContent += createSnackCard(item);
                    }

                    else if ( category.includes('cocktails') ) {
                        return ;
                    }
                    else {
                    htmlContent += createMenuCard(item);
                    }
                });

                htmlContent += `</div>`;
            }

            // Insert the dynamically created HTML into the page
            menuContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
}

// Load the menu when the page loads
window.onload = loadMenu;
