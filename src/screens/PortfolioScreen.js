import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { usePortfolio } from "../context/PortfoliosContext";
import CustomHeader from "@components/CustomHeader";
import PortfolioTopBar from "@components/PortfolioTopBar";
import SearchCompanyButton from "../components/SearchCompanyButton";
import PortfolioValuation from "../components/PortfolioValuation";
import PortfolioPerformance from "../components/PortfolioPerformance";
import PortfoliosMomentum from "../components/PortfoliosMomentum";
import PortfolioQuoteBoard from "../components/PortfolioQuoteBoard";
import PortfolioAllocation from "../components/PortfolioAllocation";
import PortfolioComparitive from "../components/PortfolioComparitive";
import PortfolioBubble from "../components/PortfolioBubble";
import PortfolioExposure from "../components/PortfolioExposure";
import PortfolioMarketOdds from "../components/PortfolioMarketOdds";

export default function PortfolioScreen() {
    const { activePortfolio, setActivePortfolio } = usePortfolio()
    const [currentView, setCurrentView] = useState('valuation')

    const views = [
        { key: 'valuation', label: 'Valuation Measure' },
        { key: 'performance', label: 'Performance View' },
        { key: 'quote', label: 'Quoteboard View' },
        { key: 'momentum', label: 'Momentum View' },
        { key: 'chart', label: 'Chart View' },
        { key: 'closeVsPE', label: 'Close Vs. P/E' },
        { key: 'closeVsTTM', label: 'Close Vs. TTM EPS' },
        { key: 'allocation', label: 'Sector Allocation' },
        { key: 'comparitive', label: 'Comparitive' },
        { key: 'bubble', label: 'Bubble Chart' },
        { key: 'exposure', label: 'Exposure' },
        { key: 'marketOdds', label: 'Market Odds' },
    ]

    return (
        <View style={styles.container}>
            <CustomHeader
                views={views}
                onViewSelect={setCurrentView}
            />
            <PortfolioTopBar
                activePortfolio={activePortfolio}
                setActivePortfolio={setActivePortfolio}
            />
            <SearchCompanyButton />

            {currentView === 'valuation' && <PortfolioValuation activePortfolio={activePortfolio} />}
            {currentView === 'performance' && <PortfolioPerformance activePortfolio={activePortfolio} />}
            {currentView === 'quote' && <PortfolioQuoteBoard activePortfolio={activePortfolio} />}
            {currentView === 'momentum' && <PortfoliosMomentum activePortfolio={activePortfolio} />}
            {currentView === 'allocation' && <PortfolioAllocation activePortfolio={activePortfolio} />}
            {currentView === 'comparitive' && <PortfolioComparitive activePortfolio={activePortfolio} />}
            {currentView === 'bubble' && <PortfolioBubble activePortfolio={activePortfolio} />}
            {currentView === 'exposure' && <PortfolioExposure activePortfolio={activePortfolio} />}
            {currentView === 'marketOdds' && <PortfolioMarketOdds activePortfolio={activePortfolio} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})