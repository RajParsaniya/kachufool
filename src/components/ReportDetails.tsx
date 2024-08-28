import { CheckIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Center, defineStyle, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { JUDGMENT_TEXT, UNKNOWN_SIGN } from "../constants";
import { ReportRound } from "../type";
import { StringUtils } from "../utils";

interface IReportDetailsProps {
	round: ReportRound;
	sx?: object;
}

export const ReportDetails = (props: IReportDetailsProps): JSX.Element => {
	const centerTagStyle = (isDone?: boolean): object => {
		return defineStyle({
			backgroundColor: isDone === undefined ? "brand.primary.default" : isDone ? "brand.success.default" : "brand.failed.default",
		});
	};

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" spacing={0}>
				<VStack w="80%" h="full" spacing={0} py={2} px={4}>
					<HStack w="full" h="full" spacing={4}>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[0].isWon)}>
							{props.round.tables[0].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[0].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[1].isWon)}>
							{props.round.tables[1].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[1].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[2].isWon)}>
							{props.round.tables[2].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[2].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[3].isWon)}>
							{props.round.tables[3].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[3].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
					</HStack>
					<HStack w="full" h="full" spacing={4}>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[4].isWon)}>
							{props.round.tables[4].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[4].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[5].isWon)}>
							{props.round.tables[5].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[5].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[6].isWon)}>
							{props.round.tables[6].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[6].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
						<Center w="full" h="full" maxH={5} borderRadius="md" {...centerTagStyle(props.round.tables[7].isWon)}>
							{props.round.tables[7].isWon === undefined ? (
								<MinusIcon w="50%" h="50%" color="brand.secondary.default" />
							) : props.round.tables[7].isWon ? (
								<CheckIcon w="50%" h="50%" color="brand.secondary.default" />
							) : (
								<CloseIcon w="40%" h="40%" color="brand.secondary.default" />
							)}
						</Center>
					</HStack>
				</VStack>
				<Divider w={0.5} h="full" backgroundColor="brand.primary.default" />
				<VStack w="20%" h="full" spacing={0}>
					<Text w="full" h="50%" variant="report">
						{props.round.predictedJudgment !== undefined
							? StringUtils.replace(JUDGMENT_TEXT, props.round.achivedJudgment.toString(), props.round.predictedJudgment.toString())
							: UNKNOWN_SIGN}
					</Text>
					<Divider w="full" h={0.5} backgroundColor="brand.primary.default" />
					<Text w="full" h="50%" variant="report">
						{props.round.score}
					</Text>
				</VStack>
			</HStack>
		</Box>
	);
};
