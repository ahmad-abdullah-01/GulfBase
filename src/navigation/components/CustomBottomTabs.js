import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import { useLinkBuilder } from '@react-navigation/native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Feather'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedView = Animated.createAnimatedComponent(View)

export default function CustomBottomTabs({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder()
  const translateY = useSharedValue(0)

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      translateY.value = withTiming(100, { duration: 200 })
    })
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      translateY.value = withTiming(0, { duration: 200 })
    })

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  function getIconByRouteName(routeName, color) {
    switch (routeName) {
      case 'Markets':
        return <Icon name="home" size={18} color={color} />
      case 'Watchlist':
        return <Icon name="eye" size={18} color={color} />
      case 'Portfolio':
        return <Icon name="briefcase" size={18} color={color} />
      case 'Chat':
        return <Icon name="message-square" size={18} color={color} />
      case 'News':
        return <Icon name="rss" size={18} color={color} />
      default:
        return null
    }
  }

  return (
    <AnimatedView style={[styles.container, animatedStyle]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel ?? options.title ?? route.name
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        return (
          <AnimatedTouchableOpacity
            key={route.name}
            layout={LinearTransition.springify().mass(0.5)}
            href={buildHref(route.name, route.params)}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.9}
          >
            {getIconByRouteName(route.name, isFocused ? '#fff' : '#B0B0B0')}
            <Animated.Text
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
              style={[styles.text, { color: isFocused ? '#fff' : '#B0B0B0' }]}
            >
              {label}
            </Animated.Text>
          </AnimatedTouchableOpacity>
        )
      })}
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#242424',
    // bottom: 40,
    // borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
})
