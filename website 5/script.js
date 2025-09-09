document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const productsPerPageMobile = 10;
    const productsPerPageDesktop = 30;
    
    // DOM elements
    const productGrid = document.getElementById('product-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const searchForm = document.getElementById('search-form');
    
    // Determine if mobile or desktop
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Get products per page based on device
    function getProductsPerPage() {
        return isMobile() ? productsPerPageMobile : productsPerPageDesktop;
    }
    
    // Calculate total pages
    function calculateTotalPages(items = products) {
        return Math.ceil(items.length / getProductsPerPage());
    }
    
    // Get current page from URL or default to 1
    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        let page = parseInt(urlParams.get('page'));
        if (!page || page < 1) {
            page = 1;
        }
        const totalPages = calculateTotalPages();
        if (page > totalPages) {
            page = totalPages;
        }
        return page;
    }
    
    // Display products function (search result or all)
    function displayProducts(items = products) {
        productGrid.innerHTML = '';
        
        const currentPage = getCurrentPage();
        const productsPerPage = getProductsPerPage();
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, items.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const product = items[i];
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <a href="product.html?id=${product.id}" class="product-button">View Details</a>
                </div>
            `;
            productGrid.appendChild(productCard);
        }
    }
    
    // Pagination
    function createPagination(items = products) {
        paginationControls.innerHTML = '';
        const currentPage = getCurrentPage();
        const totalPages = calculateTotalPages(items);
        
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.className = 'page-button prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.addEventListener('click', () => navigateToPage(currentPage - 1));
            paginationControls.appendChild(prevButton);
        }
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-button' + (i === currentPage ? ' active' : '');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => navigateToPage(i));
            paginationControls.appendChild(pageButton);
        }
        
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.className = 'page-button next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => navigateToPage(currentPage + 1));
            paginationControls.appendChild(nextButton);
        }
    }
    
    function navigateToPage(page) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.location.href = url.toString();
    }
    
    function handleResize() {
        const oldProductsPerPage = getProductsPerPage();
        setTimeout(() => {
            const newProductsPerPage = getProductsPerPage();
            if (oldProductsPerPage !== newProductsPerPage) {
                const currentPage = getCurrentPage();
                const currentIndex = (currentPage - 1) * oldProductsPerPage;
                const newPage = Math.floor(currentIndex / newProductsPerPage) + 1;
                if (newPage !== currentPage) {
                    navigateToPage(newPage);
                } else {
                    displayProducts();
                    createPagination();
                }
            }
        }, 200);
    }
    

    // Initialize normal display
    displayProducts();
    createPagination();
    window.addEventListener('resize', handleResize);

    // ----- Search functionality -----
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.querySelector("input[name='search']").value.toLowerCase().trim();
        const result = products.filter(product => product.title.toLowerCase().includes(query));
        
        if (result.length > 0) {
            displayProducts(result);
            createPagination(result); // Optional: show pagination for search result
        } else {
            window.location.href = "error.html";
        }
    });
});