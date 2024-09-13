import { Colors } from "@/constants/Colors";
import { styled } from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-vertical: 20px;
`;

export const TouchableSelector = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  border-width: 1px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border-color: ${Colors.light.yellowSmartFit};
`;

export const TitleGender = styled.Text`
  font-size: 16px;
  color: ${Colors.light.text};
  padding-horizontal: 10px;
`;

export const Separator = styled.View`
  width: 20%;
`;

interface SelectedButton {
  isWomenSelected: boolean;
  isManSelected: boolean;
}

export const BackgroundSelected = styled.View<SelectedButton>`
  background-color: ${({ isWomenSelected, isManSelected }) =>
    isManSelected || isWomenSelected
      ? Colors.light.yellowSmartFit
      : Colors.light.background};
  height: 15px;
  width: 15px;
  border-radius: 9px;
`;

export const RowInputContainer = styled.View`
  width: 40%;
  flex-direction: row;
  align-items: center;
`;
