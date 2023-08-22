import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function ActivityIndicator({ visible = false }) {
    if (!visible) return null
    return (
        <View style={styles.overlay}>
            <LottieView
                autoPlay={true}
                loop={true}
                source={require('../../loader.json')}
            />
        </View>
    );
}
const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        backgroundColor: '#ffffff',
        opacity: 0.7

    }

})
export default ActivityIndicator;