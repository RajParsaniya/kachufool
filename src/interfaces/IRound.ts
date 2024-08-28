import { ECard, EPlayer, ERound, ETable } from "../enums";

export interface IRoundTableCard {
	card?: ECard;
	player: EPlayer;
	isRequired: boolean;
}

export interface IRoundPlayerCard {
	card?: ECard;
	isDisabled: boolean;
}

export interface IRoundTable {
	table: ETable;
	tableCards: Array<IRoundTableCard>;
	winner?: EPlayer;
}

export interface IRoundPlayer {
	player: EPlayer;
	isRequired: boolean;
	playerCards: Array<IRoundPlayerCard>;
}

export interface IRound {
	round: ERound;
	tables: Array<IRoundTable>;
	players: Array<IRoundPlayer>;
}
