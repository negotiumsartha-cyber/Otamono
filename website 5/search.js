const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function(e){
    e.preventDefault(); // page reload রোধ করে
    const query = document.querySelector("input[name='search']").value.toLowerCase().trim();
    
    const result = products.filter(product => product.title.toLowerCase().includes(query));

    if(result.length > 0){
        displayProducts(result); // matching products দেখাবে
        createPagination(result); // optional, search result pagination
    } else {
        window.location.href = "error.html";
    }
});