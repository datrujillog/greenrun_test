import { injectable } from 'inversify';
import Transaction from '../../src/Domain/Entities/Transaction';
import TransactionRepositoryInterface from '../../src/Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import { TRANSACCIONS_CATEGORIES } from '../../src/Domain/Interfaces/TransactionCategories';
import { TRANSACCIONS_STATUSES } from '../../src/Domain/Interfaces/TransactionStatus';

@injectable()
export default class MockTransactionRepository implements TransactionRepositoryInterface {
    findBy(params: any): Promise<Transaction[]> {
        const transaction1 = new Transaction(
            2,
            1500,
            TRANSACCIONS_CATEGORIES.DEPOSIT,
            TRANSACCIONS_STATUSES.COMPLETED
        );
        const transaction2 = new Transaction(
            2,
            500,
            TRANSACCIONS_CATEGORIES.BET,
            TRANSACCIONS_STATUSES.COMPLETED,
            1
        );
        const transaction3 = new Transaction(
            2,
            800,
            TRANSACCIONS_CATEGORIES.WITHDRAW,
            TRANSACCIONS_STATUSES.COMPLETED
        );
        return Promise.resolve([transaction1,transaction2, transaction3]);
    }

    public async findAll(): Promise<Transaction[]> {
        return [];
    }

    public async findOneByIdOrFail(id: number): Promise<Transaction> {
        if (id === 1) {
            return new Transaction(
                1,
                800,
                TRANSACCIONS_CATEGORIES.WITHDRAW,
                TRANSACCIONS_STATUSES.COMPLETED,
                1
            );
        }
        return new Transaction(
            1,
            800,
            TRANSACCIONS_CATEGORIES.WITHDRAW,
            TRANSACCIONS_STATUSES.COMPLETED,
            1
        );
    }

    public async findOneBy(key: string, value: string | number | null): Promise<Transaction | null> {
        return new Transaction(
            1,
            800,
            TRANSACCIONS_CATEGORIES.WITHDRAW,
            TRANSACCIONS_STATUSES.COMPLETED,
            1
        );
    }

    public async persist(bet: Transaction): Promise<number> {
        return 1;
    }

    public async update(bet: Transaction): Promise<void> {
    }

    public async delete(bet: Transaction): Promise<boolean> {
        return true;
    }
}
