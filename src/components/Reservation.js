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
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Icon} from 'react-native-elements';

const Reservation = () => {
  const [guests, setGuests] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState(new Date('2020-01-01T00:00:00+07:00'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef({guests: null});

  const handleReservation = () => {
    console.log(JSON.stringify({guests, smoking, date}));
    guests;
    smoking;
    date;
    toogleModal();
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDateTimePicker = (value) => {
    showMode(value);
  };
  const MyButton = ({showValue, formatValue}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          showDateTimePicker(showValue);
        }}>
        <Text style={{fontSize: 16, color: 'gray'}}>
          {moment(date).format(formatValue)}
        </Text>
      </TouchableOpacity>
    );
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
  return (
    <ScrollView>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}> Number of Guests </Text>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              // top: Platform.OS === 'ios' ? 7 : 7,
              // right: 6,
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
        <View
          style={[
            styles.formItem,
            {flex: 3, flexDirection: 'row', justifyContent: 'space-around'},
          ]}>
          {Platform.OS === 'ios' ? (
            <MyButton showValue={'datetime'} formatValue={''} />
          ) : (
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
              }}>
              <MyButton showValue={'date'} formatValue={'YYYY-MM-DD'} />
              <MyButton showValue={'time'} formatValue={'Thh:mm:ssZ'} />
            </View>
          )}
        </View>
      </View>
      <View style={{flex: 1}}>
        {show && (
          <RNDateTimePicker
            style={{flex: 3, marginLeft: 0}}
            value={date}
            mode={mode}
            display={'default'}
            minimumDate={new Date(2017, 1, 1)}
            // maximumDate={new Date()}
            is24Hour={true}
            onChange={(event, value) => {
              setShow(false);
              if (value) {
                setDate(value);
              }
            }}
          />
        )}
      </View>
      <View style={styles.formRow}>
        <View
          style={{
            backgroundColor: Platform.OS === 'ios' ? '#512DA8' : '',
            borderRadius: 5,
          }}>
          <Button
            title={'Reserve'}
            color={Platform.OS === 'ios' ? 'white' : '#512DA8'}
            onPress={() => handleReservation()}
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
            <Text style={styles.modalText}> Number of Guests: {guests} </Text>
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
      </View>
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
