import { Container, Title } from "./style";
import React from "react";

interface InputProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
}
export default function SimpleButton({ title, onPress, disabled }: InputProps) {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Title>{title}</Title>
    </Container>
  );
}
