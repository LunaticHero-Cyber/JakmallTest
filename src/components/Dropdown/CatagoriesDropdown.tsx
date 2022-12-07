import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {SIZES} from 'constants/sizes';
import {COLORS} from 'constants';
import {BoxSpace, Wrapper} from 'components/Common';
import {JokeInterface} from 'appTypes/joke.type';
import {JokesCard} from 'components/Card';

type ProductCardStyleInterface = {
  card: ViewStyle;
  jokesContainer: ViewStyle;
  nameText: TextStyle;
};

const styles = StyleSheet.create<ProductCardStyleInterface>({
  card: {
    padding: SIZES.medium,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: SIZES.outline,
    borderBottomColor: COLORS.BLACK20,
    alignItems: 'center',
  },
  jokesContainer: {
    padding: SIZES.medium,
  },
  nameText: {
    flex: 1,
    fontSize: SIZES.extraLarge,
  },
});

const CatagoriesDropdown = ({
  categoryTitle,
  isRefreshing = false,
  fetchJokes,
}: {
  categoryTitle: string;
  isRefreshing?: boolean;
  fetchJokes: () => Promise<Array<JokeInterface>>;
}) => {
  const [jokes, setJokes] = useState<Array<JokeInterface>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [visibleJokes, setVisibleJokes] = useState(false);
  const [numberOfTimesAdded, setNumberOfTimesAdded] = useState(0);

  const handleFetchingJokeList = async () => {
    const categories = (await fetchJokes()) ?? [];
    setJokes(categories);
    setNumberOfTimesAdded(numberOfTimesAdded + 1);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setVisibleJokes(false);
    setIsLoading(true);
    setNumberOfTimesAdded(0);

    setJokes([]);
  };

  const onPressDropButton = async () => {
    setVisibleJokes(!visibleJokes);
  };

  const onPressAddMoreButton = async () => {
    setIsFetching(true);

    const categories = (await fetchJokes()) ?? [];
    setJokes([...jokes, ...categories]);
    setNumberOfTimesAdded(numberOfTimesAdded + 1);

    setIsFetching(false);
  };

  const jokesIsEmpty = () => {
    return !jokes.length;
  };

  const RenderJokesRow = ({joke}: {joke: JokeInterface}) => (
    <>
      <BoxSpace.A />
      <JokesCard joke={joke} />
    </>
  );

  useEffect(() => {
    if (visibleJokes && numberOfTimesAdded < 3 && !numberOfTimesAdded) {
      handleFetchingJokeList();
    }
  }, [visibleJokes]);

  useEffect(() => {
    if (isRefreshing) {
      handleRefresh();
    }
  }, [isRefreshing]);

  return (
    <>
      <Wrapper style={styles.card}>
        <Text style={styles.nameText}>{categoryTitle}</Text>
        <Button title="Drop" onPress={onPressDropButton} />
      </Wrapper>

      {visibleJokes && (
        <View style={styles.jokesContainer}>
          {isLoading && <Text>Loading jokes...</Text>}

          {visibleJokes &&
            !jokesIsEmpty() &&
            jokes?.map((joke, index) => {
              return (
                <>
                  <RenderJokesRow key={joke.id} joke={joke} />
                  {index === jokes.length - 1 && (
                    <BoxSpace.A key={`${index}-${categoryTitle}`} />
                  )}
                </>
              );
            })}

          {jokesIsEmpty() && !isLoading && (
            <Text>No Jokes in this category</Text>
          )}

          {numberOfTimesAdded < 3 && !jokesIsEmpty() && isFetching && (
            <Text>Getting more jokes...</Text>
          )}

          {numberOfTimesAdded < 3 && !jokesIsEmpty() && !isFetching && (
            <Button title="Add MORE" onPress={onPressAddMoreButton} />
          )}
        </View>
      )}
    </>
  );
};

export default CatagoriesDropdown;
