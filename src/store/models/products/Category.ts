export type CategoryApi = {
    id: number;
    name: string;
    image?: string;
    creationAt: string;
    updatedAt: string;
}

export type CategoryModel = {
    id: number;
    name: string;
    image?: string;
    creationAt: Date;
    updatedAt: Date;
}


export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
    id: from.id,
    name: from.name,
    image: from.image,
    creationAt: new Date(from.creationAt),
    updatedAt: new Date(from.updatedAt)
})

export const getInitialCategoryModel = (): CategoryModel => <CategoryModel>({});