import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {Header, Container} from 'components/Common';
import {CatagoriesDropdown} from 'components/Dropdown';
import {fetchJokesCategory} from 'services/get/fetchJokesCategory';
import {fetchJokesByCategory} from 'services/get/fetchJokesByCategory';

type HomeStyleInterface = {
  mainContainer: ViewStyle;
};

const styles = StyleSheet.create<HomeStyleInterface>({
  mainContainer: {
    flex: 1,
  },
});

const Home = () => {
  const scrollRef = useRef<ScrollView>(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const [categoreisList, setCategories] = useState<Array<string>>([]);

  const handleFetchingCategoryList = async () => {
    const categories = await fetchJokesCategory();
    setCategories(categories);
  };

  const onPressBackToTopButton = () => {
    scrollRef.current?.scrollTo({
      y: 0,
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setCategories([]);
    handleFetchingCategoryList();

    setRefreshing(false);
  }, []);

  const RenderRefreshButton = () => (
    <Button title="Refresh" onPress={onRefresh} />
  );

  const RenderTopButton = () => <Button title="Top" disabled={true} />;

  const RenderBackToTopButton = () => (
    <Button title="Back to top" onPress={onPressBackToTopButton} />
  );

  useEffect(() => {
    handleFetchingCategoryList();
  }, []);

  return (
    <Container>
      <Header title="Home" RenderAccessoryRight={RenderRefreshButton} />
      <View style={styles.mainContainer}>
        <ScrollView
          ref={scrollRef}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {categoreisList?.map((category, index) => {
            const fetchJokes = () => fetchJokesByCategory(category);

            return (
              <CatagoriesDropdown
                key={category}
                TopButton={() =>
                  index ? <RenderBackToTopButton /> : <RenderTopButton />
                }
                categoryTitle={category}
                isRefreshing={refreshing}
                fetchJokes={fetchJokes}
              />
            );
          })}
        </ScrollView>
      </View>
    </Container>
  );
};

export default Home;
