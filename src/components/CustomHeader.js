import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import ViewsMenu from './ViewsMenu';
import { useState } from 'react';

export default function CustomHeader({ views = [], onViewSelect }) {

    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.leftRow}>
                <TouchableOpacity>
                    <Icon name="density-medium" size={20} color='#fff' />
                </TouchableOpacity>
                <Image
                    source={require('../../assets/logo.png')}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>
            <View style={styles.rightRow}>
                <TouchableOpacity>
                    <Icon name="search" size={22} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setMenuVisible(true)}
                >
                    <Icon name="more-vert" size={22} color='#fff' />
                </TouchableOpacity>
            </View>

            <ViewsMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                views={views}
                onSelect={viewKey => {
                    setMenuVisible(false)
                    onViewSelect?.(viewKey)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: '#242424',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        elevation: 5,
        zIndex: 1000
    },
    leftRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 100
    },
    rightRow: {
        flexDirection: 'row',
        gap: 12
    },
})