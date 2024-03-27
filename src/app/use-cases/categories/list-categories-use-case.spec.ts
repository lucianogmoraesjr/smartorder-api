import mongoose from 'mongoose';

import { ListCategoriesUseCase } from './list-categories-use-case';

let sut: ListCategoriesUseCase;

describe('List Categories Use Case', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017');
  });

  beforeEach(async () => {
    sut = new ListCategoriesUseCase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should be able to list all categories', async () => {
    const categories = await sut.execute();

    expect(categories).toHaveLength(4);
  });
});
