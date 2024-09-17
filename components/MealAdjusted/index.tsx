import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import {
  Container,
  ContainerModal,
  ContainerOption,
  ItemContainer,
  ItemDetails,
  ItemName,
  MealContainer,
  MealTitle,
  ModalOptions,
  ModalTitle,
  OtherOptionTouchable,
  TextOtherOption,
  Title,
} from "./style";

import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

type FoodItem = {
  name: string;
  calories: number;
  carbs?: number;
  fat?: number;
  protein?: number;
  quantity: number;
  maxQuantity?: number;
  minQuantity?: number;
  unity: string;
  otherOptions?: string[];
};

type DietMeals = {
  [key: string]: FoodItem[] | undefined;
};

const dietMeals: DietMeals = {
  firstMeal: [
    {
      name: "Ovo inteiro (cozido)",
      quantity: 50,
      calories: 77,
      unity: "g",
      protein: 6.5,
      carbs: 0.6,
      fat: 5.5,
      maxQuantity: 150,
      minQuantity: 50,
      otherOptions: ["Queijo Mussarela", "Queijo Minas", "Ricota"],
    },
    {
      name: "Aveia em flocos",
      quantity: 50,
      calories: 195,
      unity: "g",
      protein: 5,
      carbs: 33,
      fat: 3,
      maxQuantity: 100,
      minQuantity: 10,
      otherOptions: ["Aveia em flocos finos", "Farelo de Aveia"],
    },
    {
      name: "Whey concentrado",
      quantity: 30,
      calories: 120,
      unity: "g",
      protein: 24,
      carbs: 3,
      fat: 1.5,
      maxQuantity: 90,
      minQuantity: 30,
    },
    {
      name: "Banana",
      quantity: 100,
      calories: 89,
      unity: "g",
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      maxQuantity: 200,
      minQuantity: 50,
      otherOptions: ["Uva", "Abacate", "Morango", "BlueBerry"],
    },
  ],
  secondMeal: [
    {
      name: "Arroz branco",
      quantity: 100,
      calories: 130,
      unity: "g",
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      maxQuantity: 500,
      minQuantity: 50,
      otherOptions: ["Batata Inglesa", "Macarrão", "Mandioca", "Batata Doce"],
    },
    {
      name: "File de peito de frango grelhado",
      quantity: 100,
      calories: 160,
      unity: "g",
      protein: 32,
      carbs: 0,
      fat: 2.5,
      maxQuantity: 400,
      minQuantity: 100,
      otherOptions: ["Carne de patinho", "Peixe branco", "File mignon"],
    },
    {
      name: "Verduras (Alface, rúcula, agrião...)",
      quantity: 0,
      calories: 0,
      unity: "x",
    },
    {
      name: "Cenoura cozida",
      quantity: 100,
      calories: 41,
      unity: "g",
      protein: 1,
      carbs: 10,
      fat: 0.2,
      maxQuantity: 100,
      minQuantity: 20,
      otherOptions: [
        "beterraba",
        "Couve-flor",
        "Chuchu",
        "Pepino",
        "Espinafre",
        "Couve",
      ],
    },
    {
      name: "Laranja",
      quantity: 100,
      calories: 47,
      unity: "g",
      protein: 1,
      carbs: 12,
      fat: 0.1,
      maxQuantity: 100,
      minQuantity: 50,
      otherOptions: ["Mexerica"],
    },
  ],
  thirdMeal: [
    {
      name: "Ovo inteiro (cozido)",
      quantity: 50,
      calories: 77,
      unity: "g",
      protein: 6.5,
      carbs: 0.6,
      fat: 5.5,
      maxQuantity: 150,
      minQuantity: 50,
      otherOptions: ["Queijo Mussarela", "Queijo Minas", "Ricota"],
    },
    {
      name: "Aveia em flocos",
      quantity: 100,
      calories: 390,
      unity: "g",
      protein: 10,
      carbs: 66,
      fat: 6,
      maxQuantity: 100,
      minQuantity: 10,
      otherOptions: ["Aveia em flocos finos", "Farelo de Aveia"],
    },
    {
      name: "Whey concentrado",
      quantity: 30,
      calories: 120,
      unity: "g",
      protein: 24,
      carbs: 3,
      fat: 1.5,
      maxQuantity: 90,
      minQuantity: 30,
    },
    {
      name: "Banana",
      quantity: 100,
      calories: 89,
      unity: "g",
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      maxQuantity: 200,
      minQuantity: 50,
      otherOptions: ["Uva", "Abacate", "Morango", "Blueberry"],
    },
  ],
  fourthMeal: [
    {
      name: "Arroz branco",
      quantity: 100,
      calories: 130,
      unity: "g",
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      maxQuantity: 500,
      minQuantity: 50,
      otherOptions: ["Batata Inglesa", "Macarrão", "Mandioca", "Batata Doce"],
    },
    {
      name: "File de peito de frango grelhado",
      quantity: 100,
      calories: 160,
      unity: "g",
      protein: 32,
      carbs: 0,
      fat: 2.5,
      maxQuantity: 400,
      minQuantity: 100,
      otherOptions: ["Carne de patinho", "Peixe branco", "File mignon"],
    },
    {
      name: "Verduras (Alface, rúcula, agrião...)",
      quantity: 0,
      calories: 0,
      unity: "x",
    },
    {
      name: "Cenoura cozida",
      quantity: 100,
      calories: 41,
      unity: "g",
      protein: 1,
      carbs: 10,
      fat: 0.2,
      maxQuantity: 100,
      minQuantity: 20,
      otherOptions: [
        "beterraba",
        "Couve-flor",
        "Chuchu",
        "Pepino",
        "Espinafre",
        "Couve",
      ],
    },
    {
      name: "Laranja",
      quantity: 100,
      calories: 47,
      unity: "g",
      protein: 1,
      carbs: 12,
      fat: 0.1,
      maxQuantity: 100,
      minQuantity: 50,
      otherOptions: ["Mexerica", "Melão", "Melancia"],
    },
  ],
};

