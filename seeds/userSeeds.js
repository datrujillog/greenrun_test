/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      role: 'admin',
      first_name: 'Diego',
      last_name: 'Trujillo',
      phone: '+57 3024119199',
      email: 'diegotrtujillo0210@gmail.com',
      username: 'johndoe',
      password: '$2b$08$kmYWsCuYDXunsa2DrMU1SOFxnNyo521I14juaOGjYjBXKgN0oZIoa',
      address: 'sabaneta antioquia',
      gender: 'male',
      birth_date: '1990-10-02',
      country_id: 1,
      city: 'Medellin',
      category: 'example',
      document_id: 555555,
      user_state: null,
      created_at: '2023-05-09',
      updated_at: '2022-05-09',
      deleted: 0,
      deleted_at: null,
    },
  ]);
};
