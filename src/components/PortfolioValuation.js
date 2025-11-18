import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { usePortfolioCompanies } from '../hooks/usePortfolios'
import { formatNumber } from '../utils/format'
import { getNumberColor } from '../utils/getNumberColor'
import { useNavigation } from '@react-navigation/native'

const ICON_COL_WIDTH = 20

export default function PortfolioValuation({ activePortfolio }) {
    const navigation = useNavigation()
    const portfolioId = activePortfolio?.portfolioId
    const { data: portfolioCompanies = [], isLoading } = usePortfolioCompanies(portfolioId, 1)

    const handleIconPress = (item) => {
        navigation.navigate('PortfolioStock', { company: item })
    }

    const renderRow = ({ item }) => (
        <View style={styles.rowContainer}>
            <View style={styles.colCompany}>
                <Text style={styles.marketText}>{item.ticker}</Text>
            </View>

            <View style={styles.col}>
                <Text style={styles.rowText}>{formatNumber(item.quantity)}</Text>
                <Text style={styles.subText}>{formatNumber(item.current_Value)}</Text>
            </View>

            <View style={styles.col}>
                <Text style={styles.rowText}>{formatNumber(item.price)}</Text>
                <Text style={[styles.subText, { color: getNumberColor(item.changePer) }]}>
                    {formatNumber(item.changePer)}
                </Text>
            </View>

            <View style={styles.col}>
                <Text style={styles.rowText}>{formatNumber(item.avg_Cost)}</Text>
                <Text style={[styles.subText, { color: getNumberColor(item.changePer) }]}>
                    {formatNumber(item.gainPercentage)}
                </Text>
            </View>

            <View style={styles.iconCol}>
                <TouchableOpacity
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    onPress={() => handleIconPress(item)}
                >
                    <Icon name="info" size={18} color="#2F9Bf6" />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <View style={styles.colCompany}>
                    <Text style={styles.headerText}>Company/Ticker</Text>
                </View>
                <View style={styles.col}>
                    <Text style={styles.headerTextCenter}>{`Shares/\nValue`}</Text>
                </View>
                <View style={styles.col}>
                    <Text style={styles.headerTextCenter}>{`Last/\nChg. %`}</Text>
                </View>
                <View style={styles.col}>
                    <Text style={styles.headerTextCenter}>{`Average\nCost / %`}</Text>
                </View>
                <View style={styles.iconCol} />
            </View>

            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size='large' color='#2F9Bf6' />
                </View>
            ) : (
                <FlatList
                    data={portfolioCompanies}
                    renderItem={renderRow}
                    keyExtractor={(i) => String(i.ticker || i.portfolioCompanyId || Math.random())}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d332',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 13,
        color: '#BBBBBB',
    },
    headerTextCenter: {
        fontSize: 13,
        color: '#BBBBBB',
        textAlign: 'center',
        lineHeight: 18,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderBottomColor: '#d3d3d332',
        borderBottomWidth: 0.6,
        backgroundColor: 'transparent',
    },
    colCompany: {
        flex: 2,
        justifyContent: 'center',
    },
    col: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    iconCol: {
        width: ICON_COL_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marketText: {
        color: '#2F9Bf6',
        fontSize: 16,
    },
    rowText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '400',
        textAlign: 'right',
    },
    subText: {
        fontSize: 13,
        color: '#fff',
        marginTop: 2,
        textAlign: 'right',
    },
})
