import React, { JSX } from 'react'

import { StyleSheet, View } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Dialog } from '@rootnative/components/dialog'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'
import { router } from 'expo-router'

import NumberTile from '../components/NumberTile'

const min = 1
const max = 30

const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)

const generateRandom = (): number =>
	Math.floor(Math.random() * (max - min + 1) + min)

const formatTries = (tries: number): string =>
	`${tries} ${tries === 1 ? 'try' : 'tries'}`

export default function Game(): JSX.Element {
	const theme = useTheme()
	const [random, setRandom] = React.useState(generateRandom)
	const [guessed, setGuessed] = React.useState<Array<number>>([])

	const tries = guessed.length
	const currentNumber = guessed[tries - 1]
	const won = currentNumber === random
	const low = Math.max(
		min,
		...guessed.filter((n) => n < random).map((n) => n + 1)
	)
	const high = Math.min(
		max,
		...guessed.filter((n) => n > random).map((n) => n - 1)
	)

	const hint = (): { message: string; detail: string; color: string } => {
		if (won) {
			return {
				message: `You guessed in ${formatTries(tries)}`,
				detail: `The random number is ${random}`,
				color: theme.colors.primary
			}
		}

		if (currentNumber === undefined) {
			return {
				message: 'Tap a number to start',
				detail: `Between ${min} and ${max}`,
				color: theme.colors.onSurfaceVariant
			}
		}

		const range =
			low === high ? `Only ${low} is left` : `Between ${low} and ${high}`

		return {
			message:
				currentNumber > random
					? `Go lower than ${currentNumber}`
					: `Go higher than ${currentNumber}`,
			detail: `${range} · ${formatTries(tries)}`,
			color: theme.colors.error
		}
	}

	const guessValue = (number: number): void =>
		setGuessed((previous) => [...previous, number])

	const newGame = (): void => {
		setRandom(generateRandom())
		setGuessed([])
	}

	const { message, detail, color } = hint()

	return (
		<Layout>
			<View style={styles.hint}>
				<Typography variant="titleLarge" color={color} style={styles.hintText}>
					{message}
				</Typography>
				<Typography
					variant="bodyMedium"
					color={theme.colors.onSurfaceVariant}
					style={styles.hintText}>
					{detail}
				</Typography>
			</View>
			<View style={styles.container}>
				{numbers.map((value) => (
					<NumberTile
						won={won}
						key={value}
						index={value}
						random={random}
						disabled={guessed.includes(value)}
						onPress={(): void => guessValue(value)}
					/>
				))}
			</View>
			<Dialog dismissable={false} visible={won} onDismiss={newGame}>
				<Dialog.Title>You won!</Dialog.Title>
				<Dialog.Content>
					{`The random number is ${random}. You guessed in ${formatTries(
						tries
					)}.`}
				</Dialog.Content>
				<Dialog.Actions>
					<Button variant="text" onPress={(): void => router.dismissTo('/')}>
						Home
					</Button>
					<Button variant="text" onPress={newGame}>
						Play again
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	hint: {
		padding: 10,
		gap: 4
	},
	hintText: {
		textAlign: 'center'
	}
})
