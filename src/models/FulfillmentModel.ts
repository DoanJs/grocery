export interface FulfillmentModel {
  id: string;
  orderId: string;
  placed: TimeAt;
  confirmed: TimeAt;
  shipped: TimeAt;
  delivery: TimeAt;
  delivered: TimeAt;

  createAt?: CreateAt;
  updateAt?: UpdateAt;
}

export interface TimeAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
