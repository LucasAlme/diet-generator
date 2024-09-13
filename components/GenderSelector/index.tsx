import {
  BackgroundSelected,
  Container,
  Separator,
  TitleGender,
  TouchableSelector,
} from "./style";
import React, { useEffect, useState } from "react";

interface GenderSelectorProps {
  isWomenSelected: boolean;
  isManSelected: boolean;
  setMan: () => void;
  setWoman: () => void;
}
export default function GenderSelector({
  isWomenSelected,
  isManSelected,
  setMan,
  setWoman,
}: GenderSelectorProps) {
  return (
    <Container>
      <TitleGender>Homem</TitleGender>
      <TouchableSelector onPress={() => setMan()}>
        <BackgroundSelected isManSelected={isManSelected} />
      </TouchableSelector>
      <Separator />
      <TitleGender>Mulher</TitleGender>
      <TouchableSelector onPress={() => setWoman()}>
        <BackgroundSelected isWomenSelected={isWomenSelected} />
      </TouchableSelector>
    </Container>
  );
}
