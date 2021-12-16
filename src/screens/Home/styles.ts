import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #1bcc91;
`;

export const Header= styled(Text)`
  font-size: 25px;
  color:#ffffff;
  font-weight: bold;
`;
export const TransportsView = styled(View)`
  width:350px;
  border-width: 1px;
  background-color: #ffffff;
  align-self: center;
  margin-top: 1%;
  border-radius: 2px;
`;
export const ItemText = styled(Text)`
  font-size: 15px;
  color:#1bcc91;
  font-weight: bold;
`;
export const FlatListView = styled(View)`
  height:32%;
`;

export const FLHeader = styled(Text)`
  font-size: 20px;
  color:#ffffff;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 2%;
`;

export const SearchInput = styled(TextInput)`
  width: 350px;
  color: #1bcc91;
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  background-color: #e0e0e0;
  border-radius: 5px;
  border-color: #000000;
  border-width: 1px;
  margin-bottom: 2%;
`;

export const ModalView = styled(View)`
  height:60%;
  width:90%; 
  border-width: 30px;
  border-radius: 30px;
  border-color:#000000;
  align-items: center;
  background-color: #ffffff;
  margin-top: 50%;
  align-self: center;
`;

export const ModalText = styled(Text)`
  color:#1bcc91;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-top: 5%;
`;

export const ModalButtonsView = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  width:90%;
  margin-top:20%;
`;

export const ModalConfirmButton = styled(TouchableOpacity)`
  background-color:#1bcc91;
  border-radius: 20px;
  padding: 15px;
`;

export const ModalConfirmText = styled(Text)`
  font-size: 20px;
  color:#ffffff;
`;

export const ModalCancelButton = styled(TouchableOpacity)`
  background-color:#ffffff;
  border-radius: 20px;
  padding: 5px;
`;

export const ModalCancelText = styled(Text)`
  font-size: 20px;
  color:#787574;
`;

export const ModalChosenView = styled(View)`
  background-color: #1bcc91;
  margin-top: 10%;
  padding: 20px;
  border-radius: 10px;
`;

export const ModalButtonText = styled(Text)`
  color:#1bcc91;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-top: 5%;
`;

export const ModalInfoText = styled(Text)`
  color:#ffffff;
  font-size:25px;
  font-weight: bold;
  align-self: center;
`;