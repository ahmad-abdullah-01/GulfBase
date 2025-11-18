import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PortfolioTransactionModal from "../components/PortfolioTransactionModal";

export default function PortfolioStockScreen({ company }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionTypeID, setTransactionTypeID] = useState(null);

  const openModal = (typeId) => {
    setTransactionTypeID(typeId);
    setIsModalOpen(true);
  };

  return (
    <View style={styles.container}>
      {/* Buy */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4ade80" }]}
        onPress={() => openModal(1)}
      >
        <Text style={styles.text}>Buy</Text>
      </TouchableOpacity>

      {/* Sell */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#c62828" }]}
        onPress={() => openModal(2)}
      >
        <Text style={styles.text}>Sell</Text>
      </TouchableOpacity>

      {/* Add Dividend */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#16a34a" }]}
        onPress={() => openModal(3)}
      >
        <Text style={styles.text}>Add Dividend</Text>
      </TouchableOpacity>

      {/* Add Shares */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2563eb" }]}
        onPress={() => openModal(4)}
      >
        <Text style={styles.text}>Add Shares</Text>
      </TouchableOpacity>

      {/* Modal */}
      {transactionTypeID && (
        <PortfolioTransactionModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transactionTypeID={transactionTypeID}
          company={company}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#000",
  },
  button: {
    flexBasis: "45%",
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
