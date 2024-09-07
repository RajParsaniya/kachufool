import {
	IConfig,
	ILocalStorage,
	IProfile,
	IReport,
	IReportRound,
	IReportRoundTable,
	IRound,
	IRoundPlayer,
	IRoundPlayerCard,
	IRoundTable,
	IRoundTableCard,
	IStage,
	IStatus,
} from "../interfaces";

export type Stage = IStage;
export type Status = IStatus;
export type Config = IConfig;
export type Profile = IProfile;
export type Round = IRound;
export type RoundTable = IRoundTable;
export type RoundPlayer = IRoundPlayer;
export type RoundTableCard = IRoundTableCard;
export type RoundPlayerCard = IRoundPlayerCard;
export type Report = IReport;
export type ReportRound = IReportRound;
export type ReportRoundTable = IReportRoundTable;
export type LocalStorage = ILocalStorage;

export type Profiles = Array<Profile>;
export type Rounds = Array<Round>;
export type RoundTables = Array<RoundTable>;
export type RonudPlayers = Array<RoundPlayer>;
export type RoundTableCards = Array<RoundTableCard>;
export type RoundPlayerCards = Array<RoundPlayerCard>;
export type Reports = Array<Report>;
export type ReportRounds = Array<ReportRound>;
export type ReportRoundTables = Array<ReportRoundTable>;
