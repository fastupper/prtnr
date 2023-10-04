import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer

const CopyIcon = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 500); // Reset the copied state after 0.5 seconds
  };

  return (
    <View>
      <TouchableOpacity onPress={handleCopyText}>
        {copied ? (
          <Text>Copied!</Text>
        ) : (
          <Icon name="copy" size={13} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CopyIcon;
