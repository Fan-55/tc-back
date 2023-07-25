import { UserRole } from '../../base/domain/valueObjects/UserRole';

export interface ILoginUseCaseRequestDto {
  username: string;
  password: string;
  role: UserRole;
}
