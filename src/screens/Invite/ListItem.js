import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

const ListItem = (props) => {
    const shouldComponentUpdate = () => {
        return false;
    }
    const { item, onPress } = props;

    const name = item.givenName ? item.givenName : item.familyName;

    return (
        <TouchableOpacity onPress={() => onPress(item)}>

            <View style={styles.itemContainer}>
                <Text style={styles.titleStyle}>{name}</Text>
                <View style={{ height: 0.5, backgroundColor: 'grey' }} />
            </View >
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 44,
        justifyContent: 'center'
    },
    mainTitleContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    titleStyle: {
        fontSize: 16,
        padding: 10


    },
})
export default ListItem;     