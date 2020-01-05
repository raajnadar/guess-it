import React, { useEffect, useState } from 'react'

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

const min = 1
const max = 30
let random = 0
let guessed_value = []

export default function Game(props) {
	const [items, setItem] = useState([])
	const [tries, setTries] = useState(0)
	const [won, setWonStatus] = useState(false)
	const [guessed, setGuessed] = useState([])
	const [value, setValue] = useState('')
	const [isModalVisible, setModalVisibility] = useState(false)
	const [menuVisibility, setVisibility] = useState(false)
	const [isHowToPlayVisible, setHowToPlayVisibility] = useState(true)

	useEffect(() => {
		resetData()
		generateRandom()
	}, [])

	const generateRandom = () => {
		random = Math.floor(Math.random() * (max - min + 1) + min)
	}

	const hintMessage = () => {
		const currentNumber = guessed[guessed.length - 1]

		if (value !== '' && !won) {
			return `${currentNumber} is ${value} than the random number`
		} else if (won) {
			return `You guessed in ${tries} tries`
		} else {
			return 'Click on a number to get a hint'
		}
	}

	const guessValue = number => {
		const temp = items
		const tempTries = tries + 1
		guessed_value.push(number)
		temp[number - 1].disabled = true

		if (number > random) {
			setValue('greater')
			setGuessed(guessed_value)
			setTries(tempTries)
			setItem(temp)
		} else if (number < random) {
			setValue('lesser')
			setGuessed(guessed_value)
			setTries(tempTries)
			setItem(temp)
		} else {
			setWonStatus(true)
			setModalVisibility(true)
			setTries(tempTries)
		}
	}

	const newGame = () => {
		// Clear all the data
		generateRandom()
		resetData()
		guessed_value = []
		setWonStatus(false)
		setValue('')
		setTries(0)
		setGuessed(guessed_value)
	}

	const resetData = () => {
		const temp = []

		for (let i = 1; i <= max; i++) {
			temp.push({ value: i, disabled: false })
		}
		setItem(temp)
	}

	const HowToPlayToggle = () => setHowToPlayVisibility(false)

	return (
		<View>
			<Text style={styles.hint}>{hintMessage()}</Text>
			<View style={styles.container}>
				{items.map(data => {
					return (
						<NumberTile
							key={data.value}
							index={data.value}
							random={random}
							disabled={data.disabled}
							won={won}
							onPress={() => guessValue(data.value)}
						/>
					)
				})}
			</View>
			<Portal>
				<HowToPlay
					visible={isHowToPlayVisible}
					HowToPlayToggle={HowToPlayToggle}
				/>
			</Portal>
			{won ? (
				<View style={styles.newGameContainer}>
					<Button
						style={styles.newGameBtn}
						mode="contained"
						compact
						onPress={newGame}>
						New Game
					</Button>
				</View>
			) : null}
			<Portal>
				<Dialog
					visible={isModalVisible}
					dismissable={false}
					onDismiss={() => setModalVisibility(false)}>
					<Dialog.Title>You won!</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							The random number is{' '}
							{guessed_value[guessed_value.length - 1]}, You
							guessed in {tries} tries
						</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setModalVisibility(false)}>
							Exit
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	)
}

Game.navigationOptions = ({ navigation }) => {
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
