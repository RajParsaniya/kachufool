import { EJudgment, EPlayer, ERound, ETable } from "../enums";

export interface IReportRoundTable {
	table: ETable;
	isWon?: boolean;
}

export interface IReportRound {
	round: ERound;
	tables: Array<IReportRoundTable>;
	achivedJudgment: EJudgment;
	predictedJudgment?: EJudgment;
	isRandom: boolean;
	score: number;
}

export interface IReport {
	player: EPlayer;
	rounds: Array<IReportRound>;
	score: number;
}
