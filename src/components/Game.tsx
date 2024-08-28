import { Box, Center, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { Body, CardType, Judgment, PlayerCard, Profile, Table } from ".";
import { TRUMP_LABEL, TURN_LABLE } from "../constants";
import { ECard, EJudgment, EPlayer } from "../enums";
import { Config, Profiles, RoundPlayerCards, RoundTableCards } from "../type";

interface IGameProps {
	config: Config;
	profiles: Profiles;
	tableCards: RoundTableCards;
	playerCards: RoundPlayerCards;
	onClickProfile: (player: EPlayer) => void;
	onClickJudgment: (judgment?: EJudgment) => void;
	onClickCard: (card: ECard) => void;
	winner?: EPlayer;
	sx?: object;
}

export const Game = (props: IGameProps): JSX.Element => {
	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" borderWidth={0} borderColor="brand.secondary.default" borderRadius="md" spacing={0}>
				<HStack w="full" h="fit-content" justifyContent="center" alignItems="center" py={3.5} px={4} spacing={3}>
					{props.profiles.map((profileValue, profileIndex) => {
						const profileKey = "profile-key-" + profileIndex;
						return (
							<Profile
								key={profileKey}
								player={profileValue.player}
								score={profileValue.score}
								achivedJudgment={profileValue.achievedJudgment}
								predictedJudgment={profileValue.predictedJudgment}
								isLoading={profileValue.isLoading}
								isVisible={profileValue.isVisible}
								isRequired={profileValue.isRequired}
								isDisabled={profileValue.isDisabled}
								onClickProfile={props.onClickProfile}
								sx={{ w: "full", h: 16, minH: 16, maxH: 16 }}
							/>
						);
					})}
				</HStack>
				<HStack w="full" h="full" px={4} spacing={0}>
					<VStack w={24} h="full" justifyContent="center" alignItems="center" spacing={0}>
						<Center w="full" h={6} minH={6} maxH={6} backgroundColor="brand.secondary.default" borderTopLeftRadius="md">
							<Text w="fit-content" h="fit-content" variant="label">
								{TURN_LABLE}
							</Text>
						</Center>
						<Divider w="full" h={0.5} />
						<Center w="full" h="full" backgroundColor="brand.secondary.default" borderBottomLeftRadius="md" py={4} px={4}>
							<CardType type={props.config.turn} sx={{ w: 9, minW: 9, maxW: 9, h: "full" }} />
						</Center>
					</VStack>
					<Divider w={0.5} h="full" />
					<VStack w="full" h="full" justifyContent="center" alignItems="center" spacing={0}>
						<Center w="full" h={6} minH={6} maxH={6} backgroundColor="brand.secondary.default">
							<Text w="fit-content" h="fit-content" variant="label">
								{props.config.header}
							</Text>
						</Center>
						<Divider w="full" h={0.5} />
						<Center w="full" h="full" backgroundColor="brand.secondary.default" overflow="hidden">
							{props.config.body !== undefined ? (
								<Body text={props.config.body} sx={{ w: "full", h: "full", py: 3, px: 10 }} />
							) : props.config.isVisible ? (
								<Judgment onClickJudgment={props.onClickJudgment} sx={{ w: "full", h: "full", py: 4, px: 8 }} />
							) : (
								<Table tableCards={props.tableCards} winner={props.winner} sx={{ w: "full", h: "full", pt: 1.5, pb: 3, px: 4 }} />
							)}
						</Center>
					</VStack>
					<Divider w={0.5} h="full" />
					<VStack w={24} h="full" justifyContent="center" alignItems="center" spacing={0}>
						<Center w="full" h={6} minH={6} maxH={6} backgroundColor="brand.secondary.default" borderTopRightRadius="md">
							<Text w="fit-content" h="fit-content" variant="label">
								{TRUMP_LABEL}
							</Text>
						</Center>
						<Divider w="full" h={0.5} />
						<Center w="full" h="full" backgroundColor="brand.secondary.default" borderBottomRightRadius="md" py={4} px={4}>
							<CardType type={props.config.trump} sx={{ w: 9, minW: 9, maxW: 9, h: "full" }} />
						</Center>
					</VStack>
				</HStack>
				<HStack w="full" h="fit-content" justifyContent="center" alignItems="center" py={3.5} px={4} spacing={3.5}>
					{props.playerCards.map((playerCardValue, playerCardIndex) => {
						const playerCardKey = "player-card-key-" + playerCardIndex;
						return (
							<PlayerCard
								key={playerCardKey}
								card={playerCardValue.card}
								isDisabled={playerCardValue.isDisabled}
								isClickable={!props.config.isDisabled}
								onClickCard={props.onClickCard}
								sx={{ w: 12, minW: 12, maxW: 12, h: 20, minH: 20, maxH: 20 }}
							/>
						);
					})}
				</HStack>
			</VStack>
		</Box>
	);
};
