import type { JSX } from 'react'
import { StatusBar } from 'react-native'

import { AppBar } from '@rootnative/components/appbar'
import { IconButton } from '@rootnative/components/icon-button'
import { Menu } from '@rootnative/components/menu'
import { useTheme } from '@rootnative/core'
import { NativeStackHeaderProps, router } from 'expo-router'

export default function Header({
	options,
	route,
	back,
	navigation
}: NativeStackHeaderProps): JSX.Element {
	const theme = useTheme()

	return (
		<>
			<StatusBar barStyle="light-content" />
			<AppBar
				title={options.title ?? route.name}
				colorScheme="primary"
				insetTop
				canGoBack={Boolean(back)}
				onBackPress={navigation.goBack}
				trailing={
					back ? undefined : (
						<Menu
							align="end"
							anchor={
								// AppBar colors its own actions only, so this anchor takes the
								// content color of the primary scheme by hand.
								<IconButton
									icon="dots-vertical"
									variant="standard"
									iconColor={theme.colors.onPrimary}
									accessibilityLabel="More options"
								/>
							}>
							<Menu.Item
								label="Developer"
								onPress={(): void => router.push('/developer')}
							/>
						</Menu>
					)
				}
			/>
		</>
	)
}
