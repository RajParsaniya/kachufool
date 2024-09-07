import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";
import { CARD_ANIMATION, FADE_IN_KEY_FRAME, TEXT_ANIMATION, UNKNOWN_SIGN } from "../constants";
import { ECard, EPlayer } from "../enums";
import { useResource } from "../hooks";
import { StringUtils } from "../utils";

interface ITableCardProps {
	card?: ECard;
	player: EPlayer;
	animation?: string;
	sx?: object;
}

export const TableCard = (props: ITableCardProps) => {
	const { getCard } = useResource();

	return (
		<Box w="full" h="full" animation={props.animation} sx={props.sx}>
			<VStack w="full" h="full" spacing={0}>
				<Center w="fit-content" h="fit-content">
					<Text w="fit-content" h="fit-content" variant="tableCardHeader">
						{props.player}
					</Text>
				</Center>
				<Center w="full" h="full" backgroundColor="transparent" borderWidth={1} borderColor="brand.primary.default" borderRadius="md" overflow="hidden">
					{props.card !== undefined ? (
						<Image
							w="full"
							h="full"
							src={getCard(props.card)}
							alt={props.card}
							objectFit="cover"
							animation={StringUtils.replace(CARD_ANIMATION, FADE_IN_KEY_FRAME)}
						/>
					) : (
						<Text w="fit-content" h="fit-content" variant="tableCard" animation={StringUtils.replace(TEXT_ANIMATION, FADE_IN_KEY_FRAME)}>
							{UNKNOWN_SIGN}
						</Text>
					)}
				</Center>
			</VStack>
		</Box>
	);
};
