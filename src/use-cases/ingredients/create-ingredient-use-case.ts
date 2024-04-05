import { AppError } from '@/errors/app-error';
import { IIngredientsRepository } from '@/repositories/ingredients-repository';

interface ICreateIngredientUseCaseRequest {
  name: string;
  emoji: string;
}

export class CreateIngredientUseCase {
  constructor(private ingredientsRepository: IIngredientsRepository) {}

  async execute({ name, emoji }: ICreateIngredientUseCaseRequest) {
    const ingredientAlreadyExists =
      await this.ingredientsRepository.findByName(name);

    if (ingredientAlreadyExists) {
      throw new AppError('Ingredient already exists');
    }

    const ingredient = await this.ingredientsRepository.create({
      name,
      emoji,
    });

    return ingredient;
  }
}
