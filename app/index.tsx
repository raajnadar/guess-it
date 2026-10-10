import type { JSX } from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'
import { router } from 'expo-router'

export default function Home(): JSX.Element {
	const theme = useTheme()

	return (
		<Layout edges={['top', 'bottom']} style={styles.container}>
			<StatusBar barStyle="dark-content" />
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
			<View style={styles.actions}>
				<Button
					size="medium"
					style={styles.button}
					onPress={(): void => router.push('/game')}>
					Play
				</Button>
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
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 24
	},
	hero: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16
	},
	icon: {
		width: 128,
		height: 128,
		borderRadius: 28
	},
	tagline: {
		textAlign: 'center'
	},
	actions: {
		gap: 12
	},
	button: {
		alignSelf: 'stretch'
	}
})
