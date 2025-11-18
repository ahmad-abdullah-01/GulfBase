import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "@components/CustomHeader";

export default function NewsScreen() {
    return (
        <View style={styles.container}>
            <CustomHeader />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})