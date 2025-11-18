import { useState } from "react"
import Icon from "react-native-vector-icons/Feather"
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"


export default function PortfolioCreateModal({ visible, onClose, onCreate, currencies, isLoading }) {

    const [form, setForm] = useState({ name: '', cash: '', currencyID: null })
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
    const handleSubmit = () => {
        if (form.name.trim()) onCreate({ ...form, cash: Number(form.cash) })
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            transparent
            animationType="fade"
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Create Portfolio</Text>

                    {['name', 'cash'].map((field) => (
                        <View key={field}>
                            <Text style={styles.label}>{field === 'name' ? 'Name' : 'Cash'}</Text>
                            <TextInput
                                value={form[field]}
                                onChangeText={(v) => handleChange(field, v)}
                                placeholder={field === 'name' ? 'Portfolio Name' : 'Initial Cash'}
                                keyboardType={field === 'cash' ? 'numeric' : 'default'}
                                style={styles.input}
                            />
                        </View>

                    ))}

                    <TouchableOpacity
                        style={styles.dropdownSelector}
                        onPress={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <Text style={styles.dropdownText}>
                            {form.currencyID ?
                                currencies?.find((c) => c.currencyID === form.currencyID)?.currencyID
                                : 'Select Currency'}
                        </Text>
                        <Icon
                            name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                            size={22}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    {dropdownOpen && (
                        <View>
                            <FlatList
                                data={currencies}
                                keyExtractor={item => item.currencyID.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setDropdownOpen(false)
                                            handleChange('currencyID', item.currencyID)
                                        }}
                                    >
                                        <Text style={styles.currencyItem}>{item.currency}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}

                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        {isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.saveButton}>Save</Text>
                            </TouchableOpacity>
                        )
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        backgroundColor: "#141414",
        width: "90%",
        maxHeight: "80%",
        padding: 16,
        gap: 24,
        borderRadius: 8,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        paddingBottom: 4
    },
    label: { color: "#fff", marginBottom: 8 },
    input: {
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 4,
        paddingHorizontal: 12,
        color: "#fff"
    },
    dropdownSelector: {
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        // marginBottom: 16,
    },
    dropdownText: {
        color: "#fff",
        fontSize: 16,
    },
    currencyItem: {
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "#222",
        fontSize: 15,
    },
    actionRow: { flexDirection: "row", justifyContent: "space-between" },
    saveButton: {
        backgroundColor: "#1D8FF6",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    cancelButton: {
        backgroundColor: "tomato",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
})