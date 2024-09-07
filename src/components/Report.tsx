import { Box, Center, defineStyle, Divider, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { Rank, ReportDetails, Score } from ".";
import { EPlayer, ERound } from "../enums";
import { useReport } from "../hooks";
import { Reports } from "../type";

interface IReportProps {
	reports: Reports;
	sx?: object;
}

export const Report = (props: IReportProps): JSX.Element => {
	const { rank, player, isLoading, onChange, getRound, getScore } = useReport({ reports: props.reports });

	const scoreStyle: object = defineStyle({
		borderRadius: "md",
		cursor: "pointer",
		_hover: {
			opacity: 0.7,
		},
	});

	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" spacing={3}>
				<VStack w="full" h="full" spacing={1}>
					<HStack w="full" h="full" px={2} spacing={1}>
						<VStack w="full" h="full" backgroundColor="brand.secondary.default" borderTopLeftRadius="md" spacing={0}>
							<Center w="full" h={7}>
								<Text w="fit-content" h="fit-content" variant="label">
									{ERound.FIRST}
								</Text>
							</Center>
							<Divider w="full" h={0.5} backgroundColor="brand.primary.default" />
							{isLoading ? (
								<Center w="full" h="full">
									<Spinner size="sm" color="brand.primary.default" />
								</Center>
							) : (
								<ReportDetails round={getRound(ERound.FIRST)} sx={{ w: "full", h: "full" }} />
							)}
						</VStack>
						<VStack w="full" h="full" backgroundColor="brand.secondary.default" borderTopRightRadius="md" spacing={0}>
							<Center w="full" h={7}>
								<Text w="fit-content" h="fit-content" variant="label">
									{ERound.SECOND}
								</Text>
							</Center>
							<Divider w="full" h={0.5} backgroundColor="brand.primary.default" />
							{isLoading ? (
								<Center w="full" h="full">
									<Spinner size="sm" color="brand.primary.default" />
								</Center>
							) : (
								<ReportDetails round={getRound(ERound.SECOND)} sx={{ w: "full", h: "full" }} />
							)}
						</VStack>
					</HStack>
					<HStack w="full" h="full" spacing={1} px={2}>
						<VStack w="full" h="full" backgroundColor="brand.secondary.default" borderBottomLeftRadius="md" spacing={0}>
							<Center w="full" h={7}>
								<Text w="fit-content" h="fit-content" variant="label">
									{ERound.THIRD}
								</Text>
							</Center>
							<Divider w="full" h={0.5} backgroundColor="brand.primary.default" />
							{isLoading ? (
								<Center w="full" h="full">
									<Spinner size="sm" color="brand.primary.default" />
								</Center>
							) : (
								<ReportDetails round={getRound(ERound.THIRD)} sx={{ w: "full", h: "full" }} />
							)}
						</VStack>
						<VStack w="full" h="full" backgroundColor="brand.secondary.default" borderBottomRightRadius="md" spacing={0}>
							<Center w="full" h={7}>
								<Text w="fit-content" h="fit-content" variant="label">
									{ERound.FOURTH}
								</Text>
							</Center>
							<Divider w="full" h={0.5} backgroundColor="brand.primary.default" />
							{isLoading ? (
								<Center w="full" h="full">
									<Spinner size="sm" color="brand.primary.default" />
								</Center>
							) : (
								<ReportDetails round={getRound(ERound.FOURTH)} sx={{ w: "full", h: "full" }} />
							)}
						</VStack>
					</HStack>
				</VStack>
				<HStack w="full" h={20} px={3} spacing={3}>
					<Rank rank={isLoading ? undefined : rank} sx={{ w: "15%", h: "full" }} />
					<VStack w="85%" h="full" spacing={2}>
						<HStack w="full" h="50%" spacing={3}>
							<Box w="full" h="full" onClick={() => onChange(EPlayer.YOU)}>
								<Score
									label={EPlayer.YOU}
									score={getScore(EPlayer.YOU)}
									isSelected={EPlayer.YOU === player}
									sx={{ w: "full", h: "full", ...scoreStyle }}
								/>
							</Box>
							<Box w="full" h="full" onClick={() => onChange(EPlayer.BOT_1)}>
								<Score
									label={EPlayer.BOT_1}
									score={getScore(EPlayer.BOT_1)}
									isSelected={EPlayer.BOT_1 === player}
									sx={{ w: "full", h: "full", ...scoreStyle }}
								/>
							</Box>
							<Box w="full" h="full" onClick={() => onChange(EPlayer.BOT_2)}>
								<Score
									label={EPlayer.BOT_2}
									score={getScore(EPlayer.BOT_2)}
									isSelected={EPlayer.BOT_2 === player}
									sx={{ w: "full", h: "full", ...scoreStyle }}
								/>
							</Box>
						</HStack>
						<HStack w="full" h="50%" spacing={3}>
							<Box w="full" h="full" onClick={() => onChange(EPlayer.BOT_3)}>
								<Score
									label={EPlayer.BOT_3}
									score={getScore(EPlayer.BOT_3)}
									isSelected={EPlayer.BOT_3 === player}
									sx={{ w: "full", h: "full", ...scoreStyle }}
								/>
							</Box>
							<Box w="full" h="full" onClick={() => onChange(EPlayer.BOT_4)}>
								<Score
									label={EPlayer.BOT_4}
									score={getScore(EPlayer.BOT_4)}
									isSelected={EPlayer.BOT_4 === player}
									sx={{ w: "full", h: "full", ...scoreStyle }}
								/>
							</Box>
							<Box w="full" h="full" onClick={() => onChange(EPlayer.BOT_5)}>
								<Score
									label={EPlayer.BOT_5}
									score={getScore(EPlayer.BOT_5)}
									isSelected={EPlayer.BOT_5 === player}
									sx={{ w: "full", h: "full", ...scoreStyle }}
								/>
							</Box>
						</HStack>
					</VStack>
				</HStack>
			</VStack>
		</Box>
	);
};
