import React, { Component } from 'react'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import Router from './router'

export default class App extends Component {
	render() {
		return (
			<PaperProvider theme={DefaultTheme}>
				<Router />
			</PaperProvider>
		)
	}
}
