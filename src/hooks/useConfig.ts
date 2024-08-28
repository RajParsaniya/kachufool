import { useValue } from ".";
import { ECard } from "../enums";
import { Config, Stage } from "../type";

interface IConfigExports {
	setHeaderConfig: (config: Config, header: string) => Config;
	setBodyConfig: (config: Config, body?: string) => Config;
	setTurnConfig: (config: Config, card?: ECard) => Config;
	setTrumpConfig: (config: Config, stage?: Stage) => Config;
	setIsVisibleConfig: (config: Config, isVisible?: boolean) => Config;
	setIsDisabledConfig: (config: Config, isDisabled?: boolean) => Config;
}

export const useConfig = (): IConfigExports => {
	const { getCardTypeByCard, getCardTypeByRound } = useValue();

	const setHeaderConfig = (config: Config, header: string): Config => {
		return {
			header: header,
			body: config.body,
			turn: config.turn,
			trump: config.trump,
			isVisible: config.isVisible,
			isDisabled: config.isDisabled,
		};
	};

	const setBodyConfig = (config: Config, body?: string): Config => {
		return {
			header: config.header,
			body: body !== undefined ? body : undefined,
			turn: config.turn,
			trump: config.trump,
			isVisible: config.isVisible,
			isDisabled: config.isDisabled,
		};
	};

	const setTurnConfig = (config: Config, card?: ECard): Config => {
		return {
			header: config.header,
			body: config.body,
			turn: card !== undefined ? (config.turn !== undefined ? config.turn : getCardTypeByCard(card)) : undefined,
			trump: config.trump,
			isVisible: config.isVisible,
			isDisabled: config.isDisabled,
		};
	};

	const setTrumpConfig = (config: Config, stage?: Stage): Config => {
		return {
			header: config.header,
			body: config.body,
			turn: config.turn,
			trump: stage !== undefined ? getCardTypeByRound(stage.round) : undefined,
			isVisible: config.isVisible,
			isDisabled: config.isDisabled,
		};
	};

	const setIsVisibleConfig = (config: Config, isVisible?: boolean): Config => {
		return {
			header: config.header,
			body: config.body,
			turn: config.turn,
			trump: config.trump,
			isVisible: isVisible !== undefined ? isVisible : !config.isVisible,
			isDisabled: config.isDisabled,
		};
	};

	const setIsDisabledConfig = (config: Config, isDisabled?: boolean): Config => {
		return {
			header: config.header,
			body: config.body,
			turn: config.turn,
			trump: config.trump,
			isVisible: config.isVisible,
			isDisabled: isDisabled !== undefined ? isDisabled : !config.isDisabled,
		};
	};

	return { setHeaderConfig, setBodyConfig, setTurnConfig, setTrumpConfig, setIsVisibleConfig, setIsDisabledConfig };
};
