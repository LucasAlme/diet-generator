import { Colors } from "@/constants/Colors";
import { STATUSBAR_HEIGHT } from "@/constants/StatusbarSize";
import { styled } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light.yellowSmartFit};
  padding-top: ${STATUSBAR_HEIGHT}px;
`;

export const Title = styled.Text`
  color: ${Colors.light.text};
  font-size: 20px;
`;

export const SubTitle = styled.Text`
  color: ${Colors.light.text};
  font-size: 18px;
`;

export const Content = styled.View`
  margin: 10px;
  padding: 20px;
  flex: 1;
  background-color: ${Colors.light.background};
  border-radius: 10px;
`;
