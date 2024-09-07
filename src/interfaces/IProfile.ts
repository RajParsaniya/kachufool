import { EJudgment, EPlayer } from "../enums";

export interface IProfileJudgment {
	achievedJudgment: EJudgment;
	predictedJudgment?: EJudgment;
	isRandom: boolean;
}

export interface IProfilePlayer {
	player: EPlayer;
	isRequired: boolean;
	score: number;
}

export interface IProfile extends IProfilePlayer, IProfileJudgment {
	isLoading: boolean;
	isVisible: boolean;
	isDisabled: boolean;
}
