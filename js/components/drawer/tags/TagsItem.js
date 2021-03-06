import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import colors from '../../../utils/colors';

const TagsItem = ({ text, color, selected, onTap }) => {
  return (
    <TouchableOpacity 
      onPress={onTap}
      style={
        selected 
          ? [styles.container, styles.selected] 
          : [styles.container, styles.default]
        }>
      <View>
        <Text style={[styles.text, selected && {fontSize: 14, color: colors.body, fontWeight: '700',}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 30,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 20,

  },
  selected: {
    backgroundColor: colors.s5,
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // shadowColor: 'black',
    // shadowOffset: { height: 3, width: 3 },
  },
  default: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
});

export default TagsItem;