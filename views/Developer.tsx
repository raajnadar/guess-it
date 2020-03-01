import React from 'react'

import { Linking, StyleSheet, View } from 'react-native'

import { Button, Card, Paragraph } from 'react-native-paper'

export default function Developer(): JSX.Element {
	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Content>
					<Paragraph style={styles.text}>
						Guess the number mobile application developed by
						Rajendran Nadar.
					</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={(): Promise<Linking> =>
							Linking.openURL('https://raajnadar.in')
						}>
						View Portfolio
					</Button>
				</Card.Actions>
			</Card>
			<Card>
				<Card.Content>
					<Paragraph style={styles.text}>
						Build using React Native
					</Paragraph>
				</Card.Content>
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	card: {
		marginBottom: 10
	},
	text: {
		fontSize: 16
	}
})
