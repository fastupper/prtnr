import React from 'react';
import { useMemo } from 'react';
import { Text, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
const { height, width } = Dimensions.get('window');

function FastImageView({ item, isLocal = true }) {
    const imgUrl = item['imageUrl'];

    return useMemo(() => {
        return (
            <View style={{ height, width }}>
                <FastImage
                    style={{ width, height }}
                    source={
                        isLocal == true ? item : {
                            uri: imgUrl,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }
                    }
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        );
    })
}
export default FastImageView;

 // source={{
                    //     uri: 'https://unsplash.it/400/400?image=1',
                    //     headers: { Authorization: 'someAuthToken' },
                    //     priority: FastImage.priority.normal,
                    // }}