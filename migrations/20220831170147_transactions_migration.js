/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('transactions', function (table) {
            table.increments('id');
            table.integer('user_id').notNullable();
            table.float('amount').notNullable();
            table.string('category', 255).notNullable();
            table.string('status', 255).notNullable();
            table.integer('user_bet_id').nullable();
            table.date('created_at').notNullable();
            table.date('updated_at').notNullable();
            table.boolean('deleted').notNullable().defaultTo(false);
            table.date('deleted_at').nullable();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('transactions');
};
