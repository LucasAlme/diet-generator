import GenderSelector from "@/components/GenderSelector";
import { Container, Content, SubTitle, Title } from "./style";
import React, { useState } from "react";
import SimpleInput from "@/components/SimpleInput";
import { RowInputContainer } from "@/components/GenderSelector/style";
export default function Index() {
  const [isWomenSelected, setIsWomanSelected] = useState(false);
  const [isManSelected, setIsManSelected] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");

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
          />
          <SimpleInput
            title="Peso (kg)"
            placeholder="70"
            onChange={setWeight}
            value={weight}
          />
        </RowInputContainer>
        <RowInputContainer style={{ paddingTop: 10 }}>
          <SimpleInput
            title="Altura (cm)"
            containerStyle={{ marginRight: 30 }}
            placeholder="180"
            onChange={setHeight}
            value={height}
          />
          <SimpleInput
            title="Qtd refeições"
            placeholder="4"
            onChange={setQuantity}
            value={quantity}
          />
        </RowInputContainer>
      </Content>
    </Container>
  );
}
