import { Box, Center, Text } from "@chakra-ui/react";
import { FADE_IN_OUT_KEY_FRAME, TEXT_ANIMATION_REPEATED } from "../constants";
import { StringUtils } from "../utils";

interface IBodyProps {
	text?: string;
	sx?: object;
}

export const Body = (props: IBodyProps): JSX.Element => {
	return (
		<Box w="full" h="full" sx={props.sx}>
			<Center w="full" h="full">
				<Text w="fit-content" h="fit-content" variant="label" animation={StringUtils.replace(TEXT_ANIMATION_REPEATED, FADE_IN_OUT_KEY_FRAME)}>
					{props.text}
				</Text>
			</Center>
		</Box>
	);
};
