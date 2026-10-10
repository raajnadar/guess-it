export type LevelId = 'easy' | 'normal' | 'hard'

export type Level = {
	id: LevelId
	label: string
	max: number
	columns: number
}

export const min = 1

export const levels: Array<Level> = [
	{ id: 'easy', label: 'Easy', max: 30, columns: 5 },
	{ id: 'normal', label: 'Normal', max: 50, columns: 10 },
	{ id: 'hard', label: 'Hard', max: 100, columns: 10 }
]

export const findLevel = (id: unknown): Level | undefined =>
	levels.find((level) => level.id === id)
