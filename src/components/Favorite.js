import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {ListItem, Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import Loading from './Loading';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

const Favorite = (props) => {
  const {navigate} = props.navigation;
  const RenderMenuItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        chevron={false}
        onPress={() => navigate('DishDetail', {dishId: item.id})}
        leftAvatar={{source: {uri: baseURL + item.image}}}
      />
    );
  };

  if (props.dishes.isLoading) {
    return <Loading />;
  } else if (props.dishes.errorMessage) {
    return (
      <View>
        <Text>{props.dishes.errorMessage}</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={props.dishes.dishes.filter((dish) =>
          props.favorites.some((el) => el === dish.id),
        )}
        renderItem={RenderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
};
const styles = StyleSheet.create({});

export default connect(mapStateToProps)(Favorite);
