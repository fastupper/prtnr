import React from 'react';
import { Text } from 'react-native';

function ErrorMessage({ error, visible }) {
    if (!visible || !error) return null
    return (
        <Text style={{ fontSize: 10, color: 'red', marginTop: 5 }}>{error}</Text>
    );
}

export default ErrorMessage;