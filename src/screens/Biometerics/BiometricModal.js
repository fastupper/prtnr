import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const BiomatricModal = ({ open, }) => {

    return (<Modal animationType="slide" transparent={true} visible={open}>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5' }}>

        </View>

    </Modal>);

}
export default {

    BiomatricModal,
}