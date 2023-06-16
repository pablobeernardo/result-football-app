import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Image } from 'expo-image';
import TeamEntity from './entities/team-entityes';
import { useEffect, useState } from 'react';

export default function App() {

  const [teams, setTeam] = useState<TeamEntity[]>([])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer test_dd769753f45f74346dbf9e43181a45 ");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    let teamsPosition: TeamEntity[] = [];

    fetch("https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/1 ", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(dataJson => {
        dataJson.map((team) => {

          const dataTeam = {
            id: team['time']['time_id'],
            team_shield_url: team['time']['escudo'],
            team_name: team['time']['nome_popular'],
          };

          teamsPosition.push(dataTeam);
        });
        setTeam(teamsPosition);
        console.log(teamsPosition);
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleChamp}>Campeonato Brasileiro A</Text>
      <View style={styles.cardGame}>
        <View>
          <Image style={{ width: 90, height: 90 }} source={{ uri: 'https://i.pinimg.com/originals/e6/55/50/e65550e3b4c182bf896333250a666837.png' }} />
          <Text style={styles.nameTeam}>Flamengo</Text>
        </View>
        <View>
          <Text style={styles.result}>2 x 0</Text>
        </View>
        <View>
          <Image style={{ width: 90, height: 90 }} source={{ uri: 'https://i.pinimg.com/originals/e6/55/50/e65550e3b4c182bf896333250a666837.png' }} />
          <Text style={styles.nameTeam}>Flamengo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',

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
    width: 320,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 30


  },

  nameTeam: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 7,
  },

  result: {
    fontSize: 25,
    fontWeight: 'bold',
  }





});
