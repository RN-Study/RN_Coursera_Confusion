import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {HISTORY} from "../shared/history";
import {LEADERS} from "../shared/leaders";

const AboutScreen = () => {
	const [history, setHistory] = useState(HISTORY);
	const [leaders, setLeaders] = useState(LEADERS);

	const renderListItem = ({item, index}) => {
		return (
			<ListItem
				key={index}
				title={item.name}
				subtitle={
					<View>
						<Text style={{color: 'gray'}}>{item.description}</Text>
					</View>
				}
				leftAvatar={{source: require('../assets/images/alberto.png')}}
			/>
		);
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<Card
				title={'Our History'}
			>
				<Text style={{}}> {history} </Text>
			</Card>

			<Card containerStyle={{flex:1}} title={'Corporate Leadership'}>
					<FlatList

						data={leaders}
						renderItem={renderListItem}
						keyExtractor={(item) => item.id.toString()}
					/>
			</Card>

		</SafeAreaView>
	);
};
const styles = StyleSheet.create({});
export default AboutScreen;
