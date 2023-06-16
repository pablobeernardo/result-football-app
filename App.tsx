import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import GameEntity from './entities/game-entityes';

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
        console.log(gamesList);
      })
      .catch(error => console.log('error', error));
  }, []);

  const renderGame = ({ item }: { item: GameEntity }) => (
    <View style={styles.cardGame}>
      <View>
        <Image style={{ width: 50, height: 50 }} source={{ uri: item.time_mandante.escudo }} />
      </View>
      <View>
        <Text style={styles.result}>{item.placar}</Text>
      </View>
      <View>
        <Image style={{ width: 50, height: 50 }} source={{ uri: item.time_visitante.escudo }} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleChamp}>Campeonato Brasileiro A</Text>
      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={item => item.partida_id.toString()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    maxWidth: '100%',


  },

  titleChamp: {
    color: 'white',
    marginTop: 15,
    fontSize: 25,
    fontWeight: '700'

  },

  cardGame: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 30,
    maxWidth: '100%',


  },

  result: {
    fontWeight: 'bold',
    padding:9
    
  }


});
