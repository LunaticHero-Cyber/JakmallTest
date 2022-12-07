import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {JokeInterface} from '@appTypes/joke.type';
import {SIZES} from 'constants/sizes';
import {COLORS} from 'constants';
import {Wrapper} from 'components/Common';

type ProductCardStyleInterface = {
  card: ViewStyle;
  nameText: TextStyle;
};

const styles = StyleSheet.create<ProductCardStyleInterface>({
  card: {
    padding: SIZES.medium,
    backgroundColor: COLORS.BLACK20,
    borderRadius: SIZES.extraSmall,
  },
  nameText: {
    fontSize: SIZES.medium,
  },
});

const JokesCard = ({joke}: {joke: JokeInterface}) => {
  const {joke: jokeString} = joke;

  const onPressJoke = () => {
    Alert.alert(jokeString);
  };

  return (
    <TouchableOpacity onPress={onPressJoke}>
      <Wrapper style={styles.card}>
        <View style={{flex: 1}}>
          <Text style={styles.nameText}>{jokeString}</Text>
        </View>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default JokesCard;
