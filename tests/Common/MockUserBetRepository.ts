import { injectable } from 'inversify';
import UserBet from '../../src/Domain/Entities/UserBet';
import UserBetRepositoryInterface from '../../src/Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import { USER_BET_STATUSES } from '../../src/Domain/Interfaces/UserBetStatus';

@injectable()
export default class MockUserBetRepository implements UserBetRepositoryInterface {
    findBy(params: any): Promise<UserBet[]> {
        const userBet1 = new UserBet(
            1,
            1,
            1.5,
            1000,
            USER_BET_STATUSES.OPEN
        );
        return Promise.resolve([userBet1]);
    }

    public async findAll(): Promise<UserBet[]> {
        return [];
    }

    public async findOneById(id: number): Promise<UserBet> {
        if (id === 1) {
            return new UserBet(
                1,
                1,
                1.5,
                1000,
                USER_BET_STATUSES.OPEN
            );
        }
        return new UserBet(
            2,
            1,
            1.2,
            750,
            USER_BET_STATUSES.WON
        );
    }

    public async findOneBy(key: string, value: string | number | null): Promise<UserBet | null> {
        return new UserBet(
            1,
            1,
            1.5,
            1000,
            USER_BET_STATUSES.OPEN
        );
    }

    public async persist(userBet: UserBet): Promise<number> {
        return 1;
    }

    public async update(userBet: UserBet): Promise<void> {
    }

    public async delete(userBet: UserBet): Promise<boolean> {
        return true;
    }
}
