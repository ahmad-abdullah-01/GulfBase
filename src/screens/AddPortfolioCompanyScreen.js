import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { usePortfolio } from "../context/PortfoliosContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreatePortfolioCompanies, useAllCompanies } from "../hooks/usePortfolios";

export default function AddPortfolioCompany() {
  const route = useRoute()
  const selectedCompanyParam = route.params?.selectedCompany
  const navigation = useNavigation();
  const [selectedCompany, setSelectedCompany] = useState("Select Company");
  const [quantity, setQuantity] = useState("");
  const [sharePrice, setSharePrice] = useState("");
  const [commisson, setCommisson] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [notes, setNotes] = useState("");;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const createCompanyMutation = useCreatePortfolioCompanies();
  const { activePortfolio } = usePortfolio();

  useEffect(() => {
    if (selectedCompanyParam) {
      setSelectedCompany(selectedCompanyParam.label)
      setCompanyId(selectedCompanyParam.value)
    }
  }, [])

  const clearForm = () => {
    setSelectedCompany("Select Company");
    setQuantity("");
    setSharePrice("");
    setCommisson("");
    setCompanyId(null);
    setNotes("");
    setSearchText("");
    setDate(new Date());
    setIsDropdownOpen(false);
  };

  const handleCreateCompany = async () => {
    if (!activePortfolio) return;
    try {
      const payLoad = {
        comission: Number(commisson),
        portfolioID: activePortfolio.portfolioId,
        companyId: companyId,
        note: notes,
        quantity: Number(quantity),
        buyDate: date.toISOString(),
        sharePrice: Number(sharePrice),
      };

      const newCompany = await createCompanyMutation.mutateAsync(payLoad);
      console.log("✅ Added company:", newCompany);
      clearForm();
    } catch (error) {
      console.log("❌ Error adding company:", error);
    } finally {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "tabs",
              state: { routes: [{ name: "Portfolio" }] },
            },
          ],
        })
      );
    }
  };

  return (
    <View style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.heading}>Add to Portfolio</Text>
          <Text style={styles.subheading}>{selectedCompany}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantity"
            placeholderTextColor="#666"
          />
          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={sharePrice}
            onChangeText={setSharePrice}
            placeholder="Share Price"
            placeholderTextColor="#666"
          />
          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={commisson}
            onChangeText={setCommisson}
            placeholder="Commission"
            placeholderTextColor="#666"
          />
          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes (optional)"
            placeholderTextColor="#666"
          />
          <View style={styles.divider} />

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            <Icon name="calendar" size={18} color="#fff" />
          </TouchableOpacity>

          {showDatePicker && Platform.OS === "android" && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {showDatePicker && Platform.OS === "ios" && (
            <Modal transparent animationType="slide">
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) setDate(selectedDate);
                    }}
                    style={styles.iosPicker}
                  />
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.addButton} onPress={handleCreateCompany}>
        <Text style={styles.addButtonText}>Add Company</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginBottom: 16,
  },
  dropdownSelector: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 16,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
  },
  dropdownArea: {
    maxHeight: 250,
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 10,
  },
  companyItem: {
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    fontSize: 15,
  },
  label: {
    color: "#888",
    fontSize: 13,
    marginBottom: 6,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 14,
    marginBottom: 20,
  },
  dateText: {
    color: "#fff",
    fontSize: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#111",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  iosPicker: {
    backgroundColor: "#111",
    color: "#fff",
  },
  modalButton: {
    backgroundColor: "#1D8FF6",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#1D8FF6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subheading: {
    color: "#1D8FF6",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    letterSpacing: 0.3,
  },
});
