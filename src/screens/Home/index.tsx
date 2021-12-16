import React, { useEffect, useState } from 'react';
import { FlatList, PanResponder, SafeAreaView, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Container, FlatListView, ItemText, TransportsView, Header, FLHeader, SearchInput, ModalView, ModalText, ModalButtonsView, ModalConfirmButton, ModalConfirmText, ModalCancelButton, ModalCancelText, ModalChosenView, ModalInfoText } from './styles';
import api from '../../services/api';

export default function HomeScreen() {
  const [busState, setBusState] = useState<any>([]);     //definindo uma constante para os ônibus
  const [lotState, setLotState] = useState<any>([]);   //definindo constante para as lotações
  const [busChosen, setBusChosen] = useState<any>([]);   //definindo uma constante para o onibus selecionado
  const [lotChosen, setLotChosen] = useState<any>([]);   //constante lotação selecionada
  const [modalBus, setModalBus] = useState(false);      //modal para o usuário conferir se selecionou o transporte correto
  const [modalLot, setModalLot] = useState(false);
  const [searchBusText, setSearchBusText] = useState('');       //constante para o filtro de busca
  const [searchLotText, setSearchLotText] = useState('');
  const [filteredBusList, setFilteredBusList] = useState<any>([]);
  const [filteredLotList, setFilteredLotList] = useState<any>([]);

  async function busRequest() {                          //função assíncrona para o método .get
    try {
      const response = await api.get('?a=nc&p=%&t=o');  //url reduzido pois o URLbase está setado lá no api.js da pasta services
      // console.log(response.data);    //teste para checar o .get
      setBusState(response.data);
      //console.log(busState); //testando se o busState recebeu o response.data
    } catch (error) {
      console.error(error);
    }
  }

  async function lotRequest() {                          //função semelhante à de cima ^
    try {
      const response = await api.get('?a=nc&p=%25&t=l');
      setLotState(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {                //setando o busState como o filteredBusList
    setFilteredBusList(busState)
  },[busState])

  useEffect(() => {                
    setFilteredLotList(lotState)
  },[lotState])

  useEffect(() => {         //chamando o filtro
    if (searchBusText !== '') {         //se o texto digitado for diferente de vazio,
        const filteredArray = busState.filter((item: any) =>     //a constante irá filtrar o nome do item e setar como o novo texto digitado
          item.nome.includes(searchBusText)
        )
        setFilteredBusList(filteredArray);
    } else { setFilteredBusList(busState)}
  }, [searchBusText])

  useEffect(() => {         
    if (searchLotText !== '') {         
        const filteredArray = lotState.filter((item: any) =>     
          item.nome.includes(searchLotText)
        )
        setFilteredLotList(filteredArray);
    } else { setFilteredLotList(lotState)}
  }, [searchLotText])

  useEffect(() => {       //chamando a função assíncrona busRequest
    busRequest()
  }, [])

  useEffect(() => {        //chamando a função lotRequest
    lotRequest()
  }, [])

  const busSelected = async (id: string) => {           //função chamada ao clicar em um ônibus da flatlist. ID como parâmetro único do item da flatlist
    const response = await api.get(`?a=il&p=${id}`); //template string de URL reduzida + id passado como parâmetro. Daqui vem o itinerário
    setBusChosen(response.data)       //setando o busChosen com a response
    // console.log(response.data.idlinha, 'busSTATE'); //testando se o idlinha corresponde ao item clicado na flatlist
    setModalBus(!modalBus)  //tornando o modal visível quando o usuário clicar
  }

  const lotSelected = async (id: string) => {    //funçao semelhante à de cima ^
    const response = await api.get(`?a=il&p=${id}`);
    setLotChosen(response.data)
    setModalLot(!modalLot)
  }

  useEffect(() => {                   //testando se o busChosen recebeu o response.data a partir do setBusChosen na busSelected, com coordenadas, código, idlinha e nome
    console.log(busChosen, 'BUSCHOSEN')
  }, [busChosen])

  useEffect(() => {                     // teste semelhante ao de cima ^
    console.log(lotChosen, 'LOTCHOSEN')
  }, [lotChosen])

  const renderBus = (busState: any) => (//item renderizado na flatlist, com os dados providos no primeiro json da prova: código e nome. Id apenas para o key extractor
    <TouchableOpacity
      onPress={() => busSelected(busState.id)}
    >
      <TransportsView>
        <ItemText>{busState.codigo} </ItemText>
        <ItemText>{busState.nome} </ItemText>
      </TransportsView>
    </TouchableOpacity>
  );

  const renderLot = (lotState: any) => ( //lotações renderizadas na flatlist
    <TouchableOpacity
      onPress={() => lotSelected(lotState.id)}
    >
      <TransportsView>
        <ItemText>{lotState.codigo}</ItemText>
        <ItemText>{lotState.nome}</ItemText>
      </TransportsView>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Header>Data POA</Header>
      <FLHeader>Consulta de ônibus</FLHeader>
      <SearchInput
        placeholder="Procure pelo nome da linha de ônibus"
        placeholderTextColor="#ffffff"
        autoCapitalize="characters"                //funciona apenas para o teclado do emulador
        value={searchBusText}
        onChangeText={(t) => setSearchBusText(t)}
      ></SearchInput>
      <FlatListView>
        <FlatList
          data={filteredBusList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderBus(item)}
        />
      </FlatListView>
      <FLHeader>Consulta de lotações</FLHeader>
      <SearchInput
        placeholder="Procure pelo nome da linha de lotação"
        placeholderTextColor="#ffffff"
        autoCapitalize="characters"
        value={searchLotText}
        onChangeText={(t)=> setSearchLotText(t)}
      ></SearchInput>
      <FlatListView>
        <FlatList
          data={filteredLotList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderLot(item)}
        />
      </FlatListView>

      <Modal              //modal para o usuário conferir se escolheu o transporte correto
        animationType="slide"
        visible={modalBus}
        transparent={true}
      >
        <ModalView style={{ elevation: 15 }}>
          <ModalText>
            Você selecionou o ônibus:
          </ModalText>
          <ModalChosenView>
            <ModalInfoText>{busChosen.codigo}</ModalInfoText>
            <ModalInfoText>{busChosen.nome}</ModalInfoText>
          </ModalChosenView>
          <ModalButtonsView>
            <ModalCancelButton
              onPress={() => setModalBus(!modalBus)}
            >
              <ModalCancelText>Cancelar</ModalCancelText>
            </ModalCancelButton>
            <ModalConfirmButton
              onPress={() => setModalBus(!modalBus)}
            >
              <ModalConfirmText> Confirmar </ModalConfirmText>
            </ModalConfirmButton>
          </ModalButtonsView>
        </ModalView>
      </Modal>

      <Modal              //modal para o usuário conferir se escolheu o transporte correto
        animationType="slide"
        visible={modalLot}
        transparent={true}
      >
        <ModalView style={{ elevation: 15 }}>
          <ModalText>
            Você selecionou a loteação:
          </ModalText>
          <ModalChosenView>
            <ModalInfoText>{lotChosen.codigo}</ModalInfoText>
            <ModalInfoText>{lotChosen.nome}</ModalInfoText>
          </ModalChosenView>
          <ModalButtonsView>
            <ModalCancelButton
              onPress={() => setModalLot(!modalLot)}
            >
              <ModalCancelText>Cancelar</ModalCancelText>
            </ModalCancelButton>
            <ModalConfirmButton
              onPress={() => setModalLot(!modalLot)}
            >
              <ModalConfirmText> Confirmar </ModalConfirmText>
            </ModalConfirmButton>
          </ModalButtonsView>
        </ModalView>
      </Modal>

    </Container>
  );
}

