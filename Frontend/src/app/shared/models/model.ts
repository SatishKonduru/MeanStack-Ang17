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
    image? :  string
}

export interface productModel{
    filter(): any
    name: string,
    descriptin?: string,
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
