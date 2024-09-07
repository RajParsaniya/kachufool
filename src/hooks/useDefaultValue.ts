import { LETS_PLAY } from "../constants";
import { allPlayers, allRounds, allTables, EJudgment, EPlayer, ERound, ETable } from "../enums";
import { IRoundPlayerCard } from "../interfaces";
import { players } from "../static";
import {
	Config,
	Profile,
	Profiles,
	Report,
	ReportRound,
	ReportRounds,
	ReportRoundTable,
	ReportRoundTables,
	Reports,
	RonudPlayers,
	Round,
	RoundPlayer,
	RoundPlayerCards,
	Rounds,
	RoundTable,
	RoundTableCard,
	RoundTableCards,
	RoundTables,
	Stage,
	Status,
} from "../type";

interface IDefaultValueExports {
	defaultProfiles: () => Profiles;
	defaultReports: () => Reports;
	defaultRounds: () => Rounds;
	defaultConfig: () => Config;
	defaultStatus: () => Status;
	defaultStage: () => Stage;
}

export const useDefaultValue = (): IDefaultValueExports => {
	const defaultProfile = (player: EPlayer): Profile => {
		return {
			player: player,
			score: 0,
			achievedJudgment: EJudgment.ZERO,
			predictedJudgment: undefined,
			isRandom: false,
			isLoading: false,
			isVisible: true,
			isRequired: true,
			isDisabled: false,
		};
	};

	const defaultProfiles = (): Profiles => {
		const profiles: Profiles = allPlayers().map((playerValue) => defaultProfile(playerValue));
		profiles.forEach((profileValue) => {
			if (!players.includes(profileValue.player)) {
				profileValue.isVisible = false;
				profileValue.isRequired = false;
			}
		});
		return profiles;
	};

	const defaultReportTable = (table: ETable): ReportRoundTable => {
		return { table: table, isWon: undefined };
	};

	const defaultReportTables = (): ReportRoundTables => {
		return allTables().map((tableValue) => defaultReportTable(tableValue));
	};

	const defaultReportRound = (round: ERound): ReportRound => {
		return {
			round: round,
			tables: defaultReportTables(),
			achivedJudgment: EJudgment.ZERO,
			predictedJudgment: undefined,
			isRandom: false,
			score: 0,
		};
	};

	const defaultReportRounds = (): ReportRounds => {
		return allRounds().map((roundValue) => defaultReportRound(roundValue));
	};

	const defaultReport = (player: EPlayer): Report => {
		return { player: player, rounds: defaultReportRounds(), score: 0 };
	};

	const defaultReports = (): Reports => {
		return allPlayers().map((playerValue) => defaultReport(playerValue));
	};

	const defaultTableCard = (player: EPlayer, isRequired: boolean): RoundTableCard => {
		return { card: undefined, player: player, isRequired: isRequired };
	};

	const defaultTableCards = (): RoundTableCards => {
		return allPlayers().map((playerValue) => defaultTableCard(playerValue, players.includes(playerValue)));
	};

	const defaultPlayerCard = (): IRoundPlayerCard => {
		return { card: undefined, isDisabled: false };
	};

	const defaultPlayerCards = (): RoundPlayerCards => {
		return allTables().map(() => defaultPlayerCard());
	};

	const defaultTable = (table: ETable): RoundTable => {
		return { table: table, tableCards: defaultTableCards(), winner: undefined };
	};

	const defaultTables = (): RoundTables => {
		return allTables().map((tableValue) => defaultTable(tableValue));
	};

	const defaultPlayer = (player: EPlayer, isRequired: boolean): RoundPlayer => {
		return { player: player, isRequired: isRequired, playerCards: defaultPlayerCards() };
	};

	const defaultPlayers = (): RonudPlayers => {
		return allPlayers().map((playerValue) => defaultPlayer(playerValue, players.includes(playerValue)));
	};

	const defaultRound = (round: ERound): Round => {
		return { round: round, tables: defaultTables(), players: defaultPlayers() };
	};

	const defaultRounds = (): Rounds => {
		return allRounds().map((roundValue) => defaultRound(roundValue));
	};

	const defaultConfig = (): Config => {
		return { header: LETS_PLAY, body: undefined, turn: undefined, trump: undefined, isVisible: true, isDisabled: true };
	};

	const defaultStatus = (): Status => {
		return {
			isInitializing: false,
			isPredicting: false,
			isLastPredicting: false,
			isStarting: false,
			isPlaying: false,
			isLastPlaying: false,
			isEnding: false,
			isClosing: false,
		};
	};

	const defaultStage = (): Stage => {
		return { round: ERound.FIRST, table: ETable.FIRST };
	};

	return {
		defaultProfiles,
		defaultReports,
		defaultRounds,
		defaultConfig,
		defaultStatus,
		defaultStage,
	};
};
