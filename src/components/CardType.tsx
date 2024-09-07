import { Box, Center, Image, Text } from "@chakra-ui/react";
import { CARD_ANIMATION, FADE_IN_KEY_FRAME, TEXT_ANIMATION, UNKNOWN_SIGN } from "../constants";
import { ECardType } from "../enums";
import { useResource } from "../hooks";
import { StringUtils } from "../utils";

interface ICardTypeProps {
	type?: ECardType;
	sx?: object;
}

export const CardType = (props: ICardTypeProps): JSX.Element => {
	const { getCardType } = useResource();

	return (
		<Box w="full" h="full" sx={props.sx}>
			<Center w="full" h="full" backgroundColor="transparent" borderWidth={1} borderColor="brand.primary.default" borderRadius="md" overflow="hidden">
				{props.type !== undefined ? (
					<Image
						w="full"
						h="fit-content"
						src={getCardType(props.type)}
						alt={props.type}
						objectFit="cover"
						animation={StringUtils.replace(CARD_ANIMATION, FADE_IN_KEY_FRAME)}
					/>
				) : (
					<Text w="fit-content" h="fit-content" variant="cardType" animation={StringUtils.replace(TEXT_ANIMATION, FADE_IN_KEY_FRAME)}>
						{UNKNOWN_SIGN}
					</Text>
				)}
			</Center>
		</Box>
	);
};
