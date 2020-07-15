import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  Modal,
  Button,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Card} from 'react-native-elements';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const Reservation = () => {
  const [guests, setGuests] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState(new Date('2020-07-15T09:21:42'));

  const handleReservation = () => {
    console.log(JSON.stringify({guests, smoking, date}));
    setGuests(1);
    setSmoking(false);
    setDate('');
  };

  return (
    <ScrollView>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}> Number of Guests </Text>
        <Picker
          style={styles.formItem}
          selectedValue={guests}
          mode={'dropdown'}
          onValueChange={(itemValue, itemIndex) => setGuests(itemValue)}>
          <Picker.Item label={'1'} value={'1'} />
          <Picker.Item label={'2'} value={'2'} />
          <Picker.Item label={'3'} value={'3'} />
          <Picker.Item label={'4'} value={'4'} />
          <Picker.Item label={'5'} value={'5'} />
          <Picker.Item label={'6'} value={'6'} />
        </Picker>
        {/*<DropDownPicker*/}
        {/*  style={styles.formItem}*/}
        {/*  containerStyle={{*/}
        {/*    height: 40,*/}
        {/*    width: '50%',*/}
        {/*  }}*/}
        {/*  dropDownStyle={{*/}
        {/*    backgroundColor: 'tomato',*/}
        {/*    marginTop: 10,*/}
        {/*  }}*/}
        {/*  activeItemStyle={{*/}
        {/*    justifyContent: 'center',*/}
        {/*  }}*/}
        {/*  activeLabelStyle={{color: 'blue'}}*/}
        {/*  items={[*/}
        {/*    {label: '1', value: '1'},*/}
        {/*    {label: '2', value: '2'},*/}
        {/*    {label: '3', value: '3'},*/}
        {/*    {label: '4', value: '4'},*/}
        {/*    {label: '5', value: '5'},*/}
        {/*    {label: '6', value: '6'},*/}
        {/*  ]}*/}
        {/*  // defaultValue={'1'}*/}
        {/*  onChangeItem={(item) => setGuests(item.value)}*/}
        {/*/>*/}
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
        {/*<DatePicker*/}
        {/*  style={{flex: 4, marginRight: 5}}*/}
        {/*  date={date}*/}
        {/*  format={''}*/}
        {/*  mode={'datetime'}*/}
        {/*  placeholder={'select date and time'}*/}
        {/*  minDate={'2017-01-01'}*/}
        {/*  confirmBtnText={'Confirm'}*/}
        {/*  cancelBtnText={'Cancel'}*/}
        {/*  customStyles={{*/}
        {/*    dateIcon: {*/}
        {/*      position: 'absolute',*/}
        {/*      left: 0,*/}
        {/*      top: 4,*/}
        {/*      marginLeft: 0,*/}
        {/*    },*/}
        {/*    dateInput: {*/}
        {/*      marginLeft: 35,*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  onDateChange={(date) => setDate(date)}*/}
        {/*/>*/}
        <RNDateTimePicker
          style={{flex: 3, marginLeft: 0}}
          value={date}
          mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
          display={'default'}
          minimumDate={new Date(2017, 1, 1)}
          maximumDate={new Date()}
          onChange={(event, date) => setDate(date)}
        />
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
export default Reservation;
