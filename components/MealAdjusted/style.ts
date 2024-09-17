import { Modal } from "react-native";
import { styled } from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 0px;
`;

export const Title = styled.Text``;

export const MealContainer = styled.View`
  margin-bottom: 20px;
`;

export const MealTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ItemName = styled.Text`
  font-size: 16px;
  width: 70%;
`;

export const ItemContainer = styled.View`
  margin-vertical: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemDetails = styled.Text`
  font-size: 14px;
  color: "gray";
`;

export const TextOtherOption = styled.Text`
  font-size: 14px;
  text-decoration: underline;
  padding-top: 2px;
`;

export const OtherOptionTouchable = styled.TouchableOpacity``;

export const ContainerModal = styled.View`
  flex-direction: row;
`;

export const ModalOptions = styled(Modal)`
  border-width: 1px;
  border-color: green;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  align-self: center;
  padding-bottom: 10px;
`;

export const ContainerOption = styled.View`
  padding-horizontal: 20px;
`;
