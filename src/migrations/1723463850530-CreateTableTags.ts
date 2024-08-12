import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTags1723463850530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
          new Table({
            name: 'tags',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isUnique: true,
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tags');
      }
    

}
