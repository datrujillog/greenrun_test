import { injectable } from 'inversify';
import BetParamsInterface from '../../src/Application/Commands/Interfaces/BetParamsInterface';
import Bet from '../../src/Domain/Entities/Bet';
import { BET_STATUSES } from '../../src/Domain/Interfaces/BetStatus';
import { BET_RESULT } from '../../src/Domain/Interfaces/BetResults';
import BetRepositoryInterface from '../../src/Domain/Interfaces/Repositories/BetRepositoryInterface';

@injectable()
export default class MockBetRepository implements BetRepositoryInterface {
    findBy(params: BetParamsInterface): Promise<Bet[]> {
        const bet1 = new Bet(
            'optionA',
            'football',
            BET_STATUSES.ACTIVE,
            'some name',
            1,
            1.4,
            null,
        );
        return Promise.resolve([bet1]);
    }

    public async findAll(): Promise<Bet[]> {
        return [];
    }

    public async findOneByIdOrFail(id: number): Promise<Bet> {
        if (id === 1) {
            const bet = new Bet(
                'optionA',
                'football',
                BET_STATUSES.SETTLED,
                'some name',
                1,
                1.5,
                null,
            );
            bet.result = BET_RESULT.WON;
            return bet;
        }
        const bet2 = new Bet(
            'optionb',
            'football',
            BET_STATUSES.ACTIVE,
            'some name',
            1,
            1.4,
            'lost',
        );
        bet2.result = BET_RESULT.LOST;
        return bet2;
    }

    public async findOneBy(key: string, value: string | number | null): Promise<Bet | null> {
        return new Bet(
            'optionA',
            'football',
            BET_STATUSES.ACTIVE,
            'some name',
            1,
            1.4,
            null,
        );
    }

    public async persist(bet: Bet): Promise<number> {
        return 1;
    }

    public async update(bet: Bet): Promise<void> {
    }

    public async delete(bet: Bet): Promise<boolean> {
        return true;
    }
}
