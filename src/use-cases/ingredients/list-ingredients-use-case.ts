import { IIngredientsRepository } from '@/repositories/ingredients-repository';

export class ListIngredientsUseCase {
  constructor(private ingredientsRepository: IIngredientsRepository) {}

  async execute() {
    const ingredient = await this.ingredientsRepository.findAll();

    return ingredient;
  }
}
