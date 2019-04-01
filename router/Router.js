/* eslint-disable object-shorthand */
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Game from '../views/Game'

const stack = createStackNavigator(
	{
		Game: Game
	},
	{
		initialRouteName: 'Game'
	}
)

export default createAppContainer(stack)
