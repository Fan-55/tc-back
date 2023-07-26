export interface IAddProductControllerRequestDto {
  available: boolean;
  name: string;
  price: number;
  description: string;
  stock: number;
  sellerId: number;
}
