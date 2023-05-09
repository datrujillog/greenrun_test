import Boom from '@hapi/boom';

import { injectable } from 'inversify';
import User from '../../src/Domain/Entities/User';
import UserRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserRepositoryInterface';

@injectable()
export default class MockUserRepository implements UserRepositoryInterface {

    public async findAll(): Promise<User[]> {
        return [];
    }

    public async findOneByIdOrFail(id: number): Promise<User> {
        if (id === 1) {
            return this.entityFromRawData(
                {
                    role: "admin",
                    first_name: "John",
                    last_name: "Doe",
                    phone: "3564 123456",
                    email: "johndoe@example.com",
                    username: "johndoe",
                    password: "greenrun",
                    address: "some address 123",
                    gender: "male",
                    birth_date: "2022-09-01",
                    country_id: 1,
                    city: "some city",
                    category: "some category",
                    document_id: 1
                }
            );
        }

        return this.entityFromRawData(
            {
                role: "user",
                first_name: "John",
                last_name: "Doe",
                phone: "3564 123456",
                email: "johndoe2@example.com",
                username: "johndoe2",
                password: "greenrun2",
                address: "some address 123",
                gender: "female",
                birth_date: "2022-09-01",
                country_id: 1,
                city: "some city",
                category: "some category",
                document_id: 1
            }
        );
    }

    public async findOneBy(key: string, value: string | number | null): Promise<User | null> {
        return this.entityFromRawData(
            {
                role: "user",
                first_name: "John",
                last_name: "Doe",
                phone: "3564 123456",
                email: "johndoe2@example.com",
                username: "johndoe2",
                password: "greenrun2",
                address: "some address 123",
                gender: "female",
                birth_date: "2022-09-01",
                country_id: 1,
                city: "some city",
                category: "some category",
                document_id: 1
            }
        );
    }

    public async persist(user: User): Promise<number> {
        return 1;
    }

    public async update(user: User): Promise<void> {
    }

    public async delete(user: User): Promise<boolean> {
        return true;
    }

    private entityFromRawData(raw: any): User {
        let user = new User(
            raw.role,
            raw.first_name,
            raw.last_name,
            raw.phone,
            raw.email,
            raw.username,
            raw.password,
            raw.address,
            raw.gender,
            raw.birth_date,
            raw.country_id,
            raw.city,
            raw.category,
            raw.document_id,
            raw.user_state,
        );
        user.setId(raw.id);
        user.setCreatedAt(raw.created_at);
        user.setUpdatedAt(raw.updated_at);
        return user;
    }
}
