import { describe, expect, test } from "vitest";
import { getPronostics, type Player } from "./getPronostics";

interface Participant extends Player {
	name: string;
}

describe.concurrent("getPronostics", () => {
	test("returns player highest ratio", () => {
		//ARRANGE
		const WINNER_NAME = "Kareem";
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3100, age: 33, name: WINNER_NAME },
			{ ratio: 3000, age: 32, name: "Lebron" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2700, age: 31, name: "Michael" },
			{ ratio: 2800, age: 30, name: "Karl" },
		];

		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.champion.name).toEqual(WINNER_NAME);
	});

	test("returns player highest ratio and youngest age", () => {
		//ARRANGE
		const WINNER_NAME = "Lebron";
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 33, name: "Kareem" },
			{ ratio: 3000, age: 32, name: WINNER_NAME },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 2900, age: 24, name: "Moriarty" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2600, age: 31, name: "Michael" },
			{ ratio: 2700, age: 30, name: "Karl Xavier" },
		];

		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.champion.name).toEqual(WINNER_NAME);
	});

	test("a list with possible champions can't be empty", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 30, name: "Kareem" },
			{ ratio: 3000, age: 30, name: "Lebron" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2600, age: 31, name: "Michael" },
			{ ratio: 2700, age: 30, name: "Karl" },
		];
		const EMPTY_ARRAY: never[] = [];
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.possibleChampions).not.toEqual(EMPTY_ARRAY);
	});

	test("cannot return a default object with default values", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 30, name: "Kareem" },
			{ ratio: 3000, age: 30, name: "Lebron" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2600, age: 31, name: "Michael" },
			{ ratio: 2700, age: 30, name: "Karl" },
		];
		const DEFAULT_OBJECT = { ratio: 0, age: 0 };
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.champion).not.toEqual(DEFAULT_OBJECT);
	});

	test("returns all players with highest ratio and same age", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 32, name: "Kareem" },
			{ ratio: 3000, age: 32, name: "Lebron" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2600, age: 31, name: "Michael" },
			{ ratio: 2700, age: 30, name: "Karl" },
		];

		const POSSIBLE_CHAMPIONS: Array<Participant> = [
			{ ratio: 3000, age: 32, name: "Kareem" },
			{ ratio: 3000, age: 32, name: "Lebron" },
		];
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.possibleChampions).toEqual(POSSIBLE_CHAMPIONS);
	});

	test("returns all 3 players with highest ratio and same age", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ ratio: 3000, age: 32, name: "Kareem" },
			{ ratio: 3000, age: 32, name: "Lebron" },
			{ ratio: 3000, age: 32, name: "Moses" },
			{ ratio: 2999, age: 24, name: "Boo" },
			{ ratio: 700, age: 30, name: "Félix" },
			{ ratio: 2600, age: 31, name: "Michael" },
			{ ratio: 2700, age: 30, name: "Karl" },
		];

		const POSSIBLE_CHAMPIONS: Array<Participant> = [
			{ ratio: 3000, age: 32, name: "Kareem" },
			{ ratio: 3000, age: 32, name: "Lebron" },
			{ ratio: 3000, age: 32, name: "Moses" },
		];
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.possibleChampions).toEqual(POSSIBLE_CHAMPIONS);
	});
});
