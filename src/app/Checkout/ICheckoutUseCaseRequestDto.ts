export interface ICheckoutUseCaseRequestDto {
  productsToBeUpdated: {
    id: number;
    quantity: number;
  }[],
}
