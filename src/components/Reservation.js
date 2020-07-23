import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  Button,
  Platform,
  TouchableOpacity,
  Modal,
  Alert,
  PanResponder,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const Reservation = () => {
  const [guests, setGuests] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState(Platform.OS === 'ios' ? 'datetime' : 'date');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef({guests: null});

  const handleReservation = () => {
    console.log(JSON.stringify({guests, smoking, date}));
    toogleModal();
  };
  const toogleModal = () => {
    setShowModal(!showModal);
  };
  const resetForm = () => {
    setGuests(1);
    setSmoking(false);
    setDate(date);
    setShow(false);
  };
  const handleViewRef = useRef(null);
  const recognizeDrag = ({moveX, moveY, dx, dy}) => {
    if (dx !== -10 && dy !== -10) {
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
    // onMoveShouldSetPanResponder: (e, gestureState) => {
    //   //return true if user is swiping, return false if it's a single click
    //   return !(gestureState.dx === 0 && gestureState.dy === 0);
    // },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return gestureState.dx != 0 && gestureState.dy != 0;
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Your Reservation OK?',
          [
            `Number of Guests:  ${guests}`,
            `Smoking ?  ${smoking ? 'Yes' : 'No'}`,
            'Date and Time: ' + '  ' + moment(date).format(''),
          ],
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed');
                resetForm();
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                resetForm();
              },
              style: 'OK',
            },
          ],
          {cancelable: false},
        );
        return true;
      }
    },
  });
  return (
    <ScrollView>
      <Animatable.View animation={'zoomIn'} duration={2000} delay={1000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}> Number of Guests </Text>
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                paddingRight: 10,
                paddingVertical: 7,
              },
            }}
            placeholder={{
              label: 'Select an item',
              value: '',
            }}
            value={guests}
            useNativeAndroidPickerStyle={Platform.OS === 'ios' ? true : false} //android only
            Icon={() => {
              return (
                <Icon
                  name={'md-arrow-down'}
                  type={'ionicon'}
                  size={24}
                  color={'gray'}
                />
              );
            }}
            onUpArrow={() => {
              inputRefs.guests.focus();
            }}
            onDownArrow={() => {
              inputRefs.guests.togglePicker();
            }}
            items={[
              {label: '1', value: '1'},
              {label: '2', value: '2'},
              {label: '3', value: '3'},
              {label: '4', value: '4'},
              {label: '5', value: '5'},
              {label: '6', value: '6'},
            ]}
            onValueChange={(value) => setGuests(value)}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}> Smoking/Non-Smoking? </Text>
          <View
            style={[
              styles.formItem,
              {justifyContent: 'center', alignItems: 'flex-end'},
            ]}>
            <Switch
              style={styles.formItem}
              value={smoking}
              trackColor={'#512DA8'}
              onValueChange={(value) => setSmoking(value)}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}> Date and Time </Text>
          <TouchableOpacity
            style={{
              padding: 5,
              justifyContent: 'center',
              alignContent: 'center',
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
              flexDirection: 'row',
            }}
            onPress={() => {
              setShow(true);
              setMode('date');
            }}>
            <Icon
              name={'calendar'}
              type={'font-awesome'}
              color={'gray'}
              style={{paddingHorizontal: 10}}
            />
            <Text
              style={{
                textAlign: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
                color: 'gray',
              }}>
              {' '}
              {'' + moment(date).format('YYYY-MM-DDThh:mm:ss A')}{' '}
            </Text>
          </TouchableOpacity>
          {/*<View*/}
          {/*  style={[*/}
          {/*    styles.formItem,*/}
          {/*    {flex: 3, flexDirection: 'row', justifyContent: 'space-around'},*/}
          {/*  ]}>*/}
          {/*  {Platform.OS === 'ios' ? (*/}
          {/*    <MyButton showValue={'datetime'} formatValue={''} />*/}
          {/*  ) : (*/}
          {/*    <View*/}
          {/*      style={{*/}
          {/*        flex: 3,*/}
          {/*        flexDirection: 'row',*/}
          {/*      }}>*/}
          {/*      <MyButton showValue={'date'} formatValue={'YYYY-MM-DD'} />*/}
          {/*      <MyButton showValue={'time'} formatValue={'Thh:mm:ssZ'} />*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*</View>*/}
        </View>
        <View style={{flex: 1}}>
          {show && (
            <RNDateTimePicker
              value={date}
              mode={mode}
              display={'default'}
              minimumDate={new Date()}
              // maximumDate={new Date()}
              // is24Hour={true}
              onChange={(event, value) => {
                if (value === undefined) {
                  setShow(false);
                } else {
                  setShow(mode === 'time' ? false : true);
                  setMode('time');
                  setDate(new Date(value));
                }
              }}
            />
          )}
        </View>
        <View style={styles.formRow}>
          <Animatable.View
            animation={'zoomIn'}
            duration={2000}
            delay={1000}
            ref={handleViewRef}
            {...panResponder.panHandlers}>
            <View
              style={{
                backgroundColor: Platform.OS === 'ios' ? '#512DA8' : '',
                borderRadius: 5,
                paddingHorizontal: 80,
              }}>
              <Button
                title={'Reserve'}
                color={Platform.OS === 'ios' ? 'white' : '#512DA8'}
                // onPress={() => handleReservation()}
                onPress={() => {}}
                accessibilityLabel={'Learn more about this purple button'}
              />
            </View>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={showModal}
              onDismiss={() => {
                // toogleModal();
                resetForm();
              }}
              onRequestClose={() => {
                toogleModal();
                resetForm();
              }}>
              <View style={styles.modal}>
                <Text style={styles.modalTitle}> Your Reservation</Text>
                <Text style={styles.modalText}>
                  {' '}
                  Number of Guests: {guests}{' '}
                </Text>
                <Text style={styles.modalText}>
                  Smoking? : {smoking ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.modalText}>
                  Date and Time: {moment(date).format('')}
                </Text>

                <View
                  style={{
                    backgroundColor: Platform.OS === 'ios' ? '#512DA8' : '',
                    borderRadius: 5,
                  }}>
                  <Button
                    title={'Close'}
                    color={Platform.OS === 'ios' ? 'white' : '#512DA8'}
                    onPress={() => {
                      toogleModal();
                      resetForm();
                    }}
                  />
                </View>
              </View>
            </Modal>
          </Animatable.View>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  formLabel: {
    flex: 2,
    fontSize: 18,
  },
  formItem: {
    flex: 1,
  },
  modal: {
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
});
export default Reservation;
