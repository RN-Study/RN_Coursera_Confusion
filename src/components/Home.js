import React, {Component, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const Home = (props) => {
  console.log(props.dishes);
  const RenderItem = (props) => {
    const item = props.item;
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{uri: baseURL + item.image}}>
          <Text style={{margin: 10}}> {item.description} </Text>
        </Card>
      );
    } else {
      return <View />;
    }
  };
  const DISHES = props.dishes.dishes;
  return (
    <ScrollView>
      <RenderItem item={DISHES.filter((dish) => dish.featured)[0]} />
      <RenderItem
        item={props.promotions.promotions.filter((promo) => promo.featured)[0]}
      />
      <RenderItem
        item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default connect(mapStateToProps)(Home);
