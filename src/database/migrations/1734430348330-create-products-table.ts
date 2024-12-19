import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const tableName = 'products';

export class CreateProductsTable1734430348330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name_en',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'name_local',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'detail_en',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'detail_local',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'is_enabled',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      tableName,
      new TableIndex({
        name: 'IDX_products_category',
        columnNames: ['category'],
      }),
    );

    await queryRunner.createIndex(
      tableName,
      new TableIndex({
        name: 'IDX_products_is_enabled',
        columnNames: ['is_enabled'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(tableName, 'IDX_products_is_enabled');
    await queryRunner.dropIndex(tableName, 'IDX_products_category');
    await queryRunner.dropTable(tableName);
  }
}
