import { Box, Button, Center, HStack, Spacer, Spinner, VStack } from "@chakra-ui/react";
import { Game, Report, Score } from ".";
import { ALL_TIME_BEST_SCORE_LABEL, FINISH_BUTTON, REPLAY_BUTTON, START_BUTTON } from "../constants";
import { ECard, EJudgment, EPlayer } from "../enums";
import { useLocalStorage } from "../hooks";
import { Config, Profiles, Reports, RoundPlayerCards, RoundTableCards } from "../type";

interface IContentProps {
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
	sx?: object;
}

export const Content = (props: IContentProps): JSX.Element => {
	const { getBestScore } = useLocalStorage();

	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" spacing={0}>
				{props.reload ? (
					<Center w="full" h="full">
						<Spinner size="md" color="brand.secondary.default" />
					</Center>
				) : (
					<VStack w="full" h="full" justifyContent="center" alignItems="center" spacing={2}>
						<Box w="full" h="full">
							{props.isEnded ? (
								<Report reports={props.reports} sx={{ w: "full", h: "full", py: 4, px: 4 }} />
							) : (
								<Game
									config={props.config}
									profiles={props.profiles}
									tableCards={props.tableCards}
									playerCards={props.playerCards}
									onClickProfile={props.onClickProfile}
									onClickJudgment={props.onClickJudgment}
									onClickCard={props.onClickCard}
									winner={props.winner}
									sx={{ w: "full", h: "full" }}
								/>
							)}
						</Box>
						<HStack w="full" h={8} minH={8} maxH={8} px={16} spacing={0}>
							<Score label={ALL_TIME_BEST_SCORE_LABEL} score={getBestScore()} sx={{ w: "65%", h: "full" }} />
							<Spacer />
							<Box w="30%" h="full">
								{props.isStarted ? (
									<Button w="full" h="full" variant="primary" _hover={{ opacity: 0.7 }} onClick={props.onClickFinish}>
										{FINISH_BUTTON}
									</Button>
								) : props.isEnded ? (
									<Button w="full" h="full" variant="primary" _hover={{ opacity: 0.7 }} onClick={props.onClickReplay}>
										{REPLAY_BUTTON}
									</Button>
								) : (
									<Button
										w="full"
										h="full"
										variant="primary"
										_hover={{ opacity: 0.7 }}
										_loading={{ opacity: 0.7 }}
										isLoading={props.isLoading}
										onClick={props.onClickStart}
									>
										{START_BUTTON}
									</Button>
								)}
							</Box>
						</HStack>
					</VStack>
				)}
			</VStack>
		</Box>
	);
};
