import { ECardType } from "../enums";

export interface IConfig {
	header: string;
	body?: string;
	turn?: ECardType;
	trump?: ECardType;
	isVisible: boolean;
	isDisabled: boolean;
}
