import type { JSX } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { Icon } from '@rootnative/components/icon'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'

export type TileStatus = 'open' | 'wrong' | 'correct'

type Props = {
	value: number
	status: TileStatus
	columns: number
	disabled: boolean
	onPress: () => void
}

const statusLabels: Record<TileStatus, string> = {
	open: '',
	wrong: ', wrong',
	correct: ', correct'
}

export default function NumberTile({
	value,
	status,
	columns,
	disabled,
	onPress
}: Props): JSX.Element {
	const theme = useTheme()
	const compact = columns > 5

	const colors = {
		open: {
			container: theme.colors.surfaceContainerHigh,
			content: theme.colors.onSurface
		},
		wrong: {
			container: theme.colors.errorContainer,
			content: theme.colors.onErrorContainer
		},
		correct: {
			container: theme.colors.primary,
			content: theme.colors.onPrimary
		}
	}[status]

	return (
		<View style={[styles.cell, { width: `${100 / columns}%` }]}>
			<Pressable
				onPress={onPress}
				disabled={disabled}
				accessibilityRole="button"
				accessibilityLabel={`${value}${statusLabels[status]}`}
				accessibilityState={{ disabled }}
				style={({ pressed }) => [
					styles.tile,
					compact && styles.compactTile,
					{
						backgroundColor: pressed
							? theme.colors.surfaceContainerHighest
							: colors.container
					}
				]}>
				<Typography
					variant={compact ? 'titleSmall' : 'titleLarge'}
					color={colors.content}
					style={status === 'wrong' && styles.struck}>
					{value}
				</Typography>
				{status === 'correct' ? (
					<Icon
						source="check"
						size={compact ? 10 : 16}
						color={colors.content}
						style={[styles.check, compact && styles.compactCheck]}
					/>
				) : null}
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	cell: {
		padding: 2
	},
	tile: {
		aspectRatio: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12
	},
	compactTile: {
		borderRadius: 8
	},
	struck: {
		textDecorationLine: 'line-through'
	},
	check: {
		position: 'absolute',
		top: 4,
		right: 4
	},
	compactCheck: {
		top: 2,
		right: 2
	}
})
