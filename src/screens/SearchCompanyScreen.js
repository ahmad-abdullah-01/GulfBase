import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,

} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useAllCompanies } from "../hooks/usePortfolios";
import { useNavigation } from "@react-navigation/native";

export default function SearchCompanyScreen() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const { data: companiesData = [] } = useAllCompanies();

    const companies = companiesData.map((c) => ({
        label: `${c.company} (${c.ticker})`,
        value: c.companyId,
        name: c.company,
        ticker: c.ticker,
    }));

    const filteredCompanies = companies.filter(
        (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.ticker.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Add to portfolio</Text>
            </View>
            <View style={styles.searchRow}>
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search"
                    placeholderTextColor="#7a7a7a"
                    selectionColor="#fff"
                    underlineColorAndroid="transparent"
                    autoFocus={true}
                />

                {/* Always show search icon */}


                {/* Show clear button only when text exists */}
                {searchText !== "" && (
                    <TouchableOpacity
                        onPress={() => setSearchText("")}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        style={styles.clearTouch}
                    >
                        <Icon name="x" size={22} color="#9b9b9b" style={styles.searchIcon} />
                    </TouchableOpacity>
                )}
                <Icon name="search" size={20} color="#9b9b9b" style={styles.searchIcon} />
            </View>

            {/* LIST */}
            <FlatList
                data={searchText.trim().length === 0 ? [] : filteredCompanies}
                keyExtractor={(item) => item.value.toString()}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("addCompany", { selectedCompany: item })
                        }}
                    >
                        <Text style={styles.companyItem}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        height: 44,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#2b2b2b",
        marginBottom: 6,
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 18,
        paddingVertical: 8,
        paddingLeft: 2,
    },
    searchIcon: {
        marginLeft: 8,
    },
    clearTouch: {
        marginLeft: 8,
        paddingHorizontal: 6,
    },
    clearText: {
        color: "#9b9b9b",
        fontSize: 18,
        lineHeight: 18,
    },
    companyItem: {
        color: "#4da6ff",
        fontSize: 16,
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#262626",
    },
    headerContainer: {
        backgroundColor: '#141414',
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 14,
    },
});