// Calcula as calorias totais de uma refeição
const calculateTotalCalories = (items: FoodItem[]): number => {
  return items.reduce(
    (total, item) => total + item.calories * (item.quantity / 100),
    0
  );
};

// Ajusta a refeição para se aproximar da meta de calorias
const adjustMeal = (meal: FoodItem[], targetCalories: number): FoodItem[] => {
  let totalCalories = calculateTotalCalories(meal);

  if (totalCalories >= targetCalories) {
    return meal;
  }

  return meal.map((item) => {
    if (item.maxQuantity && item.quantity < item.maxQuantity) {
      const caloriePerUnit = item.calories / 100;
      const additionalCaloriesNeeded = targetCalories - totalCalories;
      const additionalQuantity = additionalCaloriesNeeded / caloriePerUnit;

      const maxAllowedQuantity = Math.min(
        item.maxQuantity,
        Math.round(item.quantity + additionalQuantity) // Arredondando a quantidade
      );
      const newCalories = Math.round(caloriePerUnit * maxAllowedQuantity);
      const newProtein = item.protein
        ? Math.round((item.protein / 100) * maxAllowedQuantity)
        : undefined;
      const newCarbs = item.carbs
        ? Math.round((item.carbs / 100) * maxAllowedQuantity)
        : undefined;
      const newFat = item.fat
        ? Math.round((item.fat / 100) * maxAllowedQuantity)
        : undefined;

      return {
        ...item,
        quantity: maxAllowedQuantity,
        calories: newCalories,
        protein: newProtein,
        carbs: newCarbs,
        fat: newFat,
      };
    }
    return item;
  });
};

