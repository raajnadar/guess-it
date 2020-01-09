import React, { useEffect } from 'react'

import {
	DefaultTheme,
	Provider as PaperProvider,
	useTheme
} from 'react-native-paper'

import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import Router from './router/Router'

export default function App(): JSX.Element {
	const theme = useTheme()

	useEffect(() => {
		StatusBar.setBackgroundColor(theme.colors.primary)
	})

	return (
		<PaperProvider theme={DefaultTheme}>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
		</PaperProvider>
	)
}
