import { IBrowseUseCaseRequestDto } from '../../base/app/IBrowseUseCaseRequestDto';

export interface IBrowseProductsUseCaseRequestDto extends IBrowseUseCaseRequestDto {
  minPrice: number;
  maxPrice: number;
  sellerId: number;
}
