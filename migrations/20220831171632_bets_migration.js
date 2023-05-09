/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('bets', function (table) {
            table.increments('id');
            table.string('bet_option', 255).notNullable();
            table.string('sport', 255).notNullable();
            table.string('status', 255).notNullable();
            table.string('name', 255).notNullable();
            table.integer('event_id').notNullable();
            table.float('odd').notNullable();
            table.string('result', 255).nullable();
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
        .dropTable('bets');
};
