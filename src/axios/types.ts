


// export type APIResponse<T> = {
//     success: boolean
//     data: T;
//     status?: number;
// }

export type Nonce = {
    nonce: number;
};

export type PricePoint = {
    marketId: string;
    price: number;
    nonce: string;
    createdAt: number;
}

export type PriceMessage = {
    data: PricePoint[];
    signature?: string;
}