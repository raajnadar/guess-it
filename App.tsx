import React, { useEffect } from 'react'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import Router from './router/Router'

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#800080',
		accent: 'yellow'
	}
}

export default function App(): JSX.Element {
	useEffect(() => {
		StatusBar.setBarStyle('light-content')
		StatusBar.setBackgroundColor('#640164')
	}, [])

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
		</PaperProvider>
	)
}
