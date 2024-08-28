import { Box, Center, Image, Text } from "@chakra-ui/react";
import { CARD_ANIMATION, FADE_IN_KEY_FRAME, TEXT_ANIMATION, UNKNOWN_SIGN } from "../constants";
import { ECard } from "../enums";
import { useResource } from "../hooks";
import { StringUtils } from "../utils";

interface IPlayerCardProps {
	card?: ECard;
	isDisabled: boolean;
	isClickable: boolean;
	onClickCard: (card: ECard) => void;
	sx?: object;
}

export const PlayerCard = (props: IPlayerCardProps): JSX.Element => {
	const { getCard } = useResource();

	const onClickCard = (): void => {
		if (props.card !== undefined && props.isClickable && !props.isDisabled) {
			props.onClickCard(props.card);
		}
	};

	return (
		<Box w="full" h="full" sx={props.sx}>
			<Center
				w="full"
				h="full"
				backgroundColor="transparent"
				borderWidth={props.card !== undefined ? 0 : 1}
				borderColor="brand.secondary.default"
				borderRadius="md"
				overflow="hidden"
				opacity={props.isClickable ? (props.isDisabled ? 0.8 : 1.0) : 0.9}
				onClick={onClickCard}
			>
				{props.card !== undefined ? (
					<Image
						w="full"
						h="full"
						src={getCard(props.card)}
						alt={props.card}
						objectFit="cover"
						cursor={props.isClickable ? (props.isDisabled ? "not-allowed" : "pointer") : "not-allowed"}
						animation={StringUtils.replace(CARD_ANIMATION, FADE_IN_KEY_FRAME)}
					/>
				) : (
					<Text w="fit-content" h="fit-content" variant="playerCard" animation={StringUtils.replace(TEXT_ANIMATION, FADE_IN_KEY_FRAME)}>
						{UNKNOWN_SIGN}
					</Text>
				)}
			</Center>
		</Box>
	);
};
