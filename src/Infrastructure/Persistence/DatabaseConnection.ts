import Knex from 'knex';
import knexfile from './Config/knexfile';

export default Knex(knexfile.development);
