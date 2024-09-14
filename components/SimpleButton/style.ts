import { Colors } from "@/constants/Colors";
import { styled } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.light.yellowSmartFit};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${Colors.light.text};
  font-weight: bold;
`;
