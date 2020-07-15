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
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {getCurrentDate, getCurrentTime} from './GetCurrentTime';
import moment from 'moment';

const Reservation = () => {
  const [guests, setGuests] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState(new Date('2020-07-15T09:21:42+07:00'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const inputRefs = useRef({});

  const handleReservation = () => {
    console.log(JSON.stringify({guests, smoking, date}));
    setGuests(1);
    setSmoking(false);
    setDate(date);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatePicker = (value) => {
    showMode(value);
  };
  const showTimePicker = (value) => {
    showMode(value);
  };
  return (
    <ScrollView>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}> Number of Guests </Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{
            label: 'Select an item',
            value: 1,
          }}
          value={guests}
          useNativeAndroidPickerStyle={Platform.OS === 'ios' ? true : false} //android only
          hideIcon={true}
          onUpArrow={() => {
            inputRefs.name.focus();
          }}
          onDownArrow={() => {
            inputRefs.picker2.togglePicker();
          }}
          ref={(el) => {
            inputRefs.picker2 = el;
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
          {/*<Button title={moment(date).format()} onPress={showDatePicker} />*/}
          {/*<Button*/}
          {/*  title={moment(date, 'hh:mm:ss').format('hh:mm:ss')}*/}
          {/*  onPress={showTimePicker}*/}
          {/*/>*/}
          {Platform.OS === 'ios' ? (
            <TouchableOpacity
              onPress={() => {
                showDatePicker('datetime');
              }}>
              <Text style={{fontSize: 16, color: 'gray'}}>
                {moment(date).format()}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  showDatePicker('date');
                }}>
                <Text style={{fontSize: 16, color: 'gray'}}>
                  {moment(date).format('YYYY-MM-DD')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  showDatePicker('date');
                }}>
                <Text style={{fontSize: 16, color: 'gray'}}>
                  {moment(date).format('Thh:mm:ss+')}
                </Text>
              </TouchableOpacity>
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
            maximumDate={new Date()}
            is24Hour={true}
            onChange={(event, value) => {
              // const currentDate = selectedDate || date;
              setShow(false);
              if (value) {
                setDate(value);
              }
            }}
          />
        )}
      </View>
      <View style={styles.formRow}>
        <Button
          title={'Reserve'}
          color={'#512DA8'}
          onPress={() => handleReservation()}
          accessibilityLabel={'Learn more about this purple button'}
        />
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
    // backgroundColor: 'blue',
  },
  formItem: {
    flex: 1,
    // height: 30,
    // backgroundColor: 'tomato',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default Reservation;
