import GenderSelector from "@/components/GenderSelector";
import { Container, Content, SubTitle, Title } from "./style";
import React, { useState } from "react";
import SimpleInput from "@/components/SimpleInput";
import { RowInputContainer } from "@/components/GenderSelector/style";
import MealAdjuster from "@/components/MealAdjusted";
import SimpleButton from "@/components/SimpleButton";
export default function Index() {
  const [isWomenSelected, setIsWomanSelected] = useState(false);
  const [isManSelected, setIsManSelected] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);

  function calculateCalories() {
    let calories = 0;
    if (isWomenSelected) {
      calories =
        9.56 * Number(weight) + 1.85 * Number(height) - 4.68 * Number(age);
      return setTotalCalories(calories);
    }
    calories = 13.75 * Number(weight) + 5 * Number(height) - 6.76 * Number(age);
    return setTotalCalories(calories);
  }

  return (
    <Container>
      <Content>
        <Title>Emagreça agora</Title>
        <SubTitle>
          Gere sua dieta agora calculada e perfeita para você!
        </SubTitle>

        <GenderSelector
          isWomenSelected={isWomenSelected}
          isManSelected={isManSelected}
          setMan={() => {
            setIsWomanSelected(false);
            setIsManSelected(true);
          }}
          setWoman={() => {
            setIsManSelected(false);
            setIsWomanSelected(true);
          }}
        />

        <RowInputContainer>
          <SimpleInput
            title="Idade"
            containerStyle={{ marginRight: 30 }}
            placeholder="18"
            onChange={setAge}
            value={age}
            disabled={isWomenSelected || isManSelected}
          />
          <SimpleInput
            title="Peso (kg)"
            placeholder="70"
            onChange={setWeight}
            value={weight}
            disabled={isWomenSelected || isManSelected}
          />
        </RowInputContainer>
        <RowInputContainer style={{ paddingTop: 10 }}>
          <SimpleInput
            title="Altura (cm)"
            containerStyle={{ marginRight: 30 }}
            placeholder="180"
            onChange={setHeight}
            value={height}
            disabled={isWomenSelected || isManSelected}
          />
        </RowInputContainer>

        <MealAdjuster targetCalories={totalCalories} />
        <SimpleButton
          title="Gerar Dieta"
          onPress={() => calculateCalories()}
          disabled={age && weight && height ? false : true}
        />
      </Content>
    </Container>
  );
}
