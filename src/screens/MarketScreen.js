import { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomHeader from "@components/CustomHeader";
import MarketTopTabs from "../navigation/MarketTopTabs";

export default function MarketScreen() {
    const [currentView, setCurrentView] = useState("list");
    const [activeTopTab, setActiveTopTab] = useState("Gcc");
    const tabViews = {
        GCC: [
            { key: "list", label: "Chg %, Last" },
            { key: "performance", label: "Performance View" },
            { key: "quote", label: "Quoteboard" },
            { key: "chart", label: "Chart View" },
        ],
        Globals: [
            { key: "list", label: "Global List" },
            { key: "heatmap", label: "Heatmap" },
            { key: "performance", label: "Performance" },
        ],
        Commodities: [
            { key: "list", label: "Commodities List" },
            { key: "chart", label: "Chart View" },
        ],
        HotStocks: [
            { key: "list", label: "Hot Stocks List" },
            { key: "performance", label: "Performance" },
        ],
        InterestRates: [
            { key: "list", label: "Rates List" },
            { key: "chart", label: "Chart View" },
        ],
    };

    const views = tabViews[activeTopTab] || [];
    
    return (
        <View style={styles.container}>
            <CustomHeader
                views={views}
                onViewSelect={setCurrentView}
            />
            <MarketTopTabs onTabChange={setActiveTopTab} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
