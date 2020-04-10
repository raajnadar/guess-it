/* eslint-disable react/display-name */
import React, { useState } from 'react'

import {
	createStackNavigator,
	StackHeaderProps,
	StackNavigationOptions
} from '@react-navigation/stack'

import Developer from '../views/Developer'
import Game from '../views/Game'
import HowToPlay from '../views/HowToPlay'

import { Appbar, Menu, IconButton } from 'react-native-paper'

const Stack = createStackNavigator()

export default function Router(): JSX.Element {
	const [menuVisibility, setMenuVisibility] = useState(false)

	return (
		<Stack.Navigator
			screenOptions={{
				header: ({
					scene,
					previous,
					navigation
				}: StackHeaderProps): JSX.Element => {
					return (
						<Appbar.Header>
							{previous ? (
								<Appbar.BackAction
									onPress={navigation.goBack}
								/>
							) : null}
							<Appbar.Content
								title={scene.descriptor.options.title}
							/>
							{!previous ? (
								<Menu
									visible={menuVisibility}
									onDismiss={(): void =>
										setMenuVisibility(false)
									}
									anchor={
										<IconButton
											color={'#fff'}
											icon="dots-vertical"
											onPress={(): void =>
												setMenuVisibility(
													!menuVisibility
												)
											}
										/>
									}>
									<Menu.Item
										title="Developer"
										onPress={(): void => {
											navigation.push('Developer')
											setMenuVisibility(false)
										}}
									/>
								</Menu>
							) : null}
						</Appbar.Header>
					)
				}
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
