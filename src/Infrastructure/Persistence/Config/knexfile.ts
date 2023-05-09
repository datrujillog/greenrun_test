export default {
  development: {
    client: 'mysql',
    connection: { database: 'greenrun', host: 'mysql', port: 3306, user: 'root', password: 'secret' },
  },

  staging: {
    client: 'mysql',
    connection: { database: 'greenrun', host: 'mysql', port: 3306, user: 'root', password: 'secret' },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: { database: 'greenrun', host: 'mysql', port: 3306, user: 'root', password: 'secret' },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
