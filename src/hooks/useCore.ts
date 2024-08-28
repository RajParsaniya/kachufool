import { useCard, useValue } from ".";
import { allCards, allJudgments, allRounds, allTables, ECard, ECardType, EJudgment, EPlayer } from "../enums";
import { Profile, Profiles, Report, Reports, Round, RoundPlayer, RoundPlayerCards, Rounds, RoundTable, RoundTableCard, Stage } from "../type";
import { ArrayUtils, ObjectUtils } from "../utils";

interface IUpdateProfileExports {
	before: Profiles;
	after: Profiles;
	isExist: boolean;
	isAlreadyExist: boolean;
}

interface IUpdateRoundExports {
	before: Profiles;
	after: Profiles;
	rounds: Rounds;
}

interface IUpdateProfilePredictedJudgmentExports {
	judgment: EJudgment;
	isRandom: boolean;
	profiles: Profiles;
	isAllPredicted: boolean;
}

interface IUpdateRoundTableCardExports {
	card: ECard;
	rounds: Rounds;
	isAllCompleted: boolean;
}

interface ICoreExports {
	updateProfile: (profiles: Profiles, rounds: Rounds, stage: Stage, player: EPlayer, isStarted: boolean) => IUpdateProfileExports;
	updateProfileAchivedJudgment: (profiles: Profiles, player: EPlayer, judgment?: EJudgment) => Profiles;
	updateProfilePredictedJudgment: (profiles: Profiles, player: EPlayer, judgment?: EJudgment) => IUpdateProfilePredictedJudgmentExports;
	updateRound: (rounds: Rounds, profiles: Profiles, stage: Stage) => IUpdateRoundExports;
	updateRoundTableCard: (rounds: Rounds, stage: Stage, player: EPlayer, card: ECard) => IUpdateRoundTableCardExports;
	updateRoundPlayerCard: (rounds: Rounds, stage: Stage, player: EPlayer, turn?: ECardType) => Rounds;
	updateRoundTableWinner: (rounds: Rounds, stage: Stage, player: EPlayer) => Rounds;
	updateReport: (reports: Reports, rounds: Rounds, profiles: Profiles, stage: Stage) => Reports;
	updateReportRoundScore: (reports: Reports, stage: Stage) => Reports;
	updateReportPlayerScore: (reports: Reports) => Reports;
	getJudgment: (round: Round, player: EPlayer, cardType?: ECardType) => EJudgment;
	getCard: (round: Round, stage: Stage, player: EPlayer, trump?: ECardType, turn?: ECardType) => ECard;
	getWinner: (table: RoundTable, trump?: ECardType, turn?: ECardType) => EPlayer;
	getRank: (reports: Reports, player: EPlayer) => number;
	isJudgmentPredicted: (profiles: Profiles, player: EPlayer) => boolean;
}

export const useCore = (): ICoreExports => {
	const { getLargestCard, getShortestCard, getSortedCards } = useCard();
	const { getCardTypeByCard, getScore } = useValue();

	const updateProfile = (profiles: Profiles, rounds: Rounds, stage: Stage, player: EPlayer, isStarted: boolean): IUpdateProfileExports => {
		const isExist: boolean = isProfileExist(profiles, player);
		const isAlreadyExist: boolean = isProfileAlreadyExist(rounds, stage, player);
		const before: Profiles = profiles.map((profileValue) => {
			const updatedProfile: Profile = ObjectUtils.clone(profileValue);
			if (profileValue.player === player) {
				updatedProfile.isLoading = true;
			}
			return updatedProfile;
		});
		const after: Profiles = profiles.map((profileValue) => {
			const updatedProfile: Profile = ObjectUtils.clone(profileValue);
			if (profileValue.player === player) {
				updatedProfile.isLoading = false;
				updatedProfile.isDisabled = isAlreadyExist ? false : isStarted;
				updatedProfile.isVisible = !profileValue.isVisible;
			}
			return updatedProfile;
		});
		return { before: before, after: after, isExist: isExist, isAlreadyExist: isAlreadyExist };
	};

	const updateProfileAchivedJudgment = (profiles: Profiles, player: EPlayer, judgment?: EJudgment): Profiles => {
		return profiles.map((profileValue) => {
			const updatedProfile: Profile = ObjectUtils.clone(profileValue);
			if (profileValue.player === player) {
				updatedProfile.achievedJudgment = judgment !== undefined ? judgment : profileValue.achievedJudgment + 1;
			}
			return updatedProfile;
		});
	};

	const updateProfilePredictedJudgment = (profiles: Profiles, player: EPlayer, judgment?: EJudgment): IUpdateProfilePredictedJudgmentExports => {
		const randomJudgment: number = ArrayUtils.random(allJudgments());
		const udpatedProfiles: Profiles = profiles.map((profileValue) => {
			const updatedProfile: Profile = ObjectUtils.clone(profileValue);
			if (profileValue.player === player) {
				updatedProfile.predictedJudgment = judgment !== undefined ? judgment : randomJudgment;
				updatedProfile.isRandom = judgment === undefined;
			}
			return updatedProfile;
		});
		const isFinished: boolean = isAllJudgmentPredicted(udpatedProfiles);
		return {
			judgment: judgment !== undefined ? judgment : randomJudgment,
			isRandom: judgment !== undefined,
			profiles: udpatedProfiles,
			isAllPredicted: isFinished,
		};
	};

	const updateRound = (rounds: Rounds, profiles: Profiles, stage: Stage): IUpdateRoundExports => {
		const before: Profiles = profiles.map((profileValue) => {
			const updatedProfile: Profile = ObjectUtils.clone(profileValue);
			updatedProfile.isLoading = true;
			return updatedProfile;
		});
		const after: Profiles = profiles.map((profileValue) => {
			const updatedProfile: Profile = ObjectUtils.clone(profileValue);
			updatedProfile.isLoading = false;
			updatedProfile.isDisabled = false;
			updatedProfile.achievedJudgment = EJudgment.ZERO;
			updatedProfile.predictedJudgment = undefined;
			return updatedProfile;
		});
		const cards: Array<Array<ECard>> = ArrayUtils.batches(ArrayUtils.shuffle(allCards()), allTables().length);
		const updatedRounds: Rounds = rounds.map((roundValue) => {
			const updatedRound: Round = ObjectUtils.clone(roundValue);
			if (roundValue.round === stage.round) {
				updatedRound.players.map((playerValue) => {
					if (isPlayerExist(profiles, playerValue.player)) {
						playerValue.isRequired = true;
					}
				});
				updatedRound.tables.map((tableValue) => {
					tableValue.tableCards.map((cardValue) => {
						if (isPlayerExist(profiles, cardValue.player)) {
							cardValue.isRequired = true;
						}
					});
				});
				updatedRound.players.map((playerValue, playerIndex) => {
					const sortedCards: Array<ECard> = getSortedCards(cards[playerIndex]);
					playerValue.playerCards.map((playerCard, playerCardIndex) => {
						playerCard.card = sortedCards[playerCardIndex];
					});
				});
				updatedRound.tables.map((tableValue, tableIndex) => {
					tableValue.tableCards = ArrayUtils.sequence(tableIndex, tableValue.tableCards, (cardValue) => cardValue.isRequired);
				});
			}
			return updatedRound;
		});
		return { before: before, after: after, rounds: updatedRounds };
	};

	const updateRoundTableCard = (rounds: Rounds, stage: Stage, player: EPlayer, card: ECard): IUpdateRoundTableCardExports => {
		const updatedRounds: Rounds = rounds.map((roundValue) => {
			const updatedRound: Round = ObjectUtils.clone(roundValue);
			if (roundValue.round === stage.round) {
				updatedRound.players.map((playerValue) => {
					if (playerValue.player === player) {
						playerValue.playerCards.map((cardValue) => {
							if (cardValue.card !== undefined && cardValue.card === card) {
								cardValue.card = undefined;
							}
						});
					}
				});
				updatedRound.tables.map((tableValue) => {
					if (tableValue.table === stage.table) {
						tableValue.tableCards.map((cardValue) => {
							if (cardValue.player === player) {
								cardValue.card = card;
							}
						});
					}
				});
			}
			return updatedRound;
		});
		const isFinished: boolean = isAllTurnCompleted(updatedRounds, stage);
		return { card: card, rounds: updatedRounds, isAllCompleted: isFinished };
	};

	const updateRoundPlayerCard = (rounds: Rounds, stage: Stage, player: EPlayer, turn?: ECardType): Rounds => {
		return rounds.map((roundValue) => {
			const updatedRound: Round = ObjectUtils.clone(roundValue);
			if (roundValue.round === stage.round) {
				updatedRound.players.map((playerValue) => {
					if (playerValue.player === player) {
						if (isCardTypePresent(playerValue.playerCards, turn)) {
							playerValue.playerCards.map((cardValue) => {
								if (cardValue.card !== undefined) {
									cardValue.isDisabled = turn !== getCardTypeByCard(cardValue.card);
								}
							});
						} else {
							playerValue.playerCards.map((cardValue) => {
								cardValue.isDisabled = false;
							});
						}
					}
				});
			}
			return updatedRound;
		});
	};

	const updateRoundTableWinner = (rounds: Rounds, stage: Stage, player: EPlayer): Rounds => {
		return rounds.map((roundValue) => {
			const updatedRound: Round = ObjectUtils.clone(roundValue);
			if (roundValue.round === stage.round) {
				updatedRound.tables.map((tableValue) => {
					if (tableValue.table === stage.table) {
						tableValue.winner = player;
					}
				});
			}
			return updatedRound;
		});
	};

	const updateReport = (reports: Reports, rounds: Rounds, profiles: Profiles, stage: Stage): Reports => {
		return reports.map((reportValue) => {
			const updatedReport: Report = ObjectUtils.clone(reportValue);
			const profile: Profile = profiles.find((profileValue) => profileValue.player === reportValue.player) as Profile;
			if (profile.isVisible && !profile.isDisabled) {
				updatedReport.rounds.map((roundValue) => {
					if (roundValue.round === stage.round) {
						roundValue.achivedJudgment = profile.achievedJudgment;
						roundValue.predictedJudgment = profile.predictedJudgment;
						roundValue.isRandom = profile.isRandom;
						roundValue.tables.map((tableValue) => {
							if (tableValue.table === stage.table) {
								const table: RoundTable = rounds[allRounds().indexOf(stage.round)].tables[allTables().indexOf(stage.table)];
								tableValue.isWon = table.winner !== undefined && table.winner === reportValue.player;
							}
						});
					}
				});
			}
			return updatedReport;
		});
	};

	const updateReportRoundScore = (reports: Reports, stage: Stage): Reports => {
		return reports.map((reportValue) => {
			const updatedReport: Report = ObjectUtils.clone(reportValue);
			updatedReport.rounds.map((roundValue) => {
				if (roundValue.round === stage.round) {
					roundValue.score = getScore(roundValue.isRandom, roundValue.achivedJudgment, roundValue.predictedJudgment);
				}
			});
			return updatedReport;
		});
	};

	const updateReportPlayerScore = (reports: Reports): Reports => {
		return reports.map((reportValue) => {
			const updatedReport: Report = ObjectUtils.clone(reportValue);
			updatedReport.score = reportValue.rounds.reduce((accumulator, roundValue) => {
				return accumulator + roundValue.score;
			}, 0);
			return updatedReport;
		});
	};

	const getJudgment = (round: Round, player: EPlayer, cardType?: ECardType): EJudgment => {
		const roundPlayer: RoundPlayer = round.players.find((playerValue) => playerValue.player === player) as RoundPlayer;
		return cardType !== undefined
			? roundPlayer.playerCards
					.map((cardValue) => cardValue.card)
					.filter((cardValue) => cardValue !== undefined)
					.map((cardValue) => getCardTypeByCard(cardValue))
					.filter((cardTypeValue) => cardTypeValue === cardType).length
			: ArrayUtils.random(allJudgments());
	};

	const getCard = (round: Round, stage: Stage, player: EPlayer, trump?: ECardType, turn?: ECardType): ECard => {
		const filteredTable: RoundTable = round.tables.find((tableValue) => tableValue.table === stage.table) as RoundTable;
		const tableCards: Array<ECard> = filteredTable.tableCards.map((cardValue) => cardValue.card).filter((cardValue) => cardValue !== undefined);
		const filteredPlayer: RoundPlayer = round.players.find((playerValue) => playerValue.player === player) as RoundPlayer;
		const playerCards: Array<ECard> = filteredPlayer.playerCards.map((cardValue) => cardValue.card).filter((cardValue) => cardValue !== undefined);
		if (turn !== undefined && playerCards.some((cardValue) => turn === getCardTypeByCard(cardValue))) {
			return getLargestCard(playerCards.filter((cardValue) => turn === getCardTypeByCard(cardValue)));
		} else {
			if (trump !== undefined && playerCards.some((cardValue) => trump === getCardTypeByCard(cardValue))) {
				if (tableCards.some((cardValue) => trump === getCardTypeByCard(cardValue))) {
					const tableLargestTrumpCard: ECard = getLargestCard(tableCards.filter((cardValue) => trump === getCardTypeByCard(cardValue)));
					const playerLargestTrumpCard: ECard = getLargestCard(playerCards.filter((cardValue) => trump === getCardTypeByCard(cardValue)));
					const largestTrumpCard: ECard = getLargestCard([tableLargestTrumpCard, playerLargestTrumpCard]);
					if (largestTrumpCard === tableLargestTrumpCard) {
						return getShortestCard(playerCards.filter((cardValue) => trump !== getCardTypeByCard(cardValue)));
					} else {
						return getLargestCard(playerCards.filter((cardValue) => trump === getCardTypeByCard(cardValue)));
					}
				} else {
					return getLargestCard(playerCards.filter((cardValue) => trump === getCardTypeByCard(cardValue)));
				}
			} else {
				return getShortestCard(playerCards);
			}
		}
	};

	const getWinner = (table: RoundTable, trump?: ECardType, turn?: ECardType): EPlayer => {
		const cards: Array<ECard> = table.tableCards.map((cardValue) => cardValue.card).filter((cardValue) => cardValue !== undefined);
		const largestCard: ECard = cards.some((cardValue) => trump === getCardTypeByCard(cardValue))
			? getLargestCard(cards.filter((cardValue) => trump === getCardTypeByCard(cardValue)))
			: getLargestCard(cards.filter((cardValue) => turn === getCardTypeByCard(cardValue)));
		const tableCard: RoundTableCard = table.tableCards.find((cardValue) => cardValue.card === largestCard) as RoundTableCard;
		return tableCard.player;
	};

	const getRank = (reports: Reports, player: EPlayer): number => {
		const reportIndex: number = reports.map((reportValue) => reportValue.player).indexOf(player);
		return ArrayUtils.order(reports.map((reportValue) => reportValue.score))[reportIndex];
	};

	const isJudgmentPredicted = (profiles: Profiles, player: EPlayer): boolean => {
		const profile: Profile = profiles.find((profileValue) => profileValue.player === player) as Profile;
		return profile.predictedJudgment !== undefined;
	};

	const isAllJudgmentPredicted = (profiles: Profiles) => {
		return profiles
			.filter((profileValue) => profileValue.isVisible && !profileValue.isDisabled)
			.every((profileValue) => profileValue.predictedJudgment !== undefined);
	};

	const isAllTurnCompleted = (rounds: Rounds, stage: Stage): boolean => {
		const round: Round = rounds[allRounds().indexOf(stage.round)];
		const table: RoundTable = round.tables[allTables().indexOf(stage.table)];
		return table.tableCards.filter((cardValue) => cardValue.isRequired).every((cardValue) => cardValue.card !== undefined);
	};

	const isPlayerExist = (profiles: Profiles, player: EPlayer): boolean => {
		return profiles
			.filter((profileValue) => profileValue.isVisible)
			.map((profileValue) => profileValue.player)
			.includes(player);
	};

	const isProfileExist = (profiles: Profiles, player: EPlayer): boolean => {
		const profile: Profile = profiles.find((profileValue) => profileValue.player === player) as Profile;
		return profile.isVisible;
	};

	const isProfileAlreadyExist = (rounds: Rounds, stage: Stage, player: EPlayer): boolean => {
		const round: Round = rounds.find((roundValue) => roundValue.round === stage.round) as Round;
		return round.players
			.filter((playerValue) => playerValue.isRequired)
			.map((playerValue) => playerValue.player)
			.includes(player);
	};

	const isCardTypePresent = (playerCards: RoundPlayerCards, cardType?: ECardType): boolean => {
		return cardType !== undefined
			? playerCards
					.map((cardValue) => cardValue.card)
					.filter((cardValue) => cardValue !== undefined)
					.map((cardValue) => getCardTypeByCard(cardValue))
					.includes(cardType)
			: false;
	};

	return {
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
		getRank,
		isJudgmentPredicted,
	};
};
