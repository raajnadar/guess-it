import type { JSX } from 'react'
import { Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Card } from '@rootnative/components/card'
import { Icon } from '@rootnative/components/icon'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'
import { router } from 'expo-router'

import { levels, min } from '../game/levels'

export default function Home(): JSX.Element {
	const theme = useTheme()

	return (
		<Layout edges={['top', 'bottom']}>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.hero}>
					<Image
						source={require('../assets/icon.png')}
						style={styles.icon}
						accessibilityIgnoresInvertColors
					/>
					<Typography variant="displaySmall">Guess It</Typography>
					<Typography
						variant="bodyLarge"
						color={theme.colors.onSurfaceVariant}
						style={styles.tagline}>
						Find the hidden number with the fewest tries.
					</Typography>
				</View>
				<View style={styles.levels}>
					<Typography variant="titleMedium">Select a level</Typography>
					{levels.map((level) => (
						<Card
							key={level.id}
							variant="filled"
							accessibilityLabel={`${level.label}, numbers ${min} to ${level.max}`}
							onPress={(): void => router.push(`/game/${level.id}`)}>
							<View style={styles.level}>
								<View style={styles.levelText}>
									<Typography variant="titleMedium">{level.label}</Typography>
									<Typography
										variant="bodyMedium"
										color={theme.colors.onSurfaceVariant}>
										{`Numbers ${min} to ${level.max}`}
									</Typography>
								</View>
								<Icon
									source="chevron-right"
									color={theme.colors.onSurfaceVariant}
								/>
							</View>
						</Card>
					))}
				</View>
				<View style={styles.actions}>
					<Button
						size="medium"
						variant="tonal"
						style={styles.button}
						onPress={(): void => router.push('/how-to-play')}>
						How to play
					</Button>
					<Button
						size="medium"
						variant="text"
						style={styles.button}
						onPress={(): void => router.push('/about')}>
						About
					</Button>
				</View>
			</ScrollView>
		</Layout>
	)
}

const styles = StyleSheet.create({
	content: {
		flexGrow: 1,
		padding: 24,
		gap: 24
	},
	hero: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 12
	},
	icon: {
		width: 96,
		height: 96,
		borderRadius: 22
	},
	tagline: {
		textAlign: 'center'
	},
	levels: {
		gap: 8
	},
	level: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		gap: 16
	},
	levelText: {
		flex: 1,
		gap: 2
	},
	actions: {
		gap: 8
	},
	button: {
		alignSelf: 'stretch'
	}
})
