export interface Player {
	ratio: number;
	age: number;
}

export interface Pronostics<T extends Player> {
	champion: T;
	possibleChampions: Array<T>;
}

function isYounger<T extends { age: number }>(target: T, other: T): boolean {
	return target.age < other.age;
}

function isStronger<T extends { ratio: number }>(target: T, other: T): boolean {
	return target.ratio > other.ratio;
}

function areEqualPlayers<T extends { ratio: number; age: number }>(target: T, other: T): boolean {
	return target.age === other.age && target.ratio === other.ratio;
}

/**
 * This algorithm runs with O(n) spatio-temporal complexity, n being the number of element
 * It's looping one time through the list, and time grows proportionally to the number of elements
 * As for space, it's always the same 1 object containing 1 object and 1 array of growable size: that's being mutated throughout the loop
 * @param participants
 * @returns Pronostics
 */
export function getPronostics<T extends Player>(participants: Array<T>): Pronostics<T> {
	const PRONOSTICS: Pronostics<T> = participants.reduce(
		(pronostics, other) => {

			if (
				pronostics.possibleChampions.some((possibleChampion) => {
					!isStronger(possibleChampion, other)
				})
			) {
				pronostics["champion"] = other;
				pronostics["possibleChampions"] = [];
				return pronostics;
			}

			if (areEqualPlayers(pronostics.champion, other)) {
				pronostics["possibleChampions"].push(pronostics.champion);
				pronostics["possibleChampions"].push(other);
				pronostics.possibleChampions = Array.from(new Set(pronostics.possibleChampions));
				
				return pronostics;
			}
			
			if (!isStronger(pronostics.champion, other)) {
				pronostics["champion"] = other;
				return pronostics;
			}

			if (!isStronger(pronostics.champion, other) && !isYounger(pronostics.champion, other)) {
				pronostics["champion"] = other;
				return pronostics;
			}
			


			return pronostics;
		},
		{
			champion: { ratio: 0, age: 0 } as T,
			possibleChampions: [] as Array<T>,
		}
	);

	return PRONOSTICS;
}
