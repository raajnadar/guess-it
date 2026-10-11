import Storage from 'expo-sqlite/kv-store'

import { LevelId, levels } from './levels'

export type BestScores = Partial<Record<LevelId, number>>

export type ScoreResult = {
	best: number
	newBest: boolean
}

const bestScoreKey = (level: LevelId): string => `best:${level}`

export const formatTries = (tries: number): string =>
	`${tries} ${tries === 1 ? 'try' : 'tries'}`

export const getBestScore = (level: LevelId): number | undefined => {
	const value = Storage.getItemSync(bestScoreKey(level))

	return value === null ? undefined : Number(value)
}

export const getBestScores = (): BestScores =>
	Object.fromEntries(levels.map((level) => [level.id, getBestScore(level.id)]))

export const saveScore = (level: LevelId, tries: number): ScoreResult => {
	const best = getBestScore(level)

	if (best !== undefined && best <= tries) {
		return { best, newBest: false }
	}

	Storage.setItemSync(bestScoreKey(level), String(tries))

	return { best: tries, newBest: true }
}
