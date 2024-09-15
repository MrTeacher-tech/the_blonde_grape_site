// script.js

// Function to create card HTML for each menu item
function createSpecialtyCard(item) {
    // Split the description by commas and generate a new <p> tag for each description item
    let descList = item.description.split(',').map(desc => `<p>${desc.trim()}</p>`).join('');
    return `
        <div class="container-fluid">
            <div class="row my-4 justify-content-center text-center">
                <div class="col-12 col-lg-8">
                    <div class="card cocktail-card">
                        <div class="row no-gutters">
                            <!-- Text on the left -->
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h2>${item.title}</h2>
                                    <div class="card-text">${descList}</div>
                                </div>
                            </div>
                            <!-- Image on the right -->
                            <div class="col-md-6">
                                <img src="${item.image}" class="img-fluid cocktail-image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to create card HTML for each snack item
function createCocktailCard(item) {
    return `
        <div class="col-12 col-lg-6 text-center">
            <div class="card my-4">
                <div class="card-body">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                </div>
                
            </div>
        </div>
    `;
}

function formatCocktailDesc(desc) {

    let descList = desc.split(',');

    // Remove leading/trailing whitespace from each element
    let descListClean = descList.map(item => item.trim());

    return descListClean;

}


// Function to fetch and display menu items
function loadCocktails() {
    fetch('menu_items.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('cocktail-container');
            let htmlContent = '';

            // Loop through categories (entrees, pasta, tapas)
            for (const [category, items] of Object.entries(data.menu)) {
                
                if (category === 'specialty cocktails' || category === 'cocktails'){
                htmlContent += `
                    <div class="row">
                        <div class="col-12 text-center">
                            <h1 class='main-title-2 section-header'>${category.charAt(0).toUpperCase() + category.slice(1,10) + category.charAt(10).toUpperCase() + category.slice(11)}</h1>
                        </div>
                    </div>
                    <div class="row">
                `;
                }

                // Loop through each item in the category
                items.forEach(item => {
                    if( category == 'specialty cocktails'){

                        htmlContent += createSpecialtyCard(item);

                    }

                    else if ( category == 'cocktails' ) {

                        htmlContent += createCocktailCard(item);
                    }

                    
                    else {
                    return;
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
window.onload = loadCocktails;
