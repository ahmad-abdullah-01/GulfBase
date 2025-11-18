import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "@screens/OnboardingScreen";
import BottomTabs from "./BottomTabNavigation";
import { useNavigation } from "@react-navigation/native";
import AddPortfolioCompany from "../screens/AddPortfolioCompanyScreen";
import PortfolioStockScreen from "../screens/PortfolioStockScreen";
import SearchCompanyScreen from "../screens/SearchCompanyScreen";
import CustomBackHeader from "./components/CustomBackHeader";
import PortfolioTransactionScreen from "../screens/PortfolioTransactionScreen";
const Stack = createNativeStackNavigator()

export default function RootNavigator() {
    const navigation = useNavigation()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
            <Stack.Screen
                name="tabs"
                component={BottomTabs}
            />
            <Stack.Screen
                name="addCompany"
                component={AddPortfolioCompany}
                options={{
                    headerShown: true,
                    header: () => <CustomBackHeader />

                }}
            />
            <Stack.Screen
                name="PortfolioStock"
                component={PortfolioStockScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomBackHeader />

                }}
            />
            <Stack.Screen
                name="SearchCompany"
                component={SearchCompanyScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomBackHeader />
                }}
            />
            <Stack.Screen
                name="PortfolioTransaction"
                component={PortfolioTransactionScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomBackHeader />
                }}
            />
        </Stack.Navigator>
    )
}