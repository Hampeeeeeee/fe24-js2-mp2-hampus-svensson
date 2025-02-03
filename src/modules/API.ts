import { Product } from "./Product.ts";

// funktion som hanterar API/URL'n. Skapar en array med alla produkterna och returnerar dessa.
export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Fråga Clara om varför product är markerad!!!
        const products: Product[] = data.products.map(product => {
            return new Product(
                product.title,
                product.images,
                product.stock,
                product.price,
                product.discountPercentage,
                product.category,
                product.rating
            );
        });

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}