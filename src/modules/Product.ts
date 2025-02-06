// klass för product med alla variablar som behövs.
export interface ProductInterface {
    title: string;
    images: string[];
    stock: number;
    price: number;
    discountPercentage: number;
    category: string;
    rating: number;
    discountedPrice(): number;
}

export class Product implements ProductInterface {
    
    constructor(
        public title: string,
        public images: string[],
        public stock: number,
        public price: number,
        public discountPercentage: number,
        public category: string,
        public rating: number
    ){
        
    }

    // funktion som loggar alla variablar.
    displayInfo():void {
        console.table({
            Name: this.title,
            Images: this.images.join(", "),
            Stock: this.stock,
            Price: `$${this.price}`,
            Discount: `${this.discountPercentage}%`,
            Category: this.category,
            Rating: this.rating,
        });
    }

    // funktion som räknar ut det rabatterade priset.
    discountedPrice():number {
        return Math.round(this.price * (1 - this.discountPercentage / 100) * 100) / 100;
    }

    // funktion som uppdaterar lagersaldot.
    updateStock():void {
        if (this.stock > 0) this.stock--;
    }

    // funktion som skapar ett produktkort och sedan returnerar det.
    productCard():HTMLDivElement {
        const productCard = document.createElement('div');
        productCard.classList.add('card');

        const title = document.createElement('h3');
        title.innerText = this.title;

        const img = document.createElement('img');
        img.src = this.images[0];
        img.alt = `Image of ${this.title}`;
        
        const stock = document.createElement('p');
        stock.innerHTML = `<b>Stock: ${this.stock}</b>`;
        
        const discountedPrice = document.createElement('p');
        discountedPrice.innerHTML = `<i>Price: $${this.discountedPrice()}</i>`;
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.addEventListener('click', () => {
            this.updateStock();
            stock.innerHTML = `<b>Stock: ${this.stock}</b>`;
        });
        productCard.append(title, img, stock, discountedPrice, addToCartBtn);
    
        return productCard;
    }
}