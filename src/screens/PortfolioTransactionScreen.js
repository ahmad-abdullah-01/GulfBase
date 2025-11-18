import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Pressable,
    ActivityIndicator,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather";
import { useCreatePortfolioTransactions } from "../hooks/usePortfolios";
import { useRoute, useNavigation, CommonActions } from "@react-navigation/native";
import { formatNumber } from "../utils/format";

const transactionConfigs = {
    1: { title: "Buy", color: "#4ade80", fields: ["price", "quantity", "fee", "notes", "date"] },
    2: { title: "Sell", color: "#c62828", fields: ["price", "quantity", "fee", "notes", "date"] },
    3: { title: "Add Dividend", color: "#16a34a", fields: ["amount", "notes", "date"] },
    4: { title: "Add Shares", color: "#2563eb", fields: ["shares", "amount", "notes", "date"] },
};

const labelMap = {
    price: "Share Price",
    quantity: "Quantity",
    fee: "Fee",
    notes: "Notes",
    date: "Date",
    amount: "Amount",
    shares: "Shares",
};

export default function PortfolioTransactionScreen() {
    const navigation = useNavigation();
    const { params } = useRoute();
    const { company, transactionTypeID } = params || {};

    const [inputs, setInputs] = useState({});
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { mutateAsync, isPending: loading } = useCreatePortfolioTransactions();
    const config = transactionConfigs[transactionTypeID] ?? {};

    const handleChange = (field, value) =>
        setInputs((prev) => ({ ...prev, [field]: value }));

    const handleCreateTransaction = async () => {
        try {
            const payload = {
                amount: Number(inputs.amount) || 0,
                buyDate: date.toISOString(),
                commission: Number(inputs.fee) || 0,
                companyID: company?.companyID,
                note: inputs.notes || "",
                portfolioID: company?.portfolioID,
                quantity: Number(inputs.quantity) || 0,
                sharePrice:
                    transactionTypeID === 1 || transactionTypeID === 2
                        ? Number(inputs.price) || 0
                        : transactionTypeID === 4
                            ? Number(inputs.shares) || 0
                            : 0,
                transactionTypeID,
            };

            await mutateAsync(payload);

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "tabs", state: { routes: [{ name: "Portfolio" }] } }],
                })
            );
        } catch (error) {
            console.error("❌ Transaction Error:", error);
        }
    };

    const renderInput = (field) => {
        if (field === "date") {
            return (
                <View key={field} style={styles.inputBox}>
                    <Text style={styles.label}>{labelMap[field]}</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateInput}
                    >
                        <Text style={{ color: "#fff" }}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )}
                </View>
            );
        }

        const isNumeric = ["price", "quantity", "fee", "amount", "shares"].includes(field);

        return (
            <View key={field} style={styles.inputBox}>
                <Text style={styles.label}>{labelMap[field]}</Text>
                <TextInput
                    style={styles.input}
                    value={inputs[field]}
                    onChangeText={(val) => handleChange(field, val)}
                    placeholder={labelMap[field]}
                    placeholderTextColor="grey"
                    keyboardType={isNumeric ? "numeric" : "default"}
                    multiline={field === "notes"}
                />
            </View>
        );
    };

    const totalValue =
        Number(inputs.quantity || 0) * Number(inputs.price || company?.price || 0);

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                    </Pressable>
                    <Text style={styles.headerTitle}>
                        {config.title} {company?.name || ""}
                    </Text>
                </View>

                {company && (
                    <View style={styles.priceSection}>
                        <Text style={styles.price}>{formatNumber(company.price)} USD</Text>
                        <Text style={styles.gain}>
                            {company.changePer > 0 ? "+" : ""}
                            {formatNumber(company.changePer)}%
                        </Text>
                        <Text style={styles.timestamp}>
                            {new Date(company.timestamp || Date.now()).toLocaleString()}
                        </Text>
                    </View>
                )}

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Shares</Text>
                    <Text style={styles.summaryValue}>{inputs.quantity || "0"}</Text>

                    <Text style={styles.summaryLabel}>Value</Text>
                    <Text style={styles.summaryValue}>{formatNumber(totalValue)}</Text>

                    <Text style={styles.summaryLabel}>Rate</Text>
                    <Text style={styles.summaryValue}>
                        {inputs.price || company?.price || "0.00"}
                    </Text>

                    <Text style={styles.summaryLabel}>Exchange</Text>
                    <Text style={styles.summaryValue}>
                        {company?.exchangeRate || "1.0000"}
                    </Text>

                    <Text style={styles.summaryLabel}>Fee</Text>
                    <Text style={styles.summaryValue}>{inputs.fee || "0.00"}</Text>
                </View>

                <View style={styles.form}>
                    {config.fields?.map(renderInput)}
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: config.color }, loading && { opacity: 0.6 }]}
                    onPress={handleCreateTransaction}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveText}>{config.title}</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 16 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    backButton: { marginRight: 10 },
    headerTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        flex: 1,
    },
    priceSection: { alignItems: "center", marginBottom: 15 },
    price: { fontSize: 22, fontWeight: "bold", color: "#fff" },
    gain: { fontSize: 14, color: "#4ade80", marginVertical: 2 },
    timestamp: { fontSize: 12, color: "#aaa" },
    summaryRow: {
        backgroundColor: "#111",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    summaryLabel: { color: "#888", fontSize: 13, marginTop: 6 },
    summaryValue: { color: "#fff", fontSize: 15, fontWeight: "500" },
    form: { marginVertical: 10 },
    inputBox: { marginBottom: 12 },
    label: { color: "#aaa", fontSize: 13, marginBottom: 3 },
    input: {
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 4,
        color: "#fff",
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#161b22",
    },
    dateInput: {
        borderWidth: 1,
        borderColor: "#333",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: "#161b22",
    },
})