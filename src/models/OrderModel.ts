
export interface OrderModel {
    id: string;
    cartIds: string[]
    method: string
    addressId: string
    cardId: string
    userId: string;

    createAt?: CreateAt;
    updateAt?: UpdateAt;
}

export interface Method {
    description: string
    price: number
    title: string
}

export interface CreateAt {
    _seconds: number;
    _nanoseconds: number;
}

export interface UpdateAt {
    _seconds: number;
    _nanoseconds: number;
}

