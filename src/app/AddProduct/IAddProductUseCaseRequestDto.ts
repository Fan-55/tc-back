export interface IAddProductUseCaseRequestDto {
  available: boolean;
  name: string;
  price: number;
  description: string;
  stock: number;
  sellerId: number;
}
