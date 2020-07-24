import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  Animated,
  Alert,
  PanResponder,
} from 'react-native';
import {Card, Icon, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import {postFavorite, postComment} from '../redux/ActionCreators';
import CommentForm from './CommentForm';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  addComment: (comment) => dispatch(postComment(comment)),
});

const DishDetail = (props) => {
  const {dishId} = props.route.params;
  const [showModal, setShowModal] = useState(false);

  const markFavorite = (dishId) => {
    props.postFavorite(dishId);
  };
  const addCommentStart = (comment) => {
    console.log('Handle comment start');
    props.addComment(comment);
    toogleModal();
  };

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const RenderDish = (props) => {
    const dish = props.dish;
    // const handleViewRef = (ref) => (props.view = ref);
    const handleViewRef = useRef(null);
    const recognizeDragRightToLeft = ({moveX, moveY, dx, dy}) => {
      if (dx < -40) {
        return true;
      } else {
        return false;
      }
    };
    const recognizeDragLeftToRight = ({moveX, moveY, dx, dy}) => {
      if (dx > 40) {
        return true;
      } else {
        return false;
      }
    };

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
      },
      onPanResponderGrant: () => {
        handleViewRef.current
          .rubberBand(1000)
          .then((endState) =>
            console.log(endState.finished ? 'finished' : 'cancelled'),
          );
      },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDragRightToLeft(gestureState)) {
          Alert.alert(
            'Add favorite?',
            'Are you sure you wish to add' + dish.name + 'to favorite ?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  props.favorite
                    ? console.log('Alread favorite')
                    : props.onPressFavorite();
                },
                style: 'OK',
              },
            ],
            {cancelable: false},
          );
          return true;
        } else if (recognizeDragLeftToRight(gestureState)) {
          toogleModal();
        }
      },
    });

    if (dish != null) {
      return (
        <Animatable.View
          animation={'fadeInDown'}
          duration={2000}
          delay={1000}
          ref={handleViewRef}
          {...panResponder.panHandlers}>
          <Card featuredTitle={dish.name} image={{uri: baseURL + dish.image}}>
            <Text style={{margin: 10}}> {dish.description} </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon
                raised={true}
                reverse={true}
                name={props.favorite ? 'heart' : 'heart-o'}
                type={'font-awesome'}
                color={'#f50'}
                onPress={() => {
                  props.favorite
                    ? console.log('Alread favorite')
                    : props.onPressFavorite();
                }}
              />
              <Icon
                raised={true}
                reverse={true}
                name={'pencil'}
                type={'font-awesome'}
                color={'#512DA8'}
                onPress={toogleModal}
              />
            </View>
            <CommentForm
              isShow={showModal}
              toogleModal={toogleModal}
              handleComment={addCommentStart}
              dishId={dishId}
            />
          </Card>
        </Animatable.View>
      );
    } else {
      return <View />;
    }
  };

  const RenderComments = (props) => {
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
      const rating = item.rating;
      return (
        <View key={index} style={{margin: 10}}>
          <Text style={{fontSize: 16}}> {item.comment} </Text>
          <Rating
            imageSize={16}
            readonly={true}
            startingValue={rating}
            style={styles.rating}
          />
          <Text style={{fontSize: 12}}>
            {'-- ' + item.author + ',' + item.date}
          </Text>
        </View>
      );
    };
    return (
      <Animatable.View animation={'fadeInUp'} duration={2000} delay={1000}>
        <Card title={'Comments'}>
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </Animatable.View>
    );
  };

  const RenderDishDetail = () => {
    return (
      <FlatList
        ListHeaderComponent={() => (
          <RenderDish
            dish={props.dishes.dishes[+dishId]}
            favorite={props.favorites.some((el) => el === dishId)}
            onPressFavorite={() => markFavorite(dishId)}
          />
        )}
        ListFooterComponent={() => (
          <RenderComments
            comments={props.comments.comments.filter(
              (comment) => comment.dishId === dishId,
            )}
          />
        )}
      />
    );
  };

  return (
    <View>
      <RenderDishDetail />
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  modal: {
    // flex: 1,
    justifyContent: 'center',
    margin: Platform.OS === 'ios' ? 60 : 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
