/* eslint-disable object-shorthand */
import React, { Component } from 'react'

import { StyleSheet, Text, View } from 'react-native'

import {
	Appbar,
	Button,
	Dialog,
	IconButton,
	Menu,
	Paragraph,
	Portal
} from 'react-native-paper'

import NumberTile from '../components/NumberTile'

import HowToPlay from './HowToPlay'

let items = []

const min = 1
const max = 30
let random = 0
let tries = 0
let guessed_value = []

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.resetData()

		this.state = {
			items: items,
			tries: 0,
			won: false,
			guessed: [],
			value: '',
			isModalVisible: false,
			menuVisibility: false,
			isHowToPlayVisible: true
		}
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state

		return {
			header: (
				<Appbar.Header>
					<Appbar.Content title="Guess It" />
					<Menu
						visible={params.menuVisibility}
						anchor={
							<IconButton
								color={'#fff'}
								icon="dots-vertical"
								onPress={() =>
									navigation.setParams({
										menuVisibility: !params.menuVisibility
									})
								}
							/>
						}>
						<Menu.Item
							title="Developer"
							onPress={() => {
								navigation.push('Developer')
								navigation.setParams({
									menuVisibility: false
								})
							}}
						/>
					</Menu>
				</Appbar.Header>
			)
		}
	}

	render() {
		const { won, isModalVisible, isHowToPlayVisible } = this.state

		return (
			<View>
				<Text style={styles.hint}>{this.hintMessage()}</Text>
				<View style={styles.container}>
					{items.map(data => {
						return (
							<NumberTile
								key={data.value}
								index={data.value}
								random={random}
								disabled={data.disabled}
								won={won}
								onPress={() => this.guessValue(data.value)}
							/>
						)
					})}
				</View>
				<Portal>
					<HowToPlay
						visible={isHowToPlayVisible}
						HowToPlayToggle={this.HowToPlayToggle}
					/>
				</Portal>
				{won ? (
					<View style={styles.newGameContainer}>
						<Button
							style={styles.newGameBtn}
							mode="contained"
							compact
							onPress={this.newGame}>
							New Game
						</Button>
					</View>
				) : null}
				<Portal>
					<Dialog
						visible={isModalVisible}
						dismissable={false}
						onDismiss={() =>
							this.setState({ isModalVisible: false })
						}>
						<Dialog.Title>You won!</Dialog.Title>
						<Dialog.Content>
							<Paragraph>
								The random number is{' '}
								{guessed_value[guessed_value.length - 1]}, You
								guessed in {tries} tries
							</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								onPress={() =>
									this.setState({ isModalVisible: false })
								}>
								Exit
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		)
	}

	componentDidMount() {
		// Generate random number
		this.generateRandom()
	}

	generateRandom() {
		random = Math.floor(Math.random() * (max - min + 1) + min)
	}

	hintMessage = () => {
		let currentNumber = this.state.guessed[this.state.guessed.length - 1]

		if (this.state.value !== '' && !this.state.won) {
			return `${currentNumber} is ${this.state.value} than the random number`
		} else if (this.state.won) {
			return `You guessed in ${tries} tries`
		} else {
			return 'Click on a number to get a hint'
		}
	}

	guessValue = number => {
		tries++
		guessed_value.push(number)
		items[number - 1].disabled = true

		if (number > random) {
			this.setState({
				value: 'greater',
				guessed: guessed_value,
				tries: tries,
				items: items
			})
		} else if (number < random) {
			this.setState({
				value: 'lesser',
				guessed: guessed_value,
				tries: tries,
				items: items
			})
		} else {
			this.setState({ won: true, isModalVisible: true, tries: tries })
		}
	}

	newGame = () => {
		// Clear all the data
		this.generateRandom()
		this.resetData()
		tries = 0
		guessed_value = []
		this.setState({
			won: false,
			value: '',
			tries: tries,
			guessed: guessed_value
		})
	}

	resetData = () => {
		items = []

		for (var i = 1; i <= max; i++) {
			items.push({ value: i, disabled: false })
		}
	}

	HowToPlayToggle = () => {
		this.setState({ isHowToPlayVisible: false })
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	hint: {
		fontSize: 20,
		padding: 10,
		textAlign: 'center',
		color: '#FF0000'
	},
	newGameContainer: {
		alignItems: 'center'
	},
	newGameBtn: {
		margin: 10,
		width: '50%'
	}
})
