import { Product } from "./Product.ts";
// funktion som är ett filter på produkternas kategorier.
const filterByCategory = (products:Product[], category:string): Product[] => 
    category === "All" || category === "Select category" ? products : products.filter(product => product.category === category);

// funktion på produkternas priser.
const filterByPrice = (products:Product[], priceRange:string):Product[] => {
    if (priceRange === "Select price") {
        return products;  
    }

    return products.filter(product => {
        const displayedPrice = product.discountedPrice();

        return priceRange === "< $50" ? displayedPrice < 50 : displayedPrice > 50;
    });
};

// funktion som sorterar produkterna beroende på pris, lågt till högt eller högt till lågt.
const sortByPrice = (products: Product[], order: 'lowToHighPrice' | 'highToLowPrice' = 'lowToHighPrice'): Product[] => 
    [...products].sort((a, b) => order === 'lowToHighPrice' ? a.discountedPrice() - b.discountedPrice() : b.discountedPrice() - a.discountedPrice());

// funktion som sorterar produkterna beroende på omdöme, lågt till högt eller högt till lågt.
const sortByRating = (products: Product[], order: 'lowToHighRating' | 'highToLowRating' = 'lowToHighRating'): Product[] => 
    [...products].sort((a, b) => order === 'lowToHighRating' ? a.rating - b.rating : b.rating - a.rating);

export {filterByCategory, filterByPrice, sortByPrice, sortByRating}