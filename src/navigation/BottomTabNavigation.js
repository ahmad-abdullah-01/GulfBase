import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MarketScreen from '@screens/MarketScreen'
import WatchListScreen from '@screens/WatchListScreen'
import PortfolioScreen from '@screens/PortfolioScreen'
import ChatScreen from '@screens/ChatScreen'
import NewsScreen from '@screens/NewsScreen'
import CustomBottomTabs from "./components/CustomBottomTabs";


const Tab = createBottomTabNavigator()

export default function BottomTabs() {
    const { t } = useTranslation()

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >
            <Tab.Screen name="Markets" component={MarketScreen} options={{ title: t('tabs.market') }} />
            <Tab.Screen name="Watchlist" component={WatchListScreen} options={{ title: t('tabs.watchlist') }} />
            <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ title: t('tabs.portfolio') }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ title: t('tabs.chat') }} />
            <Tab.Screen name="News" component={NewsScreen} options={{ title: t('tabs.news') }} />
        </Tab.Navigator>
    )
}