/* eslint-disable object-shorthand */
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Developer from '../views/Developer'
import Game from '../views/Game'

const stack = createStackNavigator(
	{
		Developer: Developer,
		Game: Game
	},
	{
		defaultNavigationOptions: {
			header: null
		},
		initialRouteName: 'Game'
	}
)

export default createAppContainer(stack)
