export type ProductType = {
    id: number;
    category: {
        id: number,
        name: string,
        image?: string,
        creationAt: string,
        updatedAt?: string
    };
    creationAt: string;
    description: string;
    images: Array<string>;
    price: number;
    title: string
    updatedAt?: string
}