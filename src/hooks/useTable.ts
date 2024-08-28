import { useEffect, useState } from "react";
import { LEFT_TO_RIGHT_KEY_FRAME, RIGHT_TO_LEFT_KEY_FRAME, TABLE_ANIMATION } from "../constants";
import { EPlayer } from "../enums";
import { RoundTableCards } from "../type";
import { StringUtils } from "../utils";

interface ITableProps {
	tableCards: RoundTableCards;
	winner?: EPlayer;
}

interface ITableExports {
	animation: Array<string>;
}

export const useTable = (props: ITableProps): ITableExports => {
	const [animation, setAnimation] = useState<Array<string>>([]);

	useEffect(() => {
		if (animation.length === 0 && props.tableCards.length !== 0 && props.winner !== undefined) {
			const indexOfWinner: number = props.tableCards
				.filter((cardValue) => cardValue.isRequired)
				.map((cardValue) => cardValue.player)
				.indexOf(props.winner);
			setAnimation(
				props.tableCards
					.filter((cardValue) => cardValue.isRequired)
					.map((_, cardIndex) => {
						if (cardIndex < indexOfWinner) {
							return StringUtils.replace(TABLE_ANIMATION, LEFT_TO_RIGHT_KEY_FRAME);
						} else if (cardIndex > indexOfWinner) {
							return StringUtils.replace(TABLE_ANIMATION, RIGHT_TO_LEFT_KEY_FRAME);
						} else {
							return StringUtils.replace(TABLE_ANIMATION);
						}
					})
			);
		}
	}, [animation, props]);

	useEffect(() => {
		if (animation.length !== 0 && props.winner === undefined) {
			setAnimation([]);
		}
	}, [animation, props]);

	return { animation };
};
