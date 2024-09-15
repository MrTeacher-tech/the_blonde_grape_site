class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-custom fixed-top navbar-expand-lg">
            <div class="container-fluid">
                <div class="d-flex justify-content-between w-100">
                    <!-- Navbar items on the left -->
                    <div class="d-flex">
                        <ul class="navbar-nav d-flex align-items-center">
                            <li>
                                <a class='navbar-brand mx-auto' href="/index.html">
                                    <img src="images/blonde-grape-1.jpg" class="image-beveled">
                                </a>
                            </li>
                            <li class='nav-item'><a href="/food.html">Food</a></li>
                            <li class='nav-item'><a href="/drinks.html">Drinks</a></li>
                            <li class='nav-item'><a href="/location.html">Location</a></li>
                            
                        </ul>
                    </div>

                    <!-- Navbar items on the right -->
                    <div class="d-flex">
                        <ul class="navbar-nav d-flex align-items-center nav-info">
                            <li class='nav-info'><a href="tel:+4151234567">(415) 123-4567</a></li>
                            <li class='nav-info'>
                                <a href="https://www.google.com/maps?q=123+Main+Street,+San+Francisco,+CA" target="_blank">
                                    123 Main Street, San Francisco, CA
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>`;
    }
}

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Blonde Grape</title>
        <!-- Include only one Bootstrap CSS link -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Italiana&display=swap" rel="stylesheet">
        `;
    }
}

customElements.define('header-placeholder', Header);
customElements.define('navbar-placeholder', Navbar);

// Function to get a random index
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Function to load random images (food or drink)
function getRandomImages(type, containerId) {
    fetch('menu_items.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById(containerId);
            let imageLinks = [];
            let isFood = true;
            

            // Loop through categories and filter based on the type (food or cocktails)
            for (const items of Object.values(data.menu)) {
                console.log(items)
                items.forEach(item => {
                    if (type === 'food' && !item['category'].includes('cocktails') && !item['category'].includes('snacks')) {

                        imageLinks.push(item['image']);

                    } else if (type === 'specialty cocktails' && item['category'] === 'specialty cocktails') {

                        imageLinks.push(item['image']);

                        isFood = false;

                    }
                });
            }

            if (imageLinks.length > 0) {
                // Get a random image link
                const randomImageLink = imageLinks[getRandomIndex(imageLinks)];
                // Insert the dynamically created HTML into the page
                if (isFood) {

                    menuContainer.innerHTML = `<a href='/food.html'><img src="${randomImageLink}" alt="Random ${type.charAt(0).toUpperCase() + type.slice(1)} Image" class="menu-image">`;
            

                } else if (!isFood) {

                    menuContainer.innerHTML = `<a href='/drinks.html'><img src="${randomImageLink}" alt="Random ${type.charAt(0).toUpperCase() + type.slice(1)} Image" class="menu-image">`;
            

                }
                } else {
                menuContainer.innerHTML = `<p>No ${type} images available.</p>`;
            }
        })
        .catch(error => {
            console.error(`Error fetching ${type} images:`, error);
        });
}

// Load images once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    getRandomImages('food', 'random-food-image');  // For food images
    getRandomImages('specialty cocktails', 'random-drink-image');  // For drink images
});
