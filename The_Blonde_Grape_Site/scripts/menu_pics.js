function createCarousel() {
    fetch('menu_items.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-carousel');
            let htmlContent = '';
            let index = 0; // Counter for active class

            htmlContent += `
                <div id="carouselMenuPics" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
            `;

            // Loop through categories and items
            for (const items of Object.values(data.menu)) {
                items.forEach(item => {

                    
                    // Skip items from the 'cocktails' category
                    if (!item['category'].includes('cocktails') && !item['category'].includes('snacks') ) {
                        console.log(item)
                        htmlContent += `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img class="d-block w-100" src="${item['image']}" alt="${item['title']}">
                        </div>
                    `;
                    index++;
                    }

                    
                });
            }

            htmlContent += `
                    </div>
                    <a class="carousel-control-prev" href="#carouselMenuPics" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselMenuPics" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </a>
                </div>
            `;

            // Insert the dynamically created HTML into the page
            menuContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
}

window.onload = createCarousel;
