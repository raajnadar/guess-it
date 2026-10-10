import type { JSX } from 'react'
import { Image, Linking, ScrollView, StyleSheet, View } from 'react-native'

import { Avatar } from '@rootnative/components/avatar'
import { Card } from '@rootnative/components/card'
import { Icon } from '@rootnative/components/icon'
import { Layout } from '@rootnative/components/layout'
import { List, ListItem } from '@rootnative/components/list'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'
import Constants from 'expo-constants'

type Link = {
	title: string
	description: string
	icon: string
	url: string
}

const sections: { title: string; links: Link[] }[] = [
	{
		title: 'Developer',
		links: [
			{
				title: 'Rajendran Nadar',
				description: 'raajnadar.in',
				icon: 'account',
				url: 'https://raajnadar.in'
			},
			{
				title: 'Source code',
				description: 'github.com/raajnadar/guess-it',
				icon: 'github',
				url: 'https://github.com/raajnadar/guess-it'
			}
		]
	},
	{
		title: 'Built with',
		links: [
			{
				title: 'React Native',
				description: 'Mobile app framework',
				icon: 'react',
				url: 'https://reactnative.dev'
			},
			{
				title: 'Expo',
				description: 'Build tools and file-based routes',
				icon: 'cellphone',
				url: 'https://expo.dev'
			},
			{
				title: 'RootNative UI',
				description: 'Material Design 3 theme and components',
				icon: 'material-design',
				url: 'https://rootnative.github.io/ui/'
			}
		]
	}
]

export default function About(): JSX.Element {
	const theme = useTheme()
	const version = Constants.expoConfig?.version

	return (
		<Layout>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.hero}>
					<Image
						source={require('../assets/icon.png')}
						style={styles.icon}
						accessibilityIgnoresInvertColors
					/>
					<Typography variant="headlineMedium">Guess It</Typography>
					{version ? (
						<Typography
							variant="labelLarge"
							color={theme.colors.onSurfaceVariant}>
							{`Version ${version}`}
						</Typography>
					) : null}
				</View>
				{sections.map((section) => (
					<View key={section.title} style={styles.section}>
						<Typography
							variant="titleSmall"
							color={theme.colors.primary}
							accessibilityRole="header"
							style={styles.sectionTitle}>
							{section.title}
						</Typography>
						<Card variant="filled">
							<List>
								{section.links.map((link) => (
									<ListItem
										key={link.url}
										headlineText={link.title}
										supportingText={link.description}
										supportingTextNumberOfLines={2}
										leadingContent={
											<Avatar
												icon={link.icon}
												containerColor={theme.colors.secondaryContainer}
												contentColor={theme.colors.onSecondaryContainer}
											/>
										}
										trailingContent={
											<Icon
												source="open-in-new"
												size={20}
												color={theme.colors.onSurfaceVariant}
											/>
										}
										onPress={(): Promise<void> => Linking.openURL(link.url)}
									/>
								))}
							</List>
						</Card>
					</View>
				))}
				<Typography
					variant="bodySmall"
					color={theme.colors.onSurfaceVariant}
					style={styles.footer}>
					Open source under the MIT License. Started in 2018.
				</Typography>
			</ScrollView>
		</Layout>
	)
}

const styles = StyleSheet.create({
	content: {
		padding: 24,
		gap: 24
	},
	hero: {
		alignItems: 'center',
		gap: 8
	},
	icon: {
		width: 96,
		height: 96,
		borderRadius: 22,
		marginBottom: 4
	},
	section: {
		gap: 8
	},
	sectionTitle: {
		paddingHorizontal: 4
	},
	footer: {
		textAlign: 'center'
	}
})
