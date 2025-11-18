import { View, Text, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";


const Next = ({ ...props }) => (
    <TouchableOpacity style={{backgroundColor: 'blue', marginRight: 20}}>
        <Text style={{ color: '#fff', fontWeight: '600', }}>Next</Text>
    </TouchableOpacity>
)
export default function OnboardingScreen() {
    const navigation = useNavigation()
    return (
        <Onboarding
            NextButtonComponent={Next}
            titleStyles={{
                fontSize: 26,
                fontWeight: '500',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 10,
                // fontFamily: 'Poppins-Bold',
            }}
            subTitleStyles={{
                fontSize: 15,
                color: '#B3B3B3',
                textAlign: 'center',
                lineHeight: 22,
                paddingHorizontal: 25,
                // fontFamily: 'Poppins-Regular',
            }}
            bottomBarHighlight={false}
            pages={[
                {
                    title: 'Welcome to GulfBase',
                    image: <Image source={require('../../assets/logo.png')} style={{ height: 50, width: 300 }} />,
                    backgroundColor: '#111315',
                    subtitle: 'Stay connected with the latest market insights, trends, and analysis across the GCC all in one app.',

                },
                {
                    title: 'Real-Time Market Data & Analytics',
                    backgroundColor: '#111315',
                    subtitle: 'Explore detailed performance metrics, charts, and sector trends across GCC exchanges — all updated instantly.',

                },
                {
                    title: 'Create Your Own Watchlist & Insights',
                    backgroundColor: '#111315',
                    subtitle: 'Follow your favorite companies, set alerts, and customize your dashboard to stay ahead in the market.',

                },
            ]}
        />
    )
}