import { Text, Modal, Pressable, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Feather"

export default function PortfolioSelectModal({ visible, onClose, onCreate, onSelect, portfolios }) {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.backdrop}
                onPress={onClose}
            >
                <Pressable
                    style={styles.menuContainer}
                >
                    <FlatList
                        data={portfolios}
                        keyExtractor={(item) => item.portfolioId.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => onSelect(item)}
                            >
                                <Text style={styles.menuItemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        ListHeaderComponent={() => (
                            <TouchableOpacity
                                style={styles.createButton}
                                onPress={onCreate}
                            >
                                <Icon name='plus' size={20} color='#fff' />
                                <Text style={styles.menuItemText}>Create Portfolio</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
        backdrop: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingTop: 76,
        },
        menuContainer: {
            backgroundColor: '#333',
            width: 160,
            padding: 12,
            elevation: 8,
            borderRadius: 5
        },
        menuItem: {
            paddingVertical: 8
        },
        menuItemText: {
            color: '#fff',
        },
        createButton: {
            flexDirection: 'row',
            gap: 6,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            paddingVertical: 8
        },
})