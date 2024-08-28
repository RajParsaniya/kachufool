export enum ECardType {
	CLUBS = "Clubs",
	DIAMONDS = "Diamonds",
	HEARTS = "Hearts",
	SPADES = "Spades",
}

export const allCardType = (): Array<ECardType> => {
	return Object.keys(ECardType).map((_, index) => Object.values(ECardType)[index]);
};
