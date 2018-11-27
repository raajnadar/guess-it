import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Linking } from 'react-native'

import {
	Button,
	Text,
	Dialog,
	Portal,
	Paragraph,
	Snackbar
} from 'react-native-paper'

let number = 0
let tries = 0
let random = 0
let expectedIncrment = 0
let expectedDecrement = 0
const min = 1
const max = 50

export default class Index extends Component {
	constructor(props) {
		super(props)

		this.state = {
			number: 1,
			guessed_value: 1,
			value: 'greater',
			won: false,
			snackVisible: false,
			activeSelector: 1
		}

		this.guessValue = this.guessValue.bind(this)
		this.playAgain = this.playAgain.bind(this)
	}

	render() {
		const {
			number,
			value,
			guessed_value,
			won,
			tries,
			snackVisible,
			activeSelector
		} = this.state

		const visible = this.props.navigation.getParam('visible', false)
		expectedIncrment = number + activeSelector
		expectedDecrement = number - activeSelector

		return (
			<Fragment>
				<Text style={styles.title}>
					Guess the correct number between {min} - {max}
				</Text>
				<View style={styles.selectorContainer}>
					<Button
						onPress={() => this.setState({ activeSelector: 1 })}
						style={[
							styles.selectorBtn,
							activeSelector === 1
								? { backgroundColor: '#dbdbdb' }
								: null
						]}>
						&#177; 1
					</Button>
					<Button
						onPress={() => this.setState({ activeSelector: 2 })}
						style={[
							styles.selectorBtn,
							activeSelector === 2
								? { backgroundColor: '#dbdbdb' }
								: null
						]}>
						&#177; 2
					</Button>
					<Button
						onPress={() => this.setState({ activeSelector: 5 })}
						style={[
							styles.selectorBtn,
							activeSelector === 5
								? { backgroundColor: '#dbdbdb' }
								: null
						]}>
						&#177; 5
					</Button>
					<Button
						onPress={() => this.setState({ activeSelector: 10 })}
						style={[
							styles.selectorBtn,
							activeSelector === 10
								? { backgroundColor: '#dbdbdb' }
								: null
						]}>
						&#177; 10
					</Button>
				</View>
				<View style={styles.container}>
					<View style={styles.padder}>
						<Button
							mode="contained"
							onPress={() =>
								this.changeValue('plus', activeSelector)
							}
							style={styles.button}
							disabled={
								number === max || expectedIncrment > max || won
							}>
							+ {activeSelector}
						</Button>
					</View>
					<View style={styles.padder}>
						<Text style={styles.currentNumber}>{number}</Text>
					</View>
					<View style={styles.padder}>
						<Button
							mode="contained"
							onPress={() =>
								this.changeValue('minus', activeSelector)
							}
							style={styles.button}
							disabled={
								number === min || expectedDecrement < min || won
							}>
							- {activeSelector}
						</Button>
					</View>
					<View style={styles.padder}>
						{won ? (
							<Button
								mode="contained"
								onPress={this.playAgain}
								style={styles.button}>
								Play Again?
							</Button>
						) : (
							<Button
								mode="contained"
								onPress={this.guessValue}
								style={styles.button}
								disabled={number === guessed_value}>
								Guess
							</Button>
						)}
					</View>
				</View>
				<Portal>
					<Dialog visible={visible} dismissable={false}>
						<Dialog.Content>
							<Paragraph>
								Guess the number mobile application developed by
								rajendran nadar
							</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								onPress={() =>
									Linking.openURL('https://raajnadar.in')
								}>
								Portfolio
							</Button>
							<Button onPress={this.hideDialog}>Close</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
				<Snackbar
					visible={snackVisible}
					duration={1500}
					onDismiss={() => this.setState({ snackVisible: false })}>
					{won ? (
						<Text style={{ color: '#fff' }}>
							You guessed in {tries} tries
						</Text>
					) : (
						<Text style={{ color: '#fff' }}>
							Your guess is very {value}
						</Text>
					)}
				</Snackbar>
			</Fragment>
		)
	}

	componentDidMount() {
		// Generate random number
		this.generateRandom()
	}

	componentWillMount() {
		expectedIncrment = 0
		expectedDecrement = 0
		number = 1
	}

	hideDialog = () => this.props.navigation.setParams({ visible: false })

	generateRandom() {
		random = Math.floor(Math.random() * (max - min + 1) + min)
	}

	playAgain() {
		// Clear all the data
		this.generateRandom()
		number = 1
		tries = 0
		this.setState({
			won: false,
			value: 'greater',
			guessed_value: 1,
			number: 1
		})
	}

	guessValue() {
		if (number > random) {
			this.setState({
				value: 'high',
				guessed_value: number,
				snackVisible: true
			})
		} else if (number < random) {
			this.setState({
				value: 'low',
				guessed_value: number,
				snackVisible: true
			})
		} else {
			this.setState({ won: true, snackVisible: true })
		}

		tries++
		this.setState({ tries })
	}

	changeValue(name, selector) {
		if (name === 'plus' && number < max) {
			number += selector
		}

		if (name === 'minus' && number > min) {
			number -= selector
		}

		this.setState({ number })
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
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
	},
	currentNumber: {
		fontSize: 22
	},
	selectorContainer: {
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 6,
		marginRight: 6
	},
	selectorBtn: {
		flex: 1,
		margin: 6,
		backgroundColor: '#eee'
	}
})
