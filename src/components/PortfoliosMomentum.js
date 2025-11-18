import React, { useState, useMemo, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { usePortfolioGeneralRatio } from "../hooks/usePortfolios";

export default function PortfoliosMomentum({ activePortfolio }) {
    const { portfolioId, name } = activePortfolio
    const [days, setDays] = useState(30);

    useEffect(() => {
        setDays(30);
    }, [portfolioId]);

    const payLoad = useMemo(
        () => ({
            langId: 1,
            portfolioId: portfolioId,
            portfolioName: name,
            flag: 3,
        }),
        [portfolioId, name]
    );

    const { data, isLoading } = usePortfolioGeneralRatio(payLoad);

    const durations = [
        { label: "RS 1-month", value: 30, field: "RS 1-month" },
        { label: "RS 3-month", value: 90, field: "RS 3-month" },
        { label: "RS 1-year", value: 365, field: "RS 1-year" },
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
    console.log(current)
    const currentLabel = current?.label || "1 Month";

    const filteredData = useMemo(() => {
        if (!data?.ratioModel) return [];
        return data.ratioModel
            .filter((item) => item.fieldName === current.field)
            .sort((a, b) => b.value - a.value);
    }, [data, current]);

    const maxAbs = useMemo(() => {
        if (!filteredData.length) return 1;
        return Math.max(...filteredData.map((item) => Math.abs(item.value || 0)), 1);
    }, [filteredData]);

    const renderItem = useCallback(({ item }) => {
        const value = Number(item.value) || 0;
        const abs = Math.abs(value);
        const widthPercent = Math.min((abs / maxAbs) * 100, 100);
        const isPositive = value >= 0;

        return (
            <View style={styles.rowWrapper}>
                <View style={styles.row}>
                    {widthPercent > 0 && (
                        <LinearGradient
                            colors={isPositive ? ["#34AF39", "#267b29ff"] : ["#ff4444", "#cc0000"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.barFill, { width: `${widthPercent}%` }]}
                        />
                    )}

                    <Text style={styles.companyName} numberOfLines={1}>
                        {item.ticker}
                    </Text>

                    <Text style={styles.valueText}>
                        {value.toFixed(2)}%
                    </Text>
                </View>
            </View>
        );
    }, [maxAbs]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Paginator Header */}
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
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    paginationRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: "grey",
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
    listContainer: {
        paddingVertical: 4,
    },
    rowWrapper: {
        marginVertical: 4,
    },
    row: {
        paddingVertical: 4,
        backgroundColor: "#000",
        overflow: "hidden",
        position: "relative",
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    barFill: {
        position: "absolute",
        top: 0,
        bottom: 0,
    },
    companyName: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        flex: 1,
    },
    valueText: {
        color: "white",
        fontSize: 16,
        marginLeft: 12,
        textAlign: "right",
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
});