import { useCallback, useEffect, useMemo, useState } from "react";
import { useConfig, useCore, useDefaultValue, useLocalStorage, useMessage, useStage, useStatus, useToast, useToastValue } from ".";
import { allRounds, allTables, ECard, EJudgment, EPlayer } from "../enums";
import {
	Config,
	Profiles,
	Report,
	Reports,
	RonudPlayers,
	Round,
	RoundPlayer,
	RoundPlayerCards,
	Rounds,
	RoundTable,
	RoundTableCards,
	Stage,
	Status,
} from "../type";

interface IAppExports {
	config: Config;
	reports: Reports;
	profiles: Profiles;
	tableCards: RoundTableCards;
	playerCards: RoundPlayerCards;
	isLoading: boolean;
	isStarted: boolean;
	isEnded: boolean;
	reload: boolean;
	onClickStart: () => void;
	onClickFinish: () => void;
	onClickReplay: () => void;
	onClickProfile: (player: EPlayer) => void;
	onClickJudgment: (judgment?: EJudgment) => void;
	onClickCard: (card: ECard) => void;
	winner?: EPlayer;
}

export const useApp = (): IAppExports => {
	const { defaultProfiles, defaultReports, defaultRounds, defaultConfig, defaultStatus, defaultStage } = useDefaultValue();

	const [profiles, setProfiles] = useState<Profiles>(defaultProfiles());
	const [reports, setReports] = useState<Reports>(defaultReports());
	const [rounds, setRounds] = useState<Rounds>(defaultRounds());

	const [stage, setStage] = useState<Stage>(defaultStage());
	const [status, setStatus] = useState<Status>(defaultStatus());
	const [config, setConfig] = useState<Config>(defaultConfig());

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isEnded, setIsEnded] = useState<boolean>(false);
	const [reload, setReload] = useState<boolean>(true);

	const {
		getNotStartedToastOptions,
		getAddProfileToastOptions,
		getRemoveProfileToastOptions,
		getAddProfileLaterToastOptions,
		getRemoveProfileLaterToastOptions,
		getAddProfileLaterToastId,
		getRemoveProfileLaterToastId,
	} = useToastValue();
	const { isActiveToast, closeToast, closeAllToast, toast } = useToast();

	const {
		updateProfile,
		updateProfileAchivedJudgment,
		updateProfilePredictedJudgment,
		updateRound,
		updateRoundTableCard,
		updateRoundPlayerCard,
		updateRoundTableWinner,
		updateReport,
		updateReportRoundScore,
		updateReportPlayerScore,
		getJudgment,
		getCard,
		getWinner,
		isJudgmentPredicted,
	} = useCore();

	const { updateStage, getPreviousStage, isStageFinished } = useStage();
	const {
		setIsInitializingStatus,
		setIsPredictingStatus,
		setIsLastPredictingStatus,
		setIsStartingStatus,
		setIsPlayingStatus,
		setIsLastPlayingStatus,
		setIsEndingStatus,
		setIsClosingStatus,
	} = useStatus();
	const { setHeaderConfig, setBodyConfig, setTurnConfig, setTrumpConfig, setIsVisibleConfig, setIsDisabledConfig } = useConfig();
	const { getRoundInitializingMessage, getJudgmentPredictedMessage, getRoundStartingMessage, getRoundEndingMessage } = useMessage();
	const { setBestScore } = useLocalStorage();

	const round = useMemo((): Round => {
		return rounds[allRounds().indexOf(stage.round)];
	}, [rounds, stage]);

	const table = useMemo((): RoundTable => {
		return round.tables[allTables().indexOf(stage.table)];
	}, [round, stage]);

	const tableCards = useMemo((): RoundTableCards => {
		return table.tableCards.filter((cardValue) => cardValue.isRequired);
	}, [table]);

	const playerCards = useMemo((): RoundPlayerCards => {
		const player: RoundPlayer = round.players.find((playerValue) => playerValue.player === EPlayer.YOU) as RoundPlayer;
		return player.playerCards;
	}, [round]);

	const winner = useMemo((): EPlayer | undefined => {
		return table.winner;
	}, [table]);

	const onResetGame = useCallback((): void => {
		setProfiles(defaultProfiles());
		setReports(defaultReports());
		setRounds(defaultRounds());
		setConfig(defaultConfig());
		setStatus(defaultStatus());
		setStage(defaultStage());
	}, [defaultConfig, defaultProfiles, defaultReports, defaultRounds, defaultStage, defaultStatus]);

	const onStartGame = useCallback((): void => {
		setConfig((configValue) => setIsVisibleConfig(configValue));
		setStatus((statusValue) => setIsInitializingStatus(statusValue));
	}, [setIsInitializingStatus, setIsVisibleConfig]);

	const onFinishGame = useCallback((): void => {
		setReports((reportsValue) => {
			const updatedReports: Reports = updateReportPlayerScore(reportsValue);
			const report: Report = updatedReports.find((reportValue) => reportValue.player === EPlayer.YOU) as Report;
			setBestScore(report.score);
			return updatedReports;
		});
	}, [setBestScore, updateReportPlayerScore]);

	const onInitializingGame = useCallback((): void => {
		setConfig((configValue) => setHeaderConfig(configValue, stage.round));
		setConfig((configValue) => setBodyConfig(configValue, getRoundInitializingMessage(stage.round)));
		const { before: beforeProfiles, after: afterProfiles, rounds: updatedRounds } = updateRound(rounds, profiles, stage);
		setProfiles(beforeProfiles);
		setTimeout(() => {
			closeAllToast();
			setProfiles(afterProfiles);
			setRounds(updatedRounds);
			setConfig((configValue) => setTrumpConfig(configValue, stage));
			setStatus((statusValue) => setIsPredictingStatus(statusValue));
		}, 1000);
	}, [
		closeAllToast,
		getRoundInitializingMessage,
		profiles,
		rounds,
		setBodyConfig,
		setHeaderConfig,
		setIsPredictingStatus,
		setTrumpConfig,
		stage,
		updateRound,
	]);

	const onPredictingGame = useCallback((): void => {
		const players: RonudPlayers = round.players.filter((playerValue) => playerValue.isRequired);
		players
			.filter((playerValue) => !isJudgmentPredicted(profiles, playerValue.player))
			.every((playerValue) => {
				if (playerValue.player === EPlayer.YOU) {
					setConfig((configValue) => setBodyConfig(configValue));
					setConfig((configValue) => setIsVisibleConfig(configValue));
				} else {
					setTimeout(() => {
						setProfiles((profilesValue) => {
							const {
								judgment: predictedJudgment,
								isRandom: isRandomPredicted,
								profiles: updatedProfiles,
								isAllPredicted: isAllPredicted,
							} = updateProfilePredictedJudgment(profilesValue, playerValue.player, getJudgment(round, playerValue.player, config.trump));
							setConfig((configValue) =>
								setBodyConfig(configValue, getJudgmentPredictedMessage(playerValue.player, predictedJudgment, isRandomPredicted))
							);
							setStatus((statusValue) => setIsPredictingStatus(statusValue, !isAllPredicted));
							setStatus((statusValue) => setIsLastPredictingStatus(statusValue, isAllPredicted));
							return updatedProfiles;
						});
					}, 2000);
				}
				return false;
			});
	}, [
		config,
		getJudgment,
		getJudgmentPredictedMessage,
		isJudgmentPredicted,
		profiles,
		round,
		setBodyConfig,
		setIsLastPredictingStatus,
		setIsPredictingStatus,
		setIsVisibleConfig,
		updateProfilePredictedJudgment,
	]);

	const onLastPredictingGame = useCallback(() => {
		setTimeout(() => {
			setConfig((configValue) => setBodyConfig(configValue, getRoundStartingMessage(stage.round)));
			setStatus((statusValue) => setIsStartingStatus(statusValue));
		}, 2000);
	}, [getRoundStartingMessage, setBodyConfig, setIsStartingStatus, stage]);

	const onStartingGame = useCallback((): void => {
		setTimeout(() => {
			setConfig((configValue) => setBodyConfig(configValue));
			setStatus((statusValue) => setIsPlayingStatus(statusValue));
		}, 1000);
	}, [setBodyConfig, setIsPlayingStatus]);

	const onPlayingGame = useCallback((): void => {
		const tableCards: RoundTableCards = table.tableCards.filter((tableCardValue) => tableCardValue.isRequired);
		tableCards
			.filter((tableCardValue) => tableCardValue.card === undefined)
			.every((tableCardValue) => {
				if (tableCardValue.player === EPlayer.YOU) {
					setConfig((configValue) => setIsDisabledConfig(configValue));
					setRounds((roundsValue) => updateRoundPlayerCard(roundsValue, stage, EPlayer.YOU, config.turn));
				} else {
					setTimeout(() => {
						setRounds((roundsValue) => {
							const {
								card: playedCard,
								rounds: updatedRounds,
								isAllCompleted: isAllCompleted,
							} = updateRoundTableCard(
								roundsValue,
								stage,
								tableCardValue.player,
								getCard(round, stage, tableCardValue.player, config.trump, config.turn)
							);
							setConfig((configValue) => setTurnConfig(configValue, playedCard));
							setStatus((statusValue) => setIsPlayingStatus(statusValue, !isAllCompleted));
							setStatus((statusValue) => setIsLastPlayingStatus(statusValue, isAllCompleted));
							return updatedRounds;
						});
					}, 2000);
				}
				return false;
			});
	}, [
		config,
		getCard,
		round,
		setIsDisabledConfig,
		setIsLastPlayingStatus,
		setIsPlayingStatus,
		setTurnConfig,
		stage,
		table,
		updateRoundPlayerCard,
		updateRoundTableCard,
	]);

	const onLastPlayingGame = useCallback((): void => {
		setTimeout(() => {
			const player: EPlayer = getWinner(table, config.trump, config.turn);
			setRounds((roundsValue) => updateRoundTableWinner(roundsValue, stage, player));
			setProfiles((profilesValue) => updateProfileAchivedJudgment(profilesValue, player));
			setStatus((statusValue) => setIsEndingStatus(statusValue));
		}, 2000);
	}, [config, getWinner, setIsEndingStatus, stage, table, updateProfileAchivedJudgment, updateRoundTableWinner]);

	const onEndingGame = useCallback((): void => {
		setTimeout(() => {
			setReports((reportsValue) => updateReport(reportsValue, rounds, profiles, stage));
			setStage((stageValue) => {
				const { stage: updatedStage, isEnded: isRoundEnded } = updateStage(stageValue);
				setConfig((configValue) => setTurnConfig(configValue));
				setStatus((statusValue) => setIsPlayingStatus(statusValue, !isRoundEnded));
				setStatus((statusValue) => setIsClosingStatus(statusValue, isRoundEnded));
				return updatedStage;
			});
		}, 2500);
	}, [profiles, rounds, setIsClosingStatus, setIsPlayingStatus, setTurnConfig, stage, updateReport, updateStage]);

	const onClosingGame = useCallback(() => {
		const previousStage: Stage = getPreviousStage(stage);
		setConfig((configValue) => setBodyConfig(configValue, getRoundEndingMessage(previousStage.round)));
		setReports((reportsValue) => updateReportRoundScore(reportsValue, previousStage));
		setTimeout(() => {
			if (!isStageFinished(previousStage)) {
				setStatus((statusValue) => setIsInitializingStatus(statusValue));
			} else {
				setReports((reportsValue) => {
					const updatedReports: Reports = updateReportPlayerScore(reportsValue);
					const report: Report = updatedReports.find((reportValue) => reportValue.player === EPlayer.YOU) as Report;
					setBestScore(report.score);
					return updatedReports;
				});
				setIsStarted(false);
				setIsEnded(true);
				setReload(true);
			}
		}, 1000);
	}, [
		getPreviousStage,
		getRoundEndingMessage,
		isStageFinished,
		setBestScore,
		setBodyConfig,
		setIsInitializingStatus,
		stage,
		updateReportPlayerScore,
		updateReportRoundScore,
	]);

	const onUpdateProfile = useCallback(
		(player: EPlayer): void => {
			const {
				before: beforeProfiles,
				after: afterProfiles,
				isExist: isProfileExist,
				isAlreadyExist: isProfileAlreadyExist,
			} = updateProfile(profiles, rounds, stage, player, isStarted);
			setProfiles(beforeProfiles);
			setTimeout(() => {
				setProfiles(afterProfiles);
				isStarted &&
					(isProfileExist
						? isActiveToast(getAddProfileLaterToastId(player))
							? closeToast(getAddProfileLaterToastId(player))
							: isProfileAlreadyExist && toast(getRemoveProfileLaterToastOptions(player))
						: isActiveToast(getRemoveProfileLaterToastId(player))
						? closeToast(getRemoveProfileLaterToastId(player))
						: !isProfileAlreadyExist && toast(getAddProfileLaterToastOptions(player)));
				isProfileExist ? toast(getRemoveProfileToastOptions(player)) : toast(getAddProfileToastOptions(player));
			}, 300);
		},
		[
			closeToast,
			getAddProfileLaterToastId,
			getAddProfileLaterToastOptions,
			getAddProfileToastOptions,
			getRemoveProfileLaterToastId,
			getRemoveProfileLaterToastOptions,
			getRemoveProfileToastOptions,
			isActiveToast,
			isStarted,
			profiles,
			rounds,
			stage,
			toast,
			updateProfile,
		]
	);

	const onUpdateJudgment = useCallback(
		(judgment?: EJudgment): void => {
			if (isStarted) {
				setConfig((configValue) => setIsVisibleConfig(configValue));
				setProfiles((profilesValue) => {
					const {
						judgment: predictedJudgment,
						isRandom: isRandomPredicted,
						profiles: updatedProfiles,
						isAllPredicted: isAllPredicted,
					} = updateProfilePredictedJudgment(profilesValue, EPlayer.YOU, judgment);
					setConfig((configValue) => setBodyConfig(configValue, getJudgmentPredictedMessage(EPlayer.YOU, predictedJudgment, isRandomPredicted)));
					setStatus((statusValue) => setIsPredictingStatus(statusValue, !isAllPredicted));
					setStatus((statusValue) => setIsLastPredictingStatus(statusValue, isAllPredicted));
					return updatedProfiles;
				});
			} else {
				toast(getNotStartedToastOptions);
			}
		},
		[
			getJudgmentPredictedMessage,
			getNotStartedToastOptions,
			isStarted,
			setBodyConfig,
			setIsLastPredictingStatus,
			setIsPredictingStatus,
			setIsVisibleConfig,
			toast,
			updateProfilePredictedJudgment,
		]
	);

	const onUpdateCard = useCallback(
		(card: ECard): void => {
			setConfig((configValue) => setIsDisabledConfig(configValue));
			setRounds((roundsValue) => {
				const { card: playedcard, rounds: updatedRounds, isAllCompleted: isAllCompleted } = updateRoundTableCard(roundsValue, stage, EPlayer.YOU, card);
				setConfig((configValue) => setTurnConfig(configValue, playedcard));
				setStatus((statusValue) => setIsPlayingStatus(statusValue, !isAllCompleted));
				setStatus((statusValue) => setIsLastPlayingStatus(statusValue, isAllCompleted));
				return updatedRounds;
			});
		},
		[setIsDisabledConfig, setIsLastPlayingStatus, setIsPlayingStatus, setTurnConfig, stage, updateRoundTableCard]
	);

	const onClickStart = (): void => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setIsStarted(true);
			onStartGame();
		}, 300);
	};

	const onClickFinish = (): void => {
		onFinishGame();
		setIsStarted(false);
		setIsEnded(true);
		setReload(true);
	};

	const onClickReplay = (): void => {
		setIsStarted(false);
		setIsEnded(false);
		setReload(true);
		onResetGame();
		closeAllToast();
	};

	const onClickProfile = (player: EPlayer): void => onUpdateProfile(player);
	const onClickJudgment = (judgment?: EJudgment): void => onUpdateJudgment(judgment);
	const onClickCard = (card: ECard): void => onUpdateCard(card);

	useEffect(() => {
		if (reload) {
			setTimeout(() => {
				setReload(false);
			}, 500);
		}
	}, [reload]);

	useEffect(() => {
		if (isStarted && status.isInitializing) {
			setStatus((statusValue) => setIsInitializingStatus(statusValue));
			onInitializingGame();
		}
	}, [isStarted, onInitializingGame, setIsInitializingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isPredicting) {
			setStatus((statusValue) => setIsPredictingStatus(statusValue));
			onPredictingGame();
		}
	}, [isStarted, onPredictingGame, setIsPredictingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isLastPredicting) {
			setStatus((statusValue) => setIsLastPredictingStatus(statusValue));
			onLastPredictingGame();
		}
	}, [isStarted, onLastPredictingGame, setIsLastPredictingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isStarting) {
			setStatus((statusValue) => setIsStartingStatus(statusValue));
			onStartingGame();
		}
	}, [isStarted, onStartingGame, setIsStartingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isPlaying) {
			setStatus((statusValue) => setIsPlayingStatus(statusValue));
			onPlayingGame();
		}
	}, [isStarted, onPlayingGame, setIsPlayingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isLastPlaying) {
			setStatus((statusValue) => setIsLastPlayingStatus(statusValue));
			onLastPlayingGame();
		}
	}, [isStarted, onLastPlayingGame, setIsLastPlayingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isEnding) {
			setStatus((statusValue) => setIsEndingStatus(statusValue));
			onEndingGame();
		}
	}, [isStarted, onEndingGame, setIsEndingStatus, status]);

	useEffect(() => {
		if (isStarted && status.isClosing) {
			setStatus((statusValue) => setIsClosingStatus(statusValue));
			onClosingGame();
		}
	}, [isStarted, onClosingGame, setIsClosingStatus, status]);

	return {
		config,
		reports,
		profiles,
		tableCards,
		playerCards,
		isLoading,
		isStarted,
		isEnded,
		reload,
		onClickStart,
		onClickFinish,
		onClickReplay,
		onClickProfile,
		onClickJudgment,
		onClickCard,
		winner,
	};
};
