import { ECard } from "../enums";

interface ICardExports {
	getLargestCard: (Cards: Array<ECard>) => ECard;
	getShortestCard: (Cards: Array<ECard>) => ECard;
	getSortedCards: (cards: Array<ECard>) => Array<ECard>;
}

export const useCard = (): ICardExports => {
	const getLargestCard = (cards: Array<ECard>): ECard => {
		const sortedCard: Record<string, number> = {
			["2"]: 2,
			["3"]: 3,
			["4"]: 4,
			["5"]: 5,
			["6"]: 6,
			["7"]: 7,
			["8"]: 8,
			["9"]: 9,
			["10"]: 10,
			["Jack"]: 11,
			["Queen"]: 12,
			["King"]: 13,
			["Ace"]: 14,
		};

		return cards
			.map((cardValue) => {
				const [sortedCard, sortedCardType] = cardValue.split(" of ");
				return { card: cardValue, sortedCard, sortedCardType };
			})
			.sort((a, b) => sortedCard[b.sortedCard] - sortedCard[a.sortedCard])
			.map(({ card }) => card)[0];
	};

	const getShortestCard = (cards: Array<ECard>): ECard => {
		const sortedCard: Record<string, number> = {
			["2"]: 2,
			["3"]: 3,
			["4"]: 4,
			["5"]: 5,
			["6"]: 6,
			["7"]: 7,
			["8"]: 8,
			["9"]: 9,
			["10"]: 10,
			["Jack"]: 11,
			["Queen"]: 12,
			["King"]: 13,
			["Ace"]: 14,
		};

		return cards
			.map((cardValue) => {
				const [sortedCard, sortedCardType] = cardValue.split(" of ");
				return { card: cardValue, sortedCard, sortedCardType };
			})
			.sort((a, b) => sortedCard[a.sortedCard] - sortedCard[b.sortedCard])
			.map(({ card }) => card)[0];
	};

	const getSortedCards = (cards: Array<ECard>): Array<ECard> => {
		const sortedCard: Record<string, number> = {
			["2"]: 2,
			["3"]: 3,
			["4"]: 4,
			["5"]: 5,
			["6"]: 6,
			["7"]: 7,
			["8"]: 8,
			["9"]: 9,
			["10"]: 10,
			["Jack"]: 11,
			["Queen"]: 12,
			["King"]: 13,
			["Ace"]: 14,
		};

		const sortedCardType: Record<string, number> = {
			["Spades"]: 1,
			["Diamonds"]: 2,
			["Clubs"]: 3,
			["Hearts"]: 4,
		};

		return cards
			.map((cardValue) => {
				const [sortedCard, sortedCardType] = cardValue.split(" of ");
				return { card: cardValue, sortedCard, sortedCardType };
			})
			.sort((a, b) => sortedCardType[a.sortedCardType] - sortedCardType[b.sortedCardType] || sortedCard[a.sortedCard] - sortedCard[b.sortedCard])
			.map(({ card }) => card);
	};

	return { getLargestCard, getShortestCard, getSortedCards };
};
