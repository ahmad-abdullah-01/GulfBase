import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, Pressable, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { usePortfolioGeneralRatio } from "../hooks/usePortfolios";

export default function PortfolioQuoteBoard({ activePortfolio }) {
    const { portfolioId, name } = activePortfolio
    const [days, setDays] = useState(1)

    useEffect(() => {
        setDays(1)
    }, [portfolioId])

    const payLoad = useMemo(
        () => ({
            langId: 1,
            portfolioId: portfolioId,
            portfolioName: name,
            flag: 2,
        }),
        [portfolioId, name]
    );
    const { data, isLoading } = usePortfolioGeneralRatio(payLoad);

    const durations = [
        { label: "1 Day", value: 1, field: "1-Day Change" },
        { label: "1 Week", value: 7, field: "1-Week Change" },
        { label: "1 Month", value: 30, field: "1-Month Change" },
        { label: "3 Months", value: 90, field: "3-Month Change" },
        { label: "1 Year", value: 365, field: "1-Year Change" },
        { label: "3 Years", value: 1095, field: "3-Year Change" },
        { label: "5 Years", value: 1825, field: "5-Year Change" },
        { label: "YTD", value: "ytd", field: "YTD Change" },
    ];

    const handlePrev = () => {
        const i = durations.findIndex((d) => d.value === days);
        if (i > 0) setDays(durations[i - 1].value);
    };

    const handleNext = () => {
        const i = durations.findIndex((d) => d.value === days);
        if (i < durations.length - 1) setDays(durations[i + 1].value);
    };

    const current = durations.find((d) => d.value === days);
    const currentLabel = current?.label || "1 Month";

    const filteredData = useMemo(() => {
        if (!data?.ratioModel) return [];
        return data.ratioModel.filter((item) => item.fieldName === current.field);
    }, [data, current]);
    console.log(filteredData)

    const renderItem = (({ item }) => {

        const bgColor = item.value > 0 ? '#07551B' : item.value < 0 ? '#A60023' : '#505050';

        return (
            <Pressable
                style={[styles.tile, { backgroundColor: bgColor }]}
            >
                <Text style={styles.marketName}>{item?.ticker}</Text>
                <Text style={{ color: '#fff' }}>High {item.highest}</Text>
                <Text style={{ color: '#fff' }}>Low {item.lowest}</Text>

                <Text style={styles.lastValue}>
                    {item.value.toFixed(2)}%
                </Text>
            </Pressable>
        )
    })
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.paginationRow}>
                <TouchableOpacity
                    onPress={handlePrev}
                    disabled={days === durations[0].value}
                    style={days === durations[0].value && styles.disabledArrow}
                >
                    <Icon name="chevron-left" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.periodLabel}>{currentLabel}</Text>

                <TouchableOpacity
                    onPress={handleNext}
                    disabled={days === durations[durations.length - 1].value}
                    style={
                        days === durations[durations.length - 1].value &&
                        styles.disabledArrow
                    }
                >
                    <Icon name="chevron-right" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.companyID}-${index}`}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No data for this duration</Text>
                }
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    paginationRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#222",
        backgroundColor: "#000",
    },
    periodLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginHorizontal: 10,
    },
    disabledArrow: {
        opacity: 0.3,
    },
    emptyText: {
        color: "grey",
        textAlign: "center",
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    loadingText: {
        color: "#aaa",
        fontSize: 16,
    },
    grid: {
        paddingHorizontal: 4,
        paddingBottom: 10,
    },
    tile: {
        flex: 1,
        margin: 3,
        paddingHorizontal: 10,
        paddingVertical: 6,
        minHeight: 90,
        justifyContent: "space-between",
        borderRadius: 4,
    },
    marketName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },
    subText: {
        color: "#ddd",
        fontSize: 11,
        lineHeight: 16,
    },
    lastValue: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "right",

    },
});
