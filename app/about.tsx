import type { JSX } from 'react'
import { Linking, StyleSheet } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Card } from '@rootnative/components/card'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'

export default function About(): JSX.Element {
	return (
		<Layout style={styles.container}>
			<Card>
				<Card.Content>
					<Typography variant="bodyLarge">
						Guess the number mobile application developed by Rajendran Nadar.
					</Typography>
				</Card.Content>
				<Card.Actions>
					<Button
						variant="text"
						onPress={(): Promise<void> =>
							Linking.openURL('https://raajnadar.in')
						}>
						View Portfolio
					</Button>
				</Card.Actions>
			</Card>
			<Card>
				<Card.Content>
					<Typography variant="bodyLarge">Built with React Native</Typography>
				</Card.Content>
			</Card>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 10
	}
})
