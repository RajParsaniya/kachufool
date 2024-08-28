import { ECard, ECardType } from "../enums";

interface IResourceExports {
	getCard: (card: ECard) => string;
	getCardType: (type: ECardType) => string;
}

export const useResource = (): IResourceExports => {
	const getCard = (card: ECard): string => {
		const base: string = "/kachufool/card";
		switch (card) {
			case ECard.CLUBS_OF_2:
				return base + "/clubs_of_2.svg";
			case ECard.CLUBS_OF_3:
				return base + "/clubs_of_3.svg";
			case ECard.CLUBS_OF_4:
				return base + "/clubs_of_4.svg";
			case ECard.CLUBS_OF_5:
				return base + "/clubs_of_5.svg";
			case ECard.CLUBS_OF_6:
				return base + "/clubs_of_6.svg";
			case ECard.CLUBS_OF_7:
				return base + "/clubs_of_7.svg";
			case ECard.CLUBS_OF_8:
				return base + "/clubs_of_8.svg";
			case ECard.CLUBS_OF_9:
				return base + "/clubs_of_9.svg";
			case ECard.CLUBS_OF_10:
				return base + "/clubs_of_10.svg";
			case ECard.CLUBS_OF_JACK:
				return base + "/clubs_of_jack.svg";
			case ECard.CLUBS_OF_QUEEN:
				return base + "/clubs_of_queen.svg";
			case ECard.CLUBS_OF_KING:
				return base + "/clubs_of_king.svg";
			case ECard.CLUBS_OF_ACE:
				return base + "/clubs_of_ace.svg";
			case ECard.DIAMONDS_OF_2:
				return base + "/diamonds_of_2.svg";
			case ECard.DIAMONDS_OF_3:
				return base + "/diamonds_of_3.svg";
			case ECard.DIAMONDS_OF_4:
				return base + "/diamonds_of_4.svg";
			case ECard.DIAMONDS_OF_5:
				return base + "/diamonds_of_5.svg";
			case ECard.DIAMONDS_OF_6:
				return base + "/diamonds_of_6.svg";
			case ECard.DIAMONDS_OF_7:
				return base + "/diamonds_of_7.svg";
			case ECard.DIAMONDS_OF_8:
				return base + "/diamonds_of_8.svg";
			case ECard.DIAMONDS_OF_9:
				return base + "/diamonds_of_9.svg";
			case ECard.DIAMONDS_OF_10:
				return base + "/diamonds_of_10.svg";
			case ECard.DIAMONDS_OF_JACK:
				return base + "/diamonds_of_jack.svg";
			case ECard.DIAMONDS_OF_QUEEN:
				return base + "/diamonds_of_queen.svg";
			case ECard.DIAMONDS_OF_KING:
				return base + "/diamonds_of_king.svg";
			case ECard.DIAMONDS_OF_ACE:
				return base + "/diamonds_of_ace.svg";
			case ECard.HEARTS_OF_2:
				return base + "/hearts_of_2.svg";
			case ECard.HEARTS_OF_3:
				return base + "/hearts_of_3.svg";
			case ECard.HEARTS_OF_4:
				return base + "/hearts_of_4.svg";
			case ECard.HEARTS_OF_5:
				return base + "/hearts_of_5.svg";
			case ECard.HEARTS_OF_6:
				return base + "/hearts_of_6.svg";
			case ECard.HEARTS_OF_7:
				return base + "/hearts_of_7.svg";
			case ECard.HEARTS_OF_8:
				return base + "/hearts_of_8.svg";
			case ECard.HEARTS_OF_9:
				return base + "/hearts_of_9.svg";
			case ECard.HEARTS_OF_10:
				return base + "/hearts_of_10.svg";
			case ECard.HEARTS_OF_JACK:
				return base + "/hearts_of_jack.svg";
			case ECard.HEARTS_OF_QUEEN:
				return base + "/hearts_of_queen.svg";
			case ECard.HEARTS_OF_KING:
				return base + "/hearts_of_king.svg";
			case ECard.HEARTS_OF_ACE:
				return base + "/hearts_of_ace.svg";
			case ECard.SPADES_OF_2:
				return base + "/spades_of_2.svg";
			case ECard.SPADES_OF_3:
				return base + "/spades_of_3.svg";
			case ECard.SPADES_OF_4:
				return base + "/spades_of_4.svg";
			case ECard.SPADES_OF_5:
				return base + "/spades_of_5.svg";
			case ECard.SPADES_OF_6:
				return base + "/spades_of_6.svg";
			case ECard.SPADES_OF_7:
				return base + "/spades_of_7.svg";
			case ECard.SPADES_OF_8:
				return base + "/spades_of_8.svg";
			case ECard.SPADES_OF_9:
				return base + "/spades_of_9.svg";
			case ECard.SPADES_OF_10:
				return base + "/spades_of_10.svg";
			case ECard.SPADES_OF_JACK:
				return base + "/spades_of_jack.svg";
			case ECard.SPADES_OF_QUEEN:
				return base + "/spades_of_queen.svg";
			case ECard.SPADES_OF_KING:
				return base + "/spades_of_king.svg";
			case ECard.SPADES_OF_ACE:
				return base + "/spades_of_ace.svg";
		}
	};

	const getCardType = (type: ECardType): string => {
		const base: string = "/kachufool/type";
		switch (type) {
			case ECardType.CLUBS:
				return base + "/clubs.svg";
			case ECardType.DIAMONDS:
				return base + "/diamonds.svg";
			case ECardType.HEARTS:
				return base + "/hearts.svg";
			case ECardType.SPADES:
				return base + "/spades.svg";
		}
	};

	return { getCard, getCardType };
};
