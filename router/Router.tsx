import type { JSX } from 'react'
import { StatusBar } from 'react-native'

import {
	createStackNavigator,
	StackHeaderProps,
	StackNavigationOptions
} from '@react-navigation/stack'
import { AppBar } from '@rootnative/components/appbar'
import { IconButton } from '@rootnative/components/icon-button'
import { Menu } from '@rootnative/components/menu'
import { useTheme } from '@rootnative/core'

import Developer from '../views/Developer'
import Game from '../views/Game'
import HowToPlay from '../views/HowToPlay'

const Stack = createStackNavigator()

function Header({
	options,
	route,
	back,
	navigation
}: StackHeaderProps): JSX.Element {
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
								onPress={(): void => navigation.push('Developer')}
							/>
						</Menu>
					)
				}
			/>
		</>
	)
}

export default function Router(): JSX.Element {
	return (
		<Stack.Navigator
			screenOptions={{
				header: (props: StackHeaderProps): JSX.Element => <Header {...props} />
			}}
			initialRouteName="HowToPlay">
			<Stack.Screen
				name="Game"
				component={Game}
				options={(): StackNavigationOptions => ({
					title: 'Guess It'
				})}
			/>
			<Stack.Screen name="Developer" component={Developer} />
			<Stack.Screen
				name="HowToPlay"
				component={HowToPlay}
				options={(): StackNavigationOptions => ({
					headerShown: false
				})}
			/>
		</Stack.Navigator>
	)
}
