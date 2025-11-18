import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "@components/CustomHeader";
import { ChartView, pieChart } from "../components/charts";

export default function WatchListScreen() {
    const [currentView, setCurrentView] = useState('list')

    const productShare = [
        { category: 'Product A', value: 55 },
        { category: 'Product B', value: 25 },
        { category: 'Product C', value: 20 },
    ];

    const views = [
        { key: 'list', label: 'Chg %, Last' },
        { key: 'performance', label: 'Performance View' },
        { key: 'quote', label: 'Quoteboard' },
        { key: 'chart', label: 'Chart View' },
    ]
    return (
        <View style={styles.container}>
            <CustomHeader
                views={views}
                onViewSelect={setCurrentView}
            />

            <View style={{ padding: 16 }}>
                <ChartView config={pieChart(productShare)} style={{ height: 250, marginTop: 20 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})