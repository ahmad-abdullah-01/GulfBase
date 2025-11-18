import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { useUserPortfolios, useCreateUserPortfolios, useCurrencies } from '../hooks/usePortfolios'
import PortfolioSelectModal from './PortfolioSelectModal';
import PortfolioCreateModal from './PortfolioCreateModal';

export default function PortfolioTopBar({activePortfolio, setActivePortfolio}) {

    const { data: currencies } = useCurrencies(0, 1)
    const { data: portfolios, isLoading } = useUserPortfolios(1, 1)
    const createMutation = useCreateUserPortfolios()

    const [isSelectModalVisible, setSelectModalVisible] = useState(false)
    const [isCreateModalVisible, setCreateModalVisible] = useState(false)

    useEffect(() => {
        if (!activePortfolio && portfolios?.length > 0) {
            setActivePortfolio(portfolios[0])
        }
    }, [portfolios])

    if (isLoading) {
        return (
            <View style={styles.headerButton}>
                <View style={styles.centerLabelContainer}>
                    <Text style={styles.loadingText}>Loading portfolios</Text>
                    <ActivityIndicator size="small" color="#fff" />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.headerButton}>
            <TouchableOpacity onPress={() => setSelectModalVisible(true)} style={styles.centerLabelContainer}>
                <Text style={styles.headerText}>{activePortfolio ? activePortfolio.name : 'Select Portfolio'}</Text>
                <Icon name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>

            <PortfolioSelectModal
                portfolios={portfolios}
                visible={isSelectModalVisible}
                onClose={() => setSelectModalVisible(false)}
                onSelect={(p) => {
                    setActivePortfolio(p)
                    setSelectModalVisible(false)
                }}
                onCreate={() => {
                    setSelectModalVisible(false)
                    setCreateModalVisible(true)
                }}
            />

            <PortfolioCreateModal
                currencies={currencies}
                isLoading={isLoading}
                visible={isCreateModalVisible}
                onClose={() => setCreateModalVisible(false)}
                onCreate={async (data) => {
                    const newPortfolio = await createMutation.mutateAsync(data)
                    setActivePortfolio(newPortfolio)
                    setCreateModalVisible(false)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    headerButton: {
        backgroundColor: '#141414',
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewModeText: {
        position: 'absolute',
        left: 8,
        color: '#ccc',
        fontSize: 14,
    },
    centerLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 14,
    },
    centered: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    loadingText: {
        color: '#fff',
        fontSize: 13,
        marginRight: 4
    },
    errorText: {
        color: 'tomato',
        fontSize: 13,
    },

})
