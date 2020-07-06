import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {DISHES} from '../shared/dishes';

const Menu = (props) => {
  const [dishes, setDishes] = useState(DISHES);

  const {navigate} = props.navigation;

  const renderMenuItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        chevron={true}
        leftAvatar={{source: require('../assets/images/uthappizza.png')}}
        onPress={() => navigate('DishDetail', {dishId: item.id})}
      />
    );
  };
  return (
    <FlatList
      data={dishes}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({});

export default Menu;
