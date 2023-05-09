export default {
  host: process.env.MYSQL_HOST || 'mysql',
  port: process.env.MYSQL_PORT || '3306',
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'secret',
  database: process.env.MYSQL_DATABASE || 'greenrun',
};
