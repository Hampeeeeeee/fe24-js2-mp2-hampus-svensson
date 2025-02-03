import { getProducts } from "./modules/API.ts";
import { Product } from "./modules/Product.ts";
import { filterByCategory, filterByPrice, sortByPrice, sortByRating } from "./modules/Filter.ts";

// funktion som hämtar produkterna och kör olika filter på produkterna.
getProducts().then((products:Product[]) => {
    console.log(products)
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
    const filterPriceDowndown = document.getElementById('priceFilter') as HTMLSelectElement;
    const sortPriceDropdown = document.getElementById('priceHighLowSort') as HTMLSelectElement;
    const sortRatingDropdown = document.getElementById('ratingHighLowSort') as HTMLSelectElement;

    filterCategoryDropdown.addEventListener('change', () => {
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDowndown.value;

        console.log('Selected category:', selectedCategory);
        console.log('Selected price:', selectedFilterPrice);

        const filteredProducts = filterByCategory(products, selectedCategory);
        console.log('Filtered Products:', filteredProducts);
        displayProducts(filteredProducts);
    });

    filterPriceDowndown.addEventListener('change', () => {
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDowndown.value;

        console.log('Selected Category:', selectedCategory);
        console.log('Selected Price:', selectedFilterPrice);

        const filteredByCategory = filterByCategory(products, selectedCategory);
        const filteredByPrice = filterByPrice(filteredByCategory, selectedFilterPrice);
        console.log('Filtered Products:', filteredByPrice);
        displayProducts(filteredByPrice);
    });

    sortPriceDropdown.addEventListener('change', () => {
        const sortedPrice = sortPriceDropdown.value as SortOrderPrice;

        console.log('Sorted price:', sortedPrice);

        const sortedByPrice = sortByPrice(products, sortedPrice);
        console.log('Sorted by price:', sortedByPrice);

        displayProducts(sortedByPrice);
    });

    sortRatingDropdown.addEventListener('change', () => {
        const sortedRating = sortRatingDropdown.value as SortOrderRating;

        console.log('Sorted rating:', sortedRating);

        const sortedByRating = sortByRating(products, sortedRating);
        console.log('Sorted by rating:', sortedByRating);

        displayProducts(sortedByRating);
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