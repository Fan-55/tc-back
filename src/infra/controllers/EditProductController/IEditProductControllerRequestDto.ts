export interface IEditProductControllerRequestDto {
  id: number;
  available: boolean;
  name: string;
  price: number;
  description: string;
  stock: number;
}
