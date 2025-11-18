import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ChartView, pieChart } from './charts';
import { usePortfolioWidget, usePortfolioDashboardData } from '../hooks/usePortfolios';

export default function PortfolioExposure({ activePortfolio }) {
    const { portfolioId } = activePortfolio;

    const { data: widgetsData, isLoading: widgetsLoading } = usePortfolioWidget();

    const widgets =
        widgetsData?.filter(item => [9, 15, 10, 20, 16, 12, 11, 14, 13, 17].includes(item.id)) ??
        [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentWidget = widgets[currentIndex];
    console.log(currentWidget)
    const payLoad = {
        portfolioId,
        langID: 1,
        type: currentWidget?.widgetKey,
    };

    const { data: dashboard, isFetching: dashboardLoading } =
        usePortfolioDashboardData(payLoad);

    const filteredChartData =
        dashboard?.chartData?.map(item => ({
            name: item.name,
            y: item.y,
        })) ?? [];
console.log(filteredChartData)
    console.log(filteredChartData)

    const handleNext = () =>
        setCurrentIndex(i => (i + 1) % (widgets.length || 1));
    const handlePrev = () =>
        setCurrentIndex(
            i => (i - 1 + (widgets.length || 1)) % (widgets.length || 1),
        );

    if (widgetsLoading || !widgets.length || !currentWidget) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingText}>Loading widgets...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.paginationRow}>
                <TouchableOpacity onPress={handlePrev}>
                    <Icon name="chevron-left" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.periodLabel}>{currentWidget.name}</Text>

                <TouchableOpacity onPress={handleNext}>
                    <Icon name="chevron-right" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {dashboardLoading ? (
                <ActivityIndicator color="#fff" style={{ marginTop: 20 }} />
            ) : (
                <ChartView config={pieChart(filteredChartData)} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    paginationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: 'grey',
    },
    periodLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
    },
    dashboardText: {
        color: '#fff',
        marginTop: 20,
        fontSize: 12,
    },
});
