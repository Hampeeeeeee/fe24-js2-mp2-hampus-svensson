import { getProducts } from "./modules/API.ts";
import { Product } from "./modules/Product.ts";
import { filterByCategory, filterByPrice, sortByPrice, sortByRating } from "./modules/Filter.ts";

// funktion som hämtar produkterna och kör olika filter på produkterna.
getProducts().then((products:Product[]) => {
    filterDropdown(products);
    displayProducts(products);
});

// funktion som som väntar på getProducts() för att hämta listan products, och sedan visa listan i DOM'en.
async function fetchAndLogProducts() {
    try {
        const products = await getProducts();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

// funktion som hanterar alla dropdown menyer. 
function filterDropdown(products: Product[]) {
    type SortOrderPrice = "lowToHighPrice" | "highToLowPrice";
    type SortOrderRating = "lowToHighRating" | "highToLowRating";
    
    
    const filterCategoryDropdown = document.getElementById('categoryFilter') as HTMLSelectElement;
    const filterPriceDropdown = document.getElementById('priceFilter') as HTMLSelectElement;
    const sortPriceDropdown = document.getElementById('priceHighLowSort') as HTMLSelectElement;
    const sortRatingDropdown = document.getElementById('ratingHighLowSort') as HTMLSelectElement;


    filterCategoryDropdown.addEventListener('change', () => {
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;

        let filteredProducts = filterByCategory(products, selectedCategory);

        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        displayProducts(filteredProducts);
    });

    // Lyssnar på förändringar i pris-filter
    filterPriceDropdown.addEventListener('change', () => {
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;
        const selectedSortPrice = sortPriceDropdown.value as SortOrderPrice;
        const selectedSortRating = sortRatingDropdown.value as SortOrderRating;

        let filteredProducts = filterByCategory(products, selectedCategory);
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        if (selectedSortPrice) {
            filteredProducts = sortByPrice(filteredProducts, selectedSortPrice);
        } else if (selectedSortRating) {
            filteredProducts = sortByRating(filteredProducts, selectedSortRating);
        }

        displayProducts(filteredProducts);
    });

    // Lyssnar på förändringar i sortering efter pris
    sortPriceDropdown.addEventListener('change', () => {
        const selectedSortPrice = sortPriceDropdown.value as SortOrderPrice;
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;

        let filteredProducts = filterByCategory(products, selectedCategory);
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        filteredProducts = sortByPrice(filteredProducts, selectedSortPrice);

        displayProducts(filteredProducts);
    });

    sortRatingDropdown.addEventListener('change', () => {
        const selectedSortRating = sortRatingDropdown.value as SortOrderRating;
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;

        let filteredProducts = filterByCategory(products, selectedCategory);
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        filteredProducts = sortByRating(filteredProducts, selectedSortRating);

        displayProducts(filteredProducts);
    });
}

// funktion som visar upp alla produkter i vars ett productCard.
function displayProducts(products: Product[]) {
    const container = document.getElementById('productContainer') as HTMLDivElement;
    container.innerHTML = '';

    products.forEach((product: Product) => {
        product.displayInfo();

        const productCard = product.productCard();
        container.appendChild(productCard);
    });
}

fetchAndLogProducts();