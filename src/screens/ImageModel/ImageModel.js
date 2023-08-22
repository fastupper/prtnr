import React from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import styles from './styles';

function ImageModel({ open, onPress, onCloseModal }) {

    function onDatapass() {
        let data = { name: 'example', type: 'closed from child' };
        onCloseModal(data);
    }
    return (
        <Modal animationType="none"
            transparent={true}
            visible={open} >
            <View style={styles.Modalview}>
                <View style={styles.ModalItem}>
                    <TouchableOpacity
                        onPress={onDatapass}
                        style={styles.close}>
                        <Image
                            imageStyle={{ resizeMode: 'stretch' }}
                            style={{ height: 10, width: 10 }}
                            source={require('../../assets/close3.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity>
                            <Image
                                imageStyle={{ resizeMode: 'stretch' }}
                                style={styles.Icon}
                                source={require('../../assets/camera.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                //checkSTORAGE(), setopen(!open);
                            }}>
                            <Image
                                imageStyle={{ resizeMode: 'stretch' }}
                                style={styles.Icon}
                                source={require('../../assets/gallery.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    );
}

export default ImageModel;