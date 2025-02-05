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

        if (priceRange === "< $50") {
            return displayedPrice < 50;
        }

        else if (priceRange === "> $50") {
            return displayedPrice > 50;
        }

        return false;
    });
};

// funktion som sorterar produkterna beroende på pris, lågt till högt eller högt till lågt.
const sortByPrice = (products:Product[], order: 'lowToHighPrice' | 'highToLowPrice' = 'lowToHighPrice'):Product[] => {
    return [...products].sort((a, b) => {
        if (order === 'lowToHighPrice') {
            return a.discountedPrice() - b.discountedPrice(); 
        } else if (order === 'highToLowPrice') {
            return b.discountedPrice() - a.discountedPrice(); 
        }
        return 0;
    });
};

// funktion som sorterar produkterna beroende på omdöme, lågt till högt eller högt till lågt.
const sortByRating = (products: Product[], order: 'lowToHighRating' | 'highToLowRating'= 'lowToHighRating'):Product[] => {
    return [...products].sort((a, b) => {
        if (order === 'lowToHighRating') {
            return a.rating - b.rating; 
        } else if (order === 'highToLowRating') {
            return b.rating - a.rating; 
        }
        return 0;
    });
};

export {filterByCategory, filterByPrice, sortByPrice, sortByRating}