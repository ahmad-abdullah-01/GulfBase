import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function SearchCompanyButton() {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('SearchCompany')}>
            <Icon name="add" size={20} color='#fff' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: "#1D8FF6",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        right: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 10000
    }
})