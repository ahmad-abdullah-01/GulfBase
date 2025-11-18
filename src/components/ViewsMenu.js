import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ViewsMenu({ visible, onClose, onSelect, views }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                onPress={onClose}
                activeOpacity={1}
            >
                <View style={styles.menuContainer}>
                    {views.map(item => (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => onSelect(item.key)}
                        >
                            <Text style={styles.menuItem}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 40
    },
    menuContainer: {
        backgroundColor: '#333',
        width: 160,
        padding: 12,
        borderRadius: 5,
        elevation: 8
    },
    menuItem: {
        fontSize: 14,
        color: '#fff',
        paddingVertical: 8
    }
})