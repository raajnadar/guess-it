import React, { Component } from 'react'

import { Linking, StyleSheet, View } from 'react-native'

import { Appbar, Button, Card, Paragraph } from 'react-native-paper'

class Developer extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: (
				<Appbar.Header>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title="Guess It" />
				</Appbar.Header>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Card style={{ marginBottom: 10 }}>
					<Card.Content>
						<Paragraph style={styles.text}>
							Guess the number mobile application developed by
							Rajendran Nadar.
						</Paragraph>
					</Card.Content>
					<Card.Actions>
						<Button
							onPress={() =>
								Linking.openURL('https://raajnadar.in')
							}>
							View Portfolio
						</Button>
					</Card.Actions>
				</Card>
				<Card>
					<Card.Content>
						<Paragraph style={styles.text}>
							Build using React Native with Expo &lt;3
						</Paragraph>
					</Card.Content>
				</Card>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	text: {
		fontSize: 16
	}
})

export default Developer
