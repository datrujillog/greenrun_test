/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('user_bets', function (table) {
            table.increments('id');
            table.integer('user_id').notNullable();
            table.integer('bet_id').notNullable();
            table.float('odd').notNullable();
            table.float('amount').notNullable();
            table.string('state', 255).notNullable();
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
        .dropTable('user_bets');
};
