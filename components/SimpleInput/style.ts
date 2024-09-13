import { Colors } from "@/constants/Colors";
import { styled } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Input = styled.TextInput`
  border-top-width: 1.3px;
  border-bottom-width: 1.3px;
  border-left-width: 1.3px;
  border-right-width: 1.3px;
  border-radius: 7px;
  border-color: ${Colors.light.text};
  height: 30px;
  width: 100%;
  padding-left: 5px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${Colors.light.text};
`;
