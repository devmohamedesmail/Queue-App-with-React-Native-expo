import React from 'react'
import { Text } from 'react-native-magnus'
import { TouchableOpacity, Animated, Easing, View, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors'

interface BookQueueBtnProps {
    title?: string
    onPress?: () => void
    bg?: string
    color?: string
    style?: any
}

export default function Book_Queue_Btn({
    title = 'Book',
    onPress,
    bg,
    color,
    style,
    ...props
}: BookQueueBtnProps) {
    const { theme } = useTheme()
    const [scale] = React.useState(new Animated.Value(1))
    const waveAnim = React.useRef(new Animated.Value(0)).current

    // Start wave animation on mount
    React.useEffect(() => {
        Animated.loop(
            Animated.timing(waveAnim, {
                toValue: 1,
                duration: 1400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            })
        ).start()
    }, [waveAnim])

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.92,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start()
        if (onPress) onPress()
    }

    const backgroundColor =
        bg ||
        (theme === 'light'
            ? colors.lightTheme.primary
            : colors.darkTheme.primary)
    const textColor =
        color ||
        (theme === 'light'
            ? colors.lightTheme.white
            : colors.darkTheme.white)

    // Wave animation style
    const waveScale = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2.4],
    })
    const waveOpacity = waveAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0.35, 0.15, 0],
    })

    return (
        <Animated.View
            style={[
                {
                    transform: [{ scale }],
                },
                style,
            ]}
            {...props}
        >
            <View style={styles.center}>
                {/* Wave effect */}
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            backgroundColor,
                            opacity: waveOpacity,
                            transform: [{ scale: waveScale }],
                        },
                    ]}
                />
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        backgroundColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: backgroundColor,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.25,
                        shadowRadius: 16,
                        elevation: 8,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <Text
                        fontSize={20}
                        fontWeight="bold"
                        color={textColor}
                        textAlign="center"
                        fontFamily="poppins-regular"
                    >
                        {title}
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    wave: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
})