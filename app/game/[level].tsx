import React, { JSX } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Dialog } from '@rootnative/components/dialog'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'
import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router'

import NumberTile, { TileStatus } from '../../components/NumberTile'
import { findLevel, Level, min } from '../../game/levels'

const generateRandom = (max: number): number =>
	Math.floor(Math.random() * (max - min + 1) + min)

const formatTries = (tries: number): string =>
	`${tries} ${tries === 1 ? 'try' : 'tries'}`

export default function GameScreen(): JSX.Element {
	const params = useLocalSearchParams<{ level: string }>()
	const level = findLevel(params.level)

	if (!level) {
		return <Redirect href="/" />
	}

	return <Game level={level} />
}

function Game({ level }: { level: Level }): JSX.Element {
	const { label, max, columns } = level
	const theme = useTheme()
	const [random, setRandom] = React.useState(() => generateRandom(max))
	const [guessed, setGuessed] = React.useState<Array<number>>([])

	const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)
	// Use explicit rows, not flexWrap. In floating point, ten cells of '10%'
	// are a little wider than the row, so flexWrap moves one cell down.
	const rows = Array.from(
		{ length: Math.ceil(numbers.length / columns) },
		(_, r) => numbers.slice(r * columns, (r + 1) * columns)
	)
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

	const tileStatus = (value: number): TileStatus => {
		if (!guessed.includes(value)) {
			return 'open'
		}

		return value === random ? 'correct' : 'wrong'
	}

	const guessValue = (number: number): void =>
		setGuessed((previous) => [...previous, number])

	const newGame = (): void => {
		setRandom(generateRandom(max))
		setGuessed([])
	}

	const { message, detail, color } = hint()

	return (
		<Layout>
			<Stack.Screen options={{ title: label }} />
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
			<ScrollView contentContainerStyle={styles.grid}>
				{rows.map((row) => (
					<View key={row[0]} style={styles.row}>
						{row.map((value) => (
							<NumberTile
								key={value}
								value={value}
								columns={columns}
								status={tileStatus(value)}
								disabled={won || guessed.includes(value)}
								onPress={(): void => guessValue(value)}
							/>
						))}
					</View>
				))}
			</ScrollView>
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
	grid: {
		paddingHorizontal: 8,
		paddingBottom: 8
	},
	row: {
		flexDirection: 'row'
	},
	hint: {
		padding: 10,
		gap: 4
	},
	hintText: {
		textAlign: 'center'
	}
})
