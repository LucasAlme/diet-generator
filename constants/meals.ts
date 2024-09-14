export interface FoodItem {
  name: string;
  quantity: number | string;
  calories: number;
  unity: string;
}

export interface Meal {
  [key: string]: FoodItem[];
}

export interface DietMeals {
  firstMeal: FoodItem[];
  secondMeal: FoodItem[];
  thirdMeal: FoodItem[];
  fourthMeal: FoodItem[];
}
export const dietMeals: DietMeals[] = [
  {
    firstMeal: [
      {
        name: "Ovo inteiro (cozido)",
        quantity: 1,
        calories: 70,
        unity: "Unidade",
      },
      { name: "Aveia em flocos", quantity: 10, calories: 35, unity: "g" },
      { name: "Whey concentrado", quantity: 30, calories: 126, unity: "g" },
      { name: "Banana", quantity: 50, calories: 50, unity: "g" },
    ],
    secondMeal: [
      { name: "Arroz branco", quantity: 100, calories: 128, unity: "g" },
      {
        name: "File de peito de frango grelhado",
        quantity: 100,
        calories: 159,
        unity: "g",
      },
      {
        name: "Verduras (Alface, rucula, agriao...",
        quantity: "a vontade",
        calories: 0,
        unity: "x",
      },
      {
        name: "Cenoura/beterraba/couve-flor/chuchu/pepino/espinafre/couve",
        quantity: 50,
        calories: 15,
        unity: "g",
      },
    ],
    thirdMeal: [
      {
        name: "Ovo inteiro (cozido)",
        quantity: 1,
        calories: 70,
        unity: "Unidade",
      },
      { name: "Aveia em flocos", quantity: 10, calories: 35, unity: "g" },
      { name: "Whey concentrado", quantity: 30, calories: 126, unity: "g" },
      { name: "Banana", quantity: 50, calories: 50, unity: "g" },
    ],
    fourthMeal: [
      { name: "Arroz branco", quantity: 100, calories: 128, unity: "g" },
      {
        name: "File de peito de frango grelhado",
        quantity: 100,
        calories: 159,
        unity: "g",
      },
      {
        name: "Verduras (Alface, rucula, agriao...",
        quantity: "a vontade",
        calories: 0,
        unity: "x",
      },
      {
        name: "Cenoura/beterraba/couve-flor/chuchu/pepino/espinafre/couve",
        quantity: 50,
        calories: 15,
        unity: "g",
      },
    ],
  },
];
export const dietMealsSecondOption = [
  {
    firstMeal: [
      { name: "Queijo Mussarela", quantity: 30, calories: 70, unity: "g" },
      {
        name: "Pão integral (visconti, bauducco)",
        quantity: 50,
        calories: 132,
        unity: "g",
      },
      { name: "Whey concentrado", quantity: 30, calories: 126, unity: "g" },
      { name: "Melao amarelo", quantity: 100, calories: 36, unity: "g" },
    ],
    secondMeal: [
      { name: "Arroz branco", quantity: 100, calories: 128, unity: "g" },
      { name: "Carne de patinho", quantity: 100, calories: 159, unity: "g" },
      {
        name: "Verduras (Alface, rucula, agriao...",
        quantity: "a vontade",
        calories: 0,
        unity: "x",
      },
      { name: "Feijao Cozido", quantity: 50, calories: 50, unity: "g" },
    ],
    thirdMeal: [
      { name: "Queijo Mussarela", quantity: 30, calories: 70, unity: "g" },
      {
        name: "Pão integral (visconti, bauducco)",
        quantity: 50,
        calories: 132,
        unity: "g",
      },
      { name: "Whey concentrado", quantity: 30, calories: 126, unity: "g" },
      { name: "Melao amarelo", quantity: 100, calories: 36, unity: "g" },
    ],
    fourthMeal: [
      { name: "Arroz branco", quantity: 100, calories: 128, unity: "g" },
      { name: "Carne de patinho", quantity: 100, calories: 159, unity: "g" },
      {
        name: "Verduras (Alface, rucula, agriao...",
        quantity: "a vontade",
        calories: 0,
        unity: "x",
      },
      { name: "Feijao Cozido", quantity: 50, calories: 50, unity: "g" },
    ],
  },
];
