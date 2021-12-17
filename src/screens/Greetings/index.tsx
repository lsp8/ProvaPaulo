import React from 'react';
import { Button, Container, HeaderText, HeaderView, Intro, ButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function GreetingsScreen() {

    const navigation = useNavigation();
    const handlePress = () => {
        //@ts-ignore
        navigation.navigate('homeScreen')
    }
    return (
        <Container>
            <HeaderView style={{ elevation: 5 }}>
                <HeaderText>Bem-vindo!</HeaderText>
            </HeaderView>
            <Intro>
                Este aplicativo foi desenvolvido entre os dias 14 e 17 de dezembro de 2021,
                a partir de instruções passadas em uma prova técnica.
                Esta prova exige a consulta a uma API do dataPOA e a renderização de dados referentes a
                ônibus e loteações. Na próxima página, você irá encontrar duas listas, com itens
                clicáveis e com busca por nome implementada.Ambas as listas são roláveis. A busca foi implementada de modo a buscar 
                por todos os itens que incluírem os caracteres digitados. Ao selecionar um item, um modal de
                confirmação irá aparecer com o nome e código da linha. Para ser direcionado ao GoogleMaps,
                confirme sua seleção.
                Espero que goste!
                Atenciosamente, Paulo.
            </Intro>
            <Button style={{ elevation: 10 }}
                onPress={() => { handlePress() }}
            >
                <ButtonText>Para o App!</ButtonText>
            </Button>
        </Container>
    );
};


