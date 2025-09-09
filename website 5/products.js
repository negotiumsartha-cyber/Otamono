document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // DOM elements
    const productContent = document.getElementById('product-content');
    const affiliateButtons = document.getElementById('affiliate-buttons');
    
    // Find product by ID
    function getProductById(id) {
        return products.find(product => product.id === id);
    }
    
    // Display product details
    function displayProductDetails() {
        // Get product
        const product = getProductById(productId);
        
       
        
        // Set page title
        document.title = `${product.title} - AliExpress Affiliate`;
        
        // Display product details
        productContent.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-detail-info">
                <h1>${product.title}</h1>
                <div class="product-description">
                    <h3>What is it?</h3>
                    <p>${product.description}</p>
                </div>
            </div>
        `;
        
        // Display affiliate buttons
        displayAffiliateButtons(product);
    }
    
    // Display affiliate buttons for different regions
    function displayAffiliateButtons(product) {
        // Clear affiliate buttons
        affiliateButtons.innerHTML = '';
        
        // Create heading
        const heading = document.createElement('h3');
        heading.textContent = 'Buy Now:';
        affiliateButtons.appendChild(heading);
        
        // Create buttons for each region
        const regions = {
            NA: 'North America',
            EU: 'Europe',
            AS: 'Asia',
            OC: 'Oceania',
            SA: 'South America'
           
        };
        
        for (const [code, name] of Object.entries(regions)) {
            if (product.affiliateLinks[code]) {
                const button = document.createElement('a');
                button.className = 'affiliate-button';
                button.href = product.affiliateLinks[code];
                button.target = '_blank';
                button.rel = 'noopener noreferrer';
                button.textContent = name;
                affiliateButtons.appendChild(button);
            }
        }
    }
    
    // Initialize
    displayProductDetails();
});