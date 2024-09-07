import { ECard, ECardType, ERound, EJudgment } from "../enums";

interface IValueExports {
	getCardTypeByCard: (card: ECard) => ECardType;
	getCardTypeByRound: (round: ERound) => ECardType;
	getScore: (isRandom: boolean, achivedJudgment: EJudgment, predictedJudgment?: EJudgment) => number;
}

export const useValue = (): IValueExports => {
	const getCardTypeByCard = (card: ECard): ECardType => {
		switch (card) {
			case ECard.CLUBS_OF_2:
			case ECard.CLUBS_OF_3:
			case ECard.CLUBS_OF_4:
			case ECard.CLUBS_OF_5:
			case ECard.CLUBS_OF_6:
			case ECard.CLUBS_OF_7:
			case ECard.CLUBS_OF_8:
			case ECard.CLUBS_OF_9:
			case ECard.CLUBS_OF_10:
			case ECard.CLUBS_OF_JACK:
			case ECard.CLUBS_OF_QUEEN:
			case ECard.CLUBS_OF_KING:
			case ECard.CLUBS_OF_ACE:
				return ECardType.CLUBS;
			case ECard.DIAMONDS_OF_2:
			case ECard.DIAMONDS_OF_3:
			case ECard.DIAMONDS_OF_4:
			case ECard.DIAMONDS_OF_5:
			case ECard.DIAMONDS_OF_6:
			case ECard.DIAMONDS_OF_7:
			case ECard.DIAMONDS_OF_8:
			case ECard.DIAMONDS_OF_9:
			case ECard.DIAMONDS_OF_10:
			case ECard.DIAMONDS_OF_JACK:
			case ECard.DIAMONDS_OF_QUEEN:
			case ECard.DIAMONDS_OF_KING:
			case ECard.DIAMONDS_OF_ACE:
				return ECardType.DIAMONDS;
			case ECard.HEARTS_OF_2:
			case ECard.HEARTS_OF_3:
			case ECard.HEARTS_OF_4:
			case ECard.HEARTS_OF_5:
			case ECard.HEARTS_OF_6:
			case ECard.HEARTS_OF_7:
			case ECard.HEARTS_OF_8:
			case ECard.HEARTS_OF_9:
			case ECard.HEARTS_OF_10:
			case ECard.HEARTS_OF_JACK:
			case ECard.HEARTS_OF_QUEEN:
			case ECard.HEARTS_OF_KING:
			case ECard.HEARTS_OF_ACE:
				return ECardType.HEARTS;
			case ECard.SPADES_OF_2:
			case ECard.SPADES_OF_3:
			case ECard.SPADES_OF_4:
			case ECard.SPADES_OF_5:
			case ECard.SPADES_OF_6:
			case ECard.SPADES_OF_7:
			case ECard.SPADES_OF_8:
			case ECard.SPADES_OF_9:
			case ECard.SPADES_OF_10:
			case ECard.SPADES_OF_JACK:
			case ECard.SPADES_OF_QUEEN:
			case ECard.SPADES_OF_KING:
			case ECard.SPADES_OF_ACE:
				return ECardType.SPADES;
		}
	};

	const getCardTypeByRound = (round: ERound): ECardType => {
		switch (round) {
			case ERound.FIRST:
				return ECardType.SPADES;
			case ERound.SECOND:
				return ECardType.DIAMONDS;
			case ERound.THIRD:
				return ECardType.CLUBS;
			case ERound.FOURTH:
				return ECardType.HEARTS;
		}
	};

	const getScore = (isRandom: boolean, achivedJudgment: EJudgment, predictedJudgment?: EJudgment): number => {
		const bonus: number = 10;
		if (predictedJudgment !== undefined && achivedJudgment === predictedJudgment) {
			switch (achivedJudgment) {
				case EJudgment.ZERO:
					return isRandom ? 10 + bonus : 10;
				case EJudgment.ONE:
					return isRandom ? 10 + bonus : 10;
				case EJudgment.TWO:
					return isRandom ? 20 + bonus : 20;
				case EJudgment.THREE:
					return isRandom ? 30 + bonus : 30;
				case EJudgment.FOUR:
					return isRandom ? 40 + bonus : 40;
				case EJudgment.FIVE:
					return isRandom ? 50 + bonus : 50;
				case EJudgment.SIX:
					return isRandom ? 60 + bonus : 60;
				case EJudgment.SEVEN:
					return isRandom ? 70 + bonus : 70;
				case EJudgment.EIGHT:
					return isRandom ? 80 + bonus : 80;
			}
		} else {
			return 0;
		}
	};

	return { getCardTypeByCard, getCardTypeByRound, getScore };
};
