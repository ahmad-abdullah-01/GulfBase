import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
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

// --- 🔹 Constants
const transactionConfigs = {
  1: { title: "Buy Stock", color: "#4ade80", fields: ["price", "quantity", "fee", "notes", "date"] },
  2: { title: "Sell Stock", color: "#c62828", fields: ["price", "quantity", "fee", "notes", "date"] },
  3: { title: "Add Dividend", color: "#4ade80", fields: ["amount", "notes", "date"] },
  4: { title: "Add Shares", color: "blue", fields: ["shares", "amount", "notes", "date"] },
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

export default function PortfolioTransactionModal({ visible, onClose, transactionTypeID }) {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { company } = params || {};

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
        commision: Number(inputs.fee) || 0,
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

      console.log("📦 Sending payload:", payload);
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

  // --- 🔹 Input Renderer
  const renderInput = (field) => {
    if (field === "date") {
      return (
        <View key={field} style={styles.inputBox}>
          <Text style={styles.label}>{labelMap[field]}</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateInput}
          >
            <Text>{date.toLocaleDateString()}</Text>
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
          style={[
            styles.input,
            field === "notes" && { height: 40, textAlignVertical: "top" },
          ]}
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

  // --- 🔹 UI
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{config.title}</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Icon name="x" size={18} color="#fff" />
              </Pressable>
            </View>

            {company && (
              <View style={styles.priceSection}>
                <Text style={styles.price}>{formatNumber(company.price)}</Text>
                <Text style={styles.gain}>{formatNumber(company.changePer)}%</Text>
                <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
              </View>
            )}

            <View style={styles.form}>
              {config.fields?.map(renderInput)}
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: config.color },
                loading && { opacity: 0.6 },
              ]}
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
      </View>
    </Modal>
  );
}

// --- 🔹 Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 10,
  },
  modalContainer: {
    backgroundColor: "#141414",
    borderRadius: 10,
    padding: 16,
    maxHeight: "95%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  closeButton: {
    position: "absolute",
    right: 0,
    backgroundColor: "#f87171",
    padding: 6,
    borderRadius: 16,
  },
  priceSection: {
    alignItems: "center",
    marginBottom: 15,
  },
  price: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  gain: { fontSize: 14, color: "#4ade80", marginVertical: 2 },
  date: { fontSize: 12, color: "#aaa" },
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
  saveButton: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
