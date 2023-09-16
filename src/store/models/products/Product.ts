import {CategoryApi, CategoryModel, normalizeCategory} from "./Category";

export type ProductApi = {
    id: number;
    category: CategoryApi;
    creationAt: string;
    description: string;
    images: Array<string>;
    price: number;
    title: string;
    updatedAt: string
}

export type ProductModel = {
    id: number;
    category: CategoryModel;
    creationAt: Date;
    description: string;
    images: Array<string>;
    price: number;
    title: string;
    updatedAt: Date
}

export const normalizeProduct = (from: ProductApi): ProductModel => ({
    id: from.id,
    category: normalizeCategory(from.category),
    creationAt: new Date(from.creationAt),
    description: from.description,
    images: from.images,
    price: from.price,
    title: from.title,
    updatedAt: new Date(from.updatedAt)
})

export const getInitialModel = (): ProductModel => <ProductModel>({});