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
    
    // Hämtar dropdowns från DOM
    const filterCategoryDropdown = document.getElementById('categoryFilter') as HTMLSelectElement;
    const filterPriceDropdown = document.getElementById('priceFilter') as HTMLSelectElement;
    const sortPriceDropdown = document.getElementById('priceHighLowSort') as HTMLSelectElement;
    const sortRatingDropdown = document.getElementById('ratingHighLowSort') as HTMLSelectElement;

    // Lyssnar på förändringar i kategori-filter
    filterCategoryDropdown.addEventListener('change', () => {
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;
        const selectedSortPrice = sortPriceDropdown.value as SortOrderPrice;
        const selectedSortRating = sortRatingDropdown.value as SortOrderRating;

        // Filtrera först på kategori
        let filteredProducts = filterByCategory(products, selectedCategory);

        // Filtrera därefter på pris
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        // Sortera efter pris eller rating beroende på dropdown-värde
        if (selectedSortPrice) {
            filteredProducts = sortByPrice(filteredProducts, selectedSortPrice);
        } else if (selectedSortRating) {
            filteredProducts = sortByRating(filteredProducts, selectedSortRating);
        }

        // Visa de filtrerade och sorterade produkterna
        displayProducts(filteredProducts);
    });

    // Lyssnar på förändringar i pris-filter
    filterPriceDropdown.addEventListener('change', () => {
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;
        const selectedSortPrice = sortPriceDropdown.value as SortOrderPrice;
        const selectedSortRating = sortRatingDropdown.value as SortOrderRating;

        // Filtrera först på kategori och pris
        let filteredProducts = filterByCategory(products, selectedCategory);
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        // Sortera därefter efter pris eller rating beroende på vad som är valt
        if (selectedSortPrice) {
            filteredProducts = sortByPrice(filteredProducts, selectedSortPrice);
        } else if (selectedSortRating) {
            filteredProducts = sortByRating(filteredProducts, selectedSortRating);
        }

        // Visa de filtrerade och sorterade produkterna
        displayProducts(filteredProducts);
    });

    // Lyssnar på förändringar i sortering efter pris
    sortPriceDropdown.addEventListener('change', () => {
        const selectedSortPrice = sortPriceDropdown.value as SortOrderPrice;
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;

        // Filtrera på kategori och pris först
        let filteredProducts = filterByCategory(products, selectedCategory);
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        // Sortera efter pris
        filteredProducts = sortByPrice(filteredProducts, selectedSortPrice);

        // Visa de filtrerade och sorterade produkterna
        displayProducts(filteredProducts);
    });

    // Lyssnar på förändringar i sortering efter rating
    sortRatingDropdown.addEventListener('change', () => {
        const selectedSortRating = sortRatingDropdown.value as SortOrderRating;
        const selectedCategory = filterCategoryDropdown.value;
        const selectedFilterPrice = filterPriceDropdown.value;

        // Filtrera på kategori och pris först
        let filteredProducts = filterByCategory(products, selectedCategory);
        filteredProducts = filterByPrice(filteredProducts, selectedFilterPrice);

        // Sortera efter rating
        filteredProducts = sortByRating(filteredProducts, selectedSortRating);

        // Visa de filtrerade och sorterade produkterna
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