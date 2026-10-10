import type { JSX } from 'react'
import { StatusBar } from 'react-native'

import { AppBar } from '@rootnative/components/appbar'
import { NativeStackHeaderProps } from 'expo-router'

export default function Header({
	options,
	route,
	back,
	navigation
}: NativeStackHeaderProps): JSX.Element {
	return (
		<>
			<StatusBar barStyle="light-content" />
			<AppBar
				title={options.title ?? route.name}
				colorScheme="primary"
				insetTop
				canGoBack={Boolean(back)}
				onBackPress={navigation.goBack}
			/>
		</>
	)
}
