import DatabaseVariables from './DatabaseVariables';

export default {
  client: 'mysql',
  connection: {
    host: DatabaseVariables.host,
    port: Number(DatabaseVariables.port),
    username: DatabaseVariables.username,
    password: DatabaseVariables.password,
    database: DatabaseVariables.database,
  },
};
