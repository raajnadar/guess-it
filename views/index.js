import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Linking } from 'react-native'

import { Button, Text, Dialog, Portal, Paragraph, Snackbar  } from 'react-native-paper'

let number = 0, tries = 0
const min = 0, max = 50, random = 0

export default class Index extends Component {
	constructor(props) {
		super(props)

		this.state = {
			number: 0,
			guessed_value: 0,
			value: 'greater',
			won: false,
			snackVisible: false
		}

		this.guessValue = this.guessValue.bind(this)
		this.playAgain = this.playAgain.bind(this)
	}

	render() {
		const { number, value, guessed_value, won, tries, snackVisible } = this.state
		const visible = this.props.navigation.getParam('visible', false)

		return (
			<Fragment>
				<Text style={styles.title}>I randomly selected a number between {min} - {max}</Text>
				<Text style={styles.title}>Now guess the correct number</Text>
				<View style={styles.container}>
					<View style={styles.padder}>
						<Button mode="contained" onPress={() => this.changeValue('plus')} style={styles.button} disabled={number === 50 || won  ? true : false}>+1</Button>
					</View>
					<View style={styles.padder}>
						<Text style={{ fontSize: 22 }}>{number}</Text>
					</View>
					<View style={styles.padder}>
						<Button mode="contained" onPress={() => this.changeValue('minus')} style={styles.button} disabled={number === 0 || won ? true : false}>-1</Button>
					</View>
					<View style={styles.padder}>
						{
							won ? (
								<Button mode="contained" onPress={this.playAgain} style={styles.button}>Play Again?</Button>
							) : (
								<Button mode="contained" onPress={this.guessValue} style={styles.button} disabled={number === guessed_value ? true : false}>Guess</Button>
							)
						}
					</View>
				</View>
				<Portal>
					<Dialog visible={visible} dismissable={false}>
						<Dialog.Content>
							<Paragraph>Guess the number mobile application developed by rajendran nadar</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={() => Linking.openURL('https://raajnadar.in')}>Portfolio</Button>
							<Button onPress={this.hideDialog}>Close</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
				<Snackbar visible={snackVisible} duration={1500} onDismiss={() => this.setState({ snackVisible: false })} >
					{
						won ? (
							<Text style={{ color: '#fff' }}>You guessed in {tries} tries</Text>
						) : (
							<Text style={{ color: '#fff' }}>Your guess is very {value}</Text>
						)
					}
				</Snackbar>
			</Fragment>
		)
	}

	componentDidMount() {
		// Generate random number
		this.generateRandom()
	}

	hideDialog = () => this.props.navigation.setParams({ visible: false })

	generateRandom() {
		random = Math.floor(Math.random() * (max-min+1) + min);
	}

	playAgain() {
		// Clear all the data
		this.generateRandom()
		number = 0, tries = 0
		this.setState({ won: false, value: 'greater', guessed_value: 0, number: 0 })
	}

	guessValue() {
		if (number > random) {
			this.setState({ value: 'high', guessed_value: number, snackVisible: true })
		} else if (number < random) {
			this.setState({ value: 'low', guessed_value: number, snackVisible: true })
		} else {
			this.setState({ won: true, snackVisible: true })
		}

		tries++
		this.setState({ tries: tries })
	}

	changeValue(name) {
		if (number >= min && number <= max) {
			if (name == 'plus' && number < max) {
				number++
			}

			if (name == 'minus' && number > min) {
				number--
			}

			this.setState({ number: number })
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		paddingHorizontal: 20,
		marginTop: 16
	},
	padder: {
		paddingBottom: 16
	},
	button: {
		minWidth: 160,
		paddingVertical: 6
	}
})