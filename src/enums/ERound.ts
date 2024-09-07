export enum ERound {
	FIRST = "Round 1",
	SECOND = "Round 2",
	THIRD = "Round 3",
	FOURTH = "Round 4",
}

export const allRounds = (): Array<ERound> => {
	return Object.keys(ERound).map((_, index) => Object.values(ERound)[index]);
};
