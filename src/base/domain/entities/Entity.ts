export interface IEntityProps {
  createdAt: Date;
  id: number;
  updatedAt: Date;
}

export class Entity<T> {
  entityProps: IEntityProps;
  protected props: T;

  protected constructor(props: T, entityProps: IEntityProps) {
    this.entityProps = entityProps;
    this.props = props;
  }
}