// Ajusta as quantidades das refeições para atingir a meta de calorias
const adjustQuantitiesByCalories = (
  dietMeals: DietMeals,
  targetCalories: number
): DietMeals => {
  const mealKeys = Object.keys(dietMeals);
  const adjustedMeals: DietMeals = {};
  let totalCalories = 0;

  mealKeys.forEach((mealKey) => {
    const items = dietMeals[mealKey] || [];
    let mealItems: FoodItem[] = [];
    let mealCalories = 0;

    items.forEach((item) => {
      const itemCalories = item.calories * (item.quantity / 100);
      if (mealCalories + itemCalories <= targetCalories) {
        mealItems.push(item);
        mealCalories += itemCalories;
      } else if (mealCalories < targetCalories && item.maxQuantity) {
        const maxAllowedQuantity = Math.min(
          item.maxQuantity,
          Math.round(
            item.quantity +
              ((targetCalories - mealCalories) * 100) / item.calories
          )
        );
        mealItems.push({ ...item, quantity: maxAllowedQuantity });
        mealCalories += item.calories * (maxAllowedQuantity / 100);
      }
    });

    adjustedMeals[mealKey] = mealItems;
    totalCalories += mealCalories;
  });

  // Se o total de calorias não atingir o target, cria refeições adicionais
  while (totalCalories < targetCalories) {
    const mealKey =
      mealKeys[Object.keys(adjustedMeals).length % mealKeys.length];
    const baseMeal = dietMeals[mealKey] || [];
    const newMeal = adjustMeal(baseMeal, targetCalories - totalCalories);
    const newMealKey = `meal${Object.keys(adjustedMeals).length + 1}`;
    adjustedMeals[newMealKey] = newMeal;
    totalCalories += calculateTotalCalories(newMeal);
  }

  // Ajusta a exibição das verduras
  Object.keys(adjustedMeals).forEach((mealKey) => {
    adjustedMeals[mealKey] = (adjustedMeals[mealKey] || []).map((item) => ({
      ...item,
      quantity: item.calories === 0 ? 0 : item.quantity,
    }));
  });

  return adjustedMeals;
};

interface MealProps {
  targetCalories: number;
}
const MealAdjusted = ({ targetCalories }: MealProps) => {
  const [adjustedDiet, setAdjustedDiet] = useState<DietMeals>({} as DietMeals);
  const [options, setOptions] = useState([] as string[]);
  const bottomModalRef = useRef<BottomSheetModal>(null);
  const [foodToChange, setFoodToChange] = useState("");
  useEffect(() => {
    if (targetCalories !== 0) {
      const adjustedDiet = adjustQuantitiesByCalories(
        dietMeals,
        targetCalories
      );
      setAdjustedDiet(adjustedDiet);
    }
  }, [targetCalories]);

  function handleOtherOptions(options: string[] | undefined, name: string) {
    if (options && options.length > 0) {
      setOptions(options);
      setFoodToChange(name);
      bottomModalRef.current?.present();
    }
  }

  return (
    <>
      <Container>
        {Object.entries(adjustedDiet).map(([mealKey, items], index) => (
          <MealContainer key={mealKey}>
            <MealTitle>Refeição {index + 1}</MealTitle>
            {items &&
              items?.length > 0 &&
              items.map((item, index) => (
                <ItemContainer key={index}>
                  <View style={{ width: "60%" }}>
                    <ItemName numberOfLines={2}>{item.name}</ItemName>
                    <ItemDetails>
                      {item.quantity > 0
                        ? `${Math.round(item.quantity)} ${
                            item.unity
                          } - ${Math.round(item.calories)} Cal`
                        : "A vontade"}
                    </ItemDetails>
                  </View>

                  {item.otherOptions && item.otherOptions?.length > 0 && (
                    <OtherOptionTouchable
                      onPress={() =>
                        handleOtherOptions(item.otherOptions, item.name)
                      }
                    >
                      <TextOtherOption>Outras Opções</TextOtherOption>
                    </OtherOptionTouchable>
                  )}
                </ItemContainer>
              ))}
          </MealContainer>
        ))}
      </Container>
      <BottomSheetModal ref={bottomModalRef} snapPoints={["30%"]}>
        <ContainerOption>
          <ModalTitle>Outras Opções para substituir {foodToChange}</ModalTitle>
          {options.map((option) => (
            <Title>- {option}</Title>
          ))}
        </ContainerOption>
      </BottomSheetModal>
    </>
  );
};

export default MealAdjusted;
