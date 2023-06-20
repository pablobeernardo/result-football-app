import { View, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image';

interface Props {
    imageUrl: string;
    teamName: string;
}

export default function TeamComponent(props: Props) {
    return (
        <View style={styles.cardClub}>
            <Image contentFit='contain' style={{ width: 60, height: 60 }} source={{ uri: props.imageUrl }} />
            <Text style={styles.itemName}>{props.teamName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    cardClub: {
        alignItems: 'center',
        marginHorizontal: 30,
    },

    itemName: {
        marginTop: 8,
        textAlign: 'center',
        opacity: 0.8,


    }


});
