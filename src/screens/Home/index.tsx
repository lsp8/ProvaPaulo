import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Modal, Linking } from 'react-native';
import {
  Container,
  FlatListView,
  ItemText,
  TransportsView,
  Header,
  FLHeader,
  SearchInput,
  ModalView,
  ModalText,
  ModalButtonsView,
  ModalConfirmButton,
  ModalConfirmText,
  ModalCancelButton,
  ModalCancelText,
  ModalChosenView,
  ModalInfoText,
  ModalContainer
} from './styles';
import api from '../../services/api';

export default function HomeScreen() {
  const [busState, setBusState] = useState<any>([]);                 //definindo uma constante para os ônibus
  const [lotState, setLotState] = useState<any>([]);                 //^ semelhante, porém para lotações
  const [busChosen, setBusChosen] = useState<any>([]);               //definindo uma constante para o ônibus selecionado
  const [lotChosen, setLotChosen] = useState<any>([]);
  const [modalBus, setModalBus] = useState(false);                   //modal para o usuário conferir se selecionou o transporte correto
  const [modalLot, setModalLot] = useState(false);
  const [searchBusText, setSearchBusText] = useState('');            //constante para o filtro de busca
  const [searchLotText, setSearchLotText] = useState('');
  const [filteredBusList, setFilteredBusList] = useState<any>([]);  //constante que será chamada no data da FlatList
  const [filteredLotList, setFilteredLotList] = useState<any>([]);

  async function busRequest() {                         //função assíncrona para o método .get
    try {
      const response = await api.get('?a=nc&p=%&t=o');  //url reduzido pois o URLbase está setado lá no api.js da pasta services
      // console.log(response.data);                    //teste para checar o .get
      setBusState(response.data);
      //console.log(busState);                          //testando se o busState recebeu a resposta
    } catch (error) {
      console.error(error);
    }
  }

  async function lotRequest() {
    try {
      const response = await api.get('?a=nc&p=%25&t=l');
      setLotState(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {       //chamando a função assíncrona busRequest
    busRequest()
  }, [])

  useEffect(() => {
    lotRequest()
  }, [])

  useEffect(() => {       //setando o busState como o filteredBusList
    setFilteredBusList(busState)
  }, [busState])

  useEffect(() => {
    setFilteredLotList(lotState)
  }, [lotState])

  useEffect(() => {                                               //chamando o filtro
    if (searchBusText !== '') {                                   //se o texto digitado for diferente de vazio,
      const filteredArray = busState.filter((item: any) =>     //o método irá filtrar o nome do item e setar como o novo texto digitado
        item.nome.includes(searchBusText)                      //utilizei o método 'includes' para renderizar todas as linhas que possuírem tais caracteres
      )
      setFilteredBusList(filteredArray);
    } else { setFilteredBusList(busState) }                      //se o texto de busca estiver vazio, irei renderizar a lista completa
  }, [searchBusText])

  useEffect(() => {
    if (searchLotText !== '') {
      const filteredArray = lotState.filter((item: any) =>
        item.nome.includes(searchLotText)
      )
      setFilteredLotList(filteredArray);
    } else { setFilteredLotList(lotState) }
  }, [searchLotText])

  const busSelected = async (id: string) => {           //função chamada ao clicar em um ônibus da flatlist. ID como parâmetro único do item da flatlist
    const response = await api.get(`?a=il&p=${id}`);    //template string de URL reduzida + id passado como parâmetro. Daqui vem o itinerário                          
    // console.log(response.data.idlinha, 'busSTATE');  //testando se o idlinha corresponde ao item clicado na flatlist 
    let itinArray: string[][] = []                      //variável com um array de coordenadas, que são também um array de lat e long.         
    Object.values(response.data).map((item: any) => {     //nesta função os itens são mapeados e, caso o tipo do item seja um objeto(como é o caso do array de
      if (typeof item === 'object') {                     //coordenadas)o método push insere os valores das coordenadas na variável. 
        itinArray.push([item?.lat, item?.lng])
      } else {
        console.log(item)
      }
    })
    let busChosen = {                                    //aqui a variável de itinArray, uma string com 2 arrays, é passada à prop 'coordenadas'
      idlinha: response.data.idlinha,
      nome: response.data.nome,
      codigo: response.data.codigo,
      coordenadas: itinArray,
    }
    setBusChosen(busChosen)                            //setando o busChosen com a resposta
    setModalBus(!modalBus)                             //tornando o modal visível quando o usuário clicar

  }

  const lotSelected = async (id: string) => {           //acredito que esta função poderia ser omitida e eu poderia utilizar melhor a função acima.
    const response = await api.get(`?a=il&p=${id}`);    //Digo isto pois o .get é realizado no mesmo URL, e não encontrei até o momento nenhuma lotação
    let itinArray: string[][] = []                      //que tivesse o mesmo ID de um ônibus. Para evitar a possibilidade de duplicidade de ID,
    Object.values(response.data).map((item: any) => {     //resolvi manter esta função.
      if (typeof item === 'object') {
        itinArray.push([item?.lat, item?.lng])
      } else {
        console.log(item)
      }
    })
    let lotChosen = {
      idlinha: response.data.idlinha,
      nome: response.data.nome,
      codigo: response.data.codigo,
      coordenadas: itinArray,
    }
    setLotChosen(lotChosen)
    setModalLot(!modalLot)
  }

  useEffect(() => {
    console.log(busChosen, 'BUSCHOSEN')  //testando se o busChosen recebeu o response.data a partir do setBusChosen na busSelected, com coordenadas, código, idlinha e nome
  }, [busChosen])

  useEffect(() => {
    console.log(lotChosen, 'LOTCHOSEN')
  }, [lotChosen])

  const renderBus = (busState: any) => (//item renderizado na flatlist, com os dados providos no primeiro json da prova: código e nome, já o
    <TouchableOpacity                   // Id será utilizado apenas para o key extractor da FlatList
      onPress={() => busSelected(busState.id)}
    >
      <TransportsView>
        <ItemText>{busState.codigo} </ItemText>
        <ItemText>{busState.nome} </ItemText>
      </TransportsView>
    </TouchableOpacity>
  );

  const renderLot = (lotState: any) => (
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
        placeholderTextColor="#1bcc91"
        autoCapitalize="characters"          //funciona apenas para o teclado do emulador
        value={searchBusText}
        onChangeText={(t) => setSearchBusText(t)} //função chamada para setar o state novo do searchBusText conforme o usuário digita
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
        placeholderTextColor="#1bcc91"
        autoCapitalize="characters"
        value={searchLotText}
        onChangeText={(t) => setSearchLotText(t)}
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
        <ModalContainer>
          <ModalView>
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
                onPress={() => {
                  setModalBus(!modalBus)
                  Linking.openURL(`google.navigation:q=${busChosen.coordenadas[0][0]},${busChosen.coordenadas[0][1]}`) //indexação das coordenadas de Lat e Long
                }}    //aqui, por motivos de performance, é possível substituir o 'google.navigation:' por 'geo:1,1?', com prejuízo de renderização de rota. 
              >
                <ModalConfirmText> Confirmar </ModalConfirmText>
              </ModalConfirmButton>
            </ModalButtonsView>
          </ModalView>
        </ModalContainer>
      </Modal>

      <Modal
        animationType="slide"
        visible={modalLot}
        transparent={true}
      >
        <ModalContainer>
          <ModalView>
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
                onPress={() => {
                  setModalLot(!modalLot)
                  Linking.openURL(`google.navigation:q=${lotChosen.coordenadas[0][0]},${lotChosen.coordenadas[0][1]}`)
                }}
              >
                <ModalConfirmText> Confirmar </ModalConfirmText>
              </ModalConfirmButton>
            </ModalButtonsView>
          </ModalView>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

