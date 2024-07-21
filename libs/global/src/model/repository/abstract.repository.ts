import { Repository, EntityTarget, ObjectLiteral, DataSource } from 'typeorm';

export abstract class AbstractRepository<
  TEntity extends ObjectLiteral,
> extends Repository<TEntity> {
  constructor(entity: EntityTarget<TEntity>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }
}
