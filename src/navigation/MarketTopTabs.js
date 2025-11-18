import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GccScreen from "@screens/GccScreen";
import GlobalsScreen from "@screens/GlobalsScreen";
import CommoditiesScreen from "@screens/CommoditiesScreen";
import HotStocksScreen from "@screens/HotStocksScreen";
import InterestRatesScreen from "@screens/InterestRatesScreen";

const Tab = createMaterialTopTabNavigator();

export default function MarketTopTabs({ onTabChange }) {
    const route = useRoute()

    useEffect(() => {

    }, [route])

    return (
        <Tab.Navigator
            screenListeners={{
                state: (e) => {
                    const index = e.data.state.index
                    const currentTab = e.data.state.routeNames[index]
                    onTabChange?.(currentTab)
                }
            }}
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarStyle: {
                    backgroundColor: "#141414",
                    height: 40,
                    borderBottomWidth: 1,
                    borderBottomColor: "#222",
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#fff",
                    height: 2,
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: "600",
                    textTransform: "none",
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#aaa",
                tabBarPressColor: "transparent",
            }}
        >
            <Tab.Screen name="GCC" component={GccScreen} options={{ title: "GCC" }} />
            <Tab.Screen name="Globals" component={GlobalsScreen} options={{ title: "Globals" }} />
            <Tab.Screen name="Commodities" component={CommoditiesScreen} options={{ title: "Commodities" }} />
            <Tab.Screen name="HotStocks" component={HotStocksScreen} options={{ title: "Hot Stocks" }} />
            <Tab.Screen name="InterestRates" component={InterestRatesScreen} options={{ title: "Interest Rates" }} />
        </Tab.Navigator>
    );
}
