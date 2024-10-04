import { Product } from "../../Model/class";

export interface ProductState {
    products: Product[],
    totalItems: number,
    error: string | null
}

