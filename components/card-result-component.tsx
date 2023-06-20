import { View, Text, StyleSheet } from "react-native";
import TeamComponent from "./team-id-component";
import GameEntity from "../entities/game-entityes";

interface Props {
    item: GameEntity;
}


export default function CardResultComponent(props: Props) {
    return (
        <View style={styles.cardGame}>
            <TeamComponent imageUrl={props.item.time_mandante.escudo} teamName={props.item.time_mandante.nome_popular} />
            <View>
                <Text style={styles.result}>{props.item.placar_mandante} : {props.item.placar_visitante}</Text>
            </View>
            <TeamComponent imageUrl={props.item.time_visitante.escudo} teamName={props.item.time_visitante.nome_popular} />
        </View>
    )
};

const styles = StyleSheet.create({

    cardGame: {
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        maxWidth: '100%',
        width: 350,
        height: 140,
        elevation: 5


    },



    result: {
        fontWeight: '600',
        paddingHorizontal: 9,
        paddingBottom: 20,
        fontSize: 40,
        opacity: 0.8,

    },




});
