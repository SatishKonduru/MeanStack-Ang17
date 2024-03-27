export interface WishlistItem {
    _id: string; // Assuming _id is a string
    name: string;
    description: string;
    image: string,
    color: string;
    price: number,
    size: string,
    style: string,
    season: string,
    // Add other properties as needed
}

export interface CartItems{
    _id: string,
    name: string,
    description: string;
    image: string,
    color: string;
    price: number,
    size: string,
    style: string,
    season: string,
    quantity: number,
    total: number
}
export interface userModel{
    name: string,
    email: string,
    password: string,
    phone: string,
    apartment? : string,
    street? : string,
    city? : string,
    state? : string,
    zip? : string,
    country? : string,
    role? : string,
    image? :  string,
    orders? : [string],
    wishlist? : WishlistItem[];
    cartItems? : CartItems[]
}

export interface productModel{
    name: string,
    description?: string,
    richDescription? : string,
    image? : string,
    images? : [string],
    price? : number,
    category ? : string,
    countInStock? : number,
    rating? : number,
    isFeatured? : boolean,
    style? : string,
    size? : string,
    color? : string,
    season? : string,
    brand? : string,
    dateCreated?: Date
}

export interface categoryModel{
    id: string,
    name: string,
    icon? : string
}
