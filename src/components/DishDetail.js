import React, {Component, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from '../shared/dishes';

export const RenderDish = (props) => {
  const dish = props.dish;
  console.log(dish);
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require('../assets/images/uthappizza.png')}>
        <Text style={{margin: 10}}> {dish.description} </Text>
      </Card>
    );
  } else {
    return <View />;
  }
};

const DishDetail = (props) => {
  const [dishes, setDishes] = useState(DISHES);

  // const dishId = JSON.stringify(props.navigation.getParam('dishId', ''));
  const {dishId} = props.route.params;

  return <RenderDish dish={dishes[+dishId]} />;
};

export default DishDetail;
