import React, {Component, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {DISHES} from '../shared/dishes';
import {Card} from 'react-native-elements';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';

const Home = () => {
  const [dishes, setDishes] = useState(DISHES);
  const [promotions, setPromotions] = useState(PROMOTIONS);
  const [leaders, setLeaders] = useState(LEADERS);

  const RenderItem = (props) => {
    const item = props.item;
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={require('../assets/images/uthappizza.png')}>
          <Text style={{margin: 10}}> {item.description} </Text>
        </Card>
      );
    } else {
      return <View />;
    }
  };

  return (
    <ScrollView>
      <RenderItem item={dishes.filter((dish) => dish.featured)[0]} />
      <RenderItem item={promotions.filter((promo) => promo.featured)[0]} />
      <RenderItem item={leaders.filter((leader) => leader.featured)[0]} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default Home;
