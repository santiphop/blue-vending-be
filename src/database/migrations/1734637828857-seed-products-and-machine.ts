import { MigrationInterface, QueryRunner } from 'typeorm';

const products = [
  ['Pepsi', 'เป๊ปซี่', 'soda', '15'],
  ['Coke', 'โค้ก', 'soda', '15'],
  ['Mirinda', 'มิรินด้า', 'soda', '13'],
  ['Singha', 'สิงห์', 'water', '8'],
  ['Nestle', 'เนสเล่', 'water', '7'],
  ['Aura', 'ออร่า', 'water', '10'],
];

const machines = ['Siam', 'Sathorn', 'Ari'];
const currencies = [
  ['COIN', '1'],
  ['COIN', '5'],
  ['COIN', '10'],
  ['BANKNOTE', '20'],
  ['BANKNOTE', '100'],
  ['BANKNOTE', '500'],
  ['BANKNOTE', '1000'],
];

export class SeedProductsAndMachine1734637828857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			INSERT INTO products (name_en, name_local, category, price) VALUES
			${products.map((seed) => `(${seed.map((s) => `'${s}'`).join(', ')})`).join(', ')};
		`);
    await queryRunner.query(`
			INSERT INTO machines (location) VALUES
			${machines.map((seed) => `('${seed}')`).join(', ')};
		`);
    machines.forEach(async (_, index) => {
      await queryRunner.query(`
				INSERT INTO currencies (machine_id, form, value) VALUES
				${currencies.map((seed) => `('${index + 1}', ${seed.map((s) => `'${s}'`).join(', ')})`).join(', ')};
			`);
    });
    await queryRunner.query(`
			INSERT INTO inventories (machine_id, product_id, quantity, item_number) VALUES
			('1', '1', 7, 1);
		`);
  }
  public async down(): Promise<void> {}
}
