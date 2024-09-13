import { StyleProp, TextStyle } from "react-native";
import { Container, Input, Title } from "./style";
import React from "react";

interface InputProps {
  title: string;
  containerStyle?: StyleProp<TextStyle>;
  placeholder: string;
  onChange: (value: string) => void | undefined;
  value: string;
}
export default function SimpleInput({
  title,
  containerStyle,
  placeholder,
  onChange,
  value,
}: InputProps) {
  return (
    <Container style={containerStyle}>
      <Title>{title}</Title>
      <Input value={value} onChangeText={onChange} placeholder={placeholder} />
    </Container>
  );
}
