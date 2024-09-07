export enum EJudgment {
	ZERO = 0,
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
}

export const allJudgments = (): Array<EJudgment> => {
	return Object.values(EJudgment)
		.map((judgmentValue) => Number(judgmentValue))
		.filter((judgmentValue) => !isNaN(judgmentValue));
};
