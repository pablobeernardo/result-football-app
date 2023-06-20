import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import GameEntity from './entities/game-entityes';
import CardResultComponent from './components/card-result-component';

export default function App() {
  const [games, setGames] = useState<GameEntity[]>([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer test_dd769753f45f74346dbf9e43181a45');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    let gamesList: GameEntity[] = [];

    fetch('https://api.api-futebol.com.br/v1/ao-vivo', requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(dataJson => {
        dataJson.map((game: any) => {
          const dataGame: GameEntity = {
            partida_id: game['partida_id'],
            campeonato: {
              campeonato_nome: game['campeonato']['nome'],
              campeonato_id: game['campeonato']['campeonato_id'],
            },
            placar: game['placar'],
            time_mandante: {
              time_id: game['time_mandante']['time_id'],
              nome_popular: game['time_mandante']['nome_popular'],
              sigla: game['time_mandante']['sigla'],
              escudo: game['time_mandante']['escudo'],
            },
            time_visitante: {
              time_id: game['time_visitante']['time_id'],
              nome_popular: game['time_visitante']['nome_popular'],
              sigla: game['time_visitante']['sigla'],
              escudo: game['time_visitante']['escudo'],
            },
            placar_mandante: game['placar_mandante'],
            placar_visitante: game['placar_visitante'],
          };

          gamesList.push(dataGame);
        });
        setGames(gamesList);
        //console.log(gamesList);
      })
      .catch(error => console.log('error', error));
  }, []);

  const renderGame = ({ item }: { item: GameEntity }) => (
    <View style={styles.containerChamp}>
      <Text style={styles.titleChamp}>{item.campeonato.campeonato_nome}</Text>
      <CardResultComponent item={item} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4682B4' }}>
      <View style={styles.container}>
        <FlatList
          data={games}
          renderItem={(renderGame)}
          keyExtractor={item => item.partida_id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4682B4',
    alignItems: 'center',
    maxWidth: '100%',


  },

  containerChamp: {
    marginTop: 20
  },

  titleChamp: {
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.8,


  },


});
