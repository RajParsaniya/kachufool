export enum ETable {
	FIRST = "Table 1",
	SECOND = "Table 2",
	THIRD = "Table 3",
	FOURTH = "Table 4",
	FIFTH = "Table 5",
	SIXTH = "Table 6",
	SEVENTH = "Table 7",
	EIGHTH = "Table 8",
}

export const allTables = (): Array<ETable> => {
	return Object.keys(ETable).map((_, index) => Object.values(ETable)[index]);
};
