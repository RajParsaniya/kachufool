import {
	JUDGMENT_PREDICTED_MESSAGE,
	RANDOM_JUDGMENT_PREDICTED_MESSAGE,
	ROUND_ENDING_MESSAGE,
	ROUND_INITIALIZING_MESSAGE,
	ROUND_STARTING_MESSAGE,
} from "../constants";
import { EJudgment, EPlayer, ERound } from "../enums";
import { StringUtils } from "../utils";

interface IMessageExports {
	getRoundInitializingMessage: (round: ERound) => string;
	getJudgmentPredictedMessage: (player: EPlayer, predictedJudgment: EJudgment, isRandom: boolean) => string;
	getRoundStartingMessage: (round: ERound) => string;
	getRoundEndingMessage: (round: ERound) => string;
}

export const useMessage = (): IMessageExports => {
	const getRoundInitializingMessage = (round: ERound): string => {
		return StringUtils.replace(ROUND_INITIALIZING_MESSAGE, round);
	};

	const getJudgmentPredictedMessage = (player: EPlayer, predictedJudgment: EJudgment, isRandom: boolean): string => {
		return isRandom
			? StringUtils.replace(JUDGMENT_PREDICTED_MESSAGE, player, predictedJudgment.toString())
			: StringUtils.replace(RANDOM_JUDGMENT_PREDICTED_MESSAGE, player, predictedJudgment.toString());
	};

	const getRoundStartingMessage = (round: ERound): string => {
		return StringUtils.replace(ROUND_STARTING_MESSAGE, round);
	};

	const getRoundEndingMessage = (round: ERound): string => {
		return StringUtils.replace(ROUND_ENDING_MESSAGE, round);
	};

	return { getRoundInitializingMessage, getJudgmentPredictedMessage, getRoundStartingMessage, getRoundEndingMessage };
};
