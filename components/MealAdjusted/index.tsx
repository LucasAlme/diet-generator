import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface FoodItem {
  name: string;
  quantity: number;
  calories: number;
  carbs?: number;
  fat?: number;
  protein?: number;
  unity: string;
  maxQuantity?: number;
  minQuantity?: number;
}

interface DietMeals {
  firstMeal: FoodItem[];
  secondMeal: FoodItem[];
  thirdMeal: FoodItem[];
  fourthMeal: FoodItem[];
  fifthMeal?: FoodItem[];
}

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
      quantity: "a vontade",
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
      quantity: "a vontade",
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

const calculateTotalCalories = (items: FoodItem[]): number => {
  return items.reduce(
    (total, item) => total + item.calories * (item.quantity / 100),
    0
  );
};

const adjustMeal = (meal: FoodItem[], targetCalories: number): FoodItem[] => {
  let totalCalories = calculateTotalCalories(meal);

  if (totalCalories >= targetCalories) {
    return meal;
  }

  return meal.map((item) => {
    if (typeof item.quantity === "number") {
      const caloriePerUnit = item.calories / 100;
      const currentQuantity = item.quantity;
      const totalCaloriesFromCurrentQuantity = caloriePerUnit * currentQuantity;

      const additionalCaloriesNeeded = targetCalories - totalCalories;
      const additionalQuantity = additionalCaloriesNeeded / caloriePerUnit;

      const maxQuantity = item.maxQuantity ?? currentQuantity;
      const adjustedQuantity = Math.min(
        currentQuantity + additionalQuantity,
        maxQuantity
      );

      const newCalories = Math.round(caloriePerUnit * adjustedQuantity);
      const newProtein = item.protein
        ? Math.round((item.protein / 100) * adjustedQuantity)
        : undefined;
      const newCarbs = item.carbs
        ? Math.round((item.carbs / 100) * adjustedQuantity)
        : undefined;
      const newFat = item.fat
        ? Math.round((item.fat / 100) * adjustedQuantity)
        : undefined;

      return {
        ...item,
        quantity: adjustedQuantity,
        calories: newCalories,
        protein: newProtein,
        carbs: newCarbs,
        fat: newFat,
      };
    }
    return item;
  });
};

const adjustQuantitiesByCalories = (
  dietMeals: DietMeals,
  targetCalories: number
): DietMeals => {
  const mealsArray = [
    { meal: "firstMeal", items: dietMeals.firstMeal },
    { meal: "secondMeal", items: dietMeals.secondMeal },
    { meal: "thirdMeal", items: dietMeals.thirdMeal },
    { meal: "fourthMeal", items: dietMeals.fourthMeal },
  ];

  const adjustedMeals: DietMeals = {
    firstMeal: [],
    secondMeal: [],
    thirdMeal: [],
    fourthMeal: [],
    fifthMeal: [],
  };

  let currentCalories = 0;

  mealsArray.forEach(({ meal, items }) => {
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

    adjustedMeals[meal as keyof DietMeals] = mealItems;
    currentCalories += mealCalories;
  });

  while (currentCalories < targetCalories) {
    let additionalItems: FoodItem[] = [];
    let remainingCalories = targetCalories - currentCalories;

    mealsArray.forEach(({ items }) => {
      items.forEach((item) => {
        if ((item.maxQuantity ?? item.quantity) > item.quantity) {
          const maxAllowedQuantity = Math.min(
            remainingCalories / (item.calories / 100),
            (item.maxQuantity ?? item.quantity) - item.quantity
          );

          if (maxAllowedQuantity > 0) {
            additionalItems.push({
              ...item,
              quantity: item.quantity + maxAllowedQuantity,
              calories:
                (item.calories * (item.quantity + maxAllowedQuantity)) / 100,
              protein: item.protein
                ? (item.protein * (item.quantity + maxAllowedQuantity)) / 100
                : undefined,
              carbs: item.carbs
                ? (item.carbs * (item.quantity + maxAllowedQuantity)) / 100
                : undefined,
              fat: item.fat
                ? (item.fat * (item.quantity + maxAllowedQuantity)) / 100
                : undefined,
            });
          }
        }
      });
    });

    let addedCalories = 0;
    additionalItems = additionalItems
      .map((item) => {
        const itemCalories = item.calories * (item.quantity / 100);
        if (addedCalories + itemCalories <= remainingCalories) {
          addedCalories += itemCalories;
          return item;
        } else {
          const allowedQuantity =
            ((remainingCalories - addedCalories) / (item.calories / 100)) * 100;
          addedCalories = remainingCalories;
          return { ...item, quantity: item.quantity + allowedQuantity };
        }
      })
      .filter((item) => item.quantity > 0);

    if (additionalItems.length > 0) {
      if (!adjustedMeals.fifthMeal) {
        adjustedMeals.fifthMeal = additionalItems;
      } else {
        adjustedMeals.fifthMeal.push(...additionalItems);
      }
      currentCalories += calculateTotalCalories(additionalItems);
    } else {
      break;
    }
  }

  return adjustedMeals;
};

const App = () => {
  const [adjustedDiet, setAdjustedDiet] = useState<DietMeals>(dietMeals);

  useEffect(() => {
    const targetCalories = 2000;
    const adjustedDiet = adjustQuantitiesByCalories(dietMeals, targetCalories);
    setAdjustedDiet(adjustedDiet);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {Object.entries(adjustedDiet).map(([mealKey, items]) => (
        <View key={mealKey} style={styles.mealContainer}>
          <Text style={styles.mealTitle}>{mealKey}</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity} {item.unity} - {item.calories} Cal
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

export default App;
