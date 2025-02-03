// klass för product med alla variablar som behövs.
export interface ProductInterface {
    title: string;
    imageUrl: string;
    stock: number;
    price: number;
    discountPercentage: number;
    category: string;
    rating: number;
    discountedPrice: () => number;
}

export class Product implements ProductInterface {
    public title: string;
    public imageUrl: string;
    public stock: number;
    public price: number;
    public discountPercentage: number;
    public category: string;
    public rating: number;

    constructor(title:string, imageUrl:string, stock:number, price:number, discountPercentage:number, category:string, rating:number) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.category = category;
        this.rating = rating;
    }

    // funktion som loggar alla variablar.
    displayInfo():void {
        console.log(`Name: ${this.title} - ${this.imageUrl} - Amount: ${this.stock} - Price: $${this.price} - 
                    Discount: ${this.discountPercentage}% - Category: ${this.category} - Rating: ${this.rating}`);
    }

    // funktion som räknar ut det rabatterade priset.
    discountedPrice():number {
        return Math.round(this.price * (1 - this.discountPercentage / 100) * 100) / 100;
    }

    // funktion som uppdaterar lagersaldot.
    updatePurse():void {
        this.stock = Math.max(0, this.stock - 1);
    }

    // funktion som skapar ett produktkort och sedan returnerar det.
    productCard():HTMLDivElement {
        const productCard = document.createElement('div');
        productCard.classList.add('card');

        const title = document.createElement('h3');
        title.innerText = this.title;

        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.alt = `Image of ${this.title}`;
        
        const stock = document.createElement('p');
        stock.innerHTML = `<b>Stock: ${this.stock}</b>`;
        
        const discountedPrice = document.createElement('p');
        discountedPrice.innerHTML = `<i>Price: $${this.discountedPrice()}</i>`;
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.addEventListener('click', () => {
            this.updatePurse();
            stock.innerHTML = `<b>Stock: ${this.stock}</b>`;
        });
        productCard.append(title, img, stock, discountedPrice, addToCartBtn);
    
        return productCard;
    }
}