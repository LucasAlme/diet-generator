import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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
    },
    {
      name: "Verduras (Alface, rúcula, agrião...)",
      quantity: 0,
      calories: 0,
      unity: "x",
    },
    {
      name: "Cenoura/beterraba/couve-flor/chuchu/pepino/espinafre/couve",
      quantity: 100,
      calories: 41,
      unity: "g",
      protein: 1,
      carbs: 10,
      fat: 0.2,
      maxQuantity: 100,
      minQuantity: 20,
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
    },
    {
      name: "Verduras (Alface, rúcula, agrião...)",
      quantity: 0,
      calories: 0,
      unity: "x",
    },
    {
      name: "Cenoura/beterraba/couve-flor/chuchu/pepino/espinafre/couve",
      quantity: 100,
      calories: 41,
      unity: "g",
      protein: 1,
      carbs: 10,
      fat: 0.2,
      maxQuantity: 100,
      minQuantity: 20,
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
        item.quantity + additionalQuantity
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
          item.quantity +
            ((targetCalories - mealCalories) * 100) / item.calories
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

  useEffect(() => {
    if (targetCalories !== 0) {
      const adjustedDiet = adjustQuantitiesByCalories(
        dietMeals,
        targetCalories
      );
      setAdjustedDiet(adjustedDiet);
    }
  }, [targetCalories]);

  return (
    <ScrollView style={styles.container}>
      {Object.entries(adjustedDiet).map(([mealKey, items]) => (
        <View key={mealKey} style={styles.mealContainer}>
          <Text style={styles.mealTitle}>{mealKey}</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity > 0
                  ? `${item.quantity} ${item.unity} - ${item.calories} Cal`
                  : "A vontade"}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mealContainer: {
    marginBottom: 20,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    marginVertical: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemDetails: {
    fontSize: 14,
    color: "gray",
  },
});

export default MealAdjusted;
