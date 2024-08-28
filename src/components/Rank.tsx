import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { RANK_LABEL, UNKNOWN_SIGN } from "../constants";

interface IRankProps {
	rank?: number;
	sx?: object;
}

export const Rank = (props: IRankProps): JSX.Element => {
	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" borderWidth={1} borderRadius="md" overflow="hidden" spacing={0}>
				<Center w="full" h="45%" backgroundColor="brand.secondary.default">
					<Text w="fit-content" h="fit-content" variant="label">
						{RANK_LABEL}
					</Text>
				</Center>
				<Center w="full" h="55%" backgroundColor="brand.primary.default">
					<Text w="fit-content" h="fit-content" variant="score">
						{props.rank !== undefined ? props.rank : UNKNOWN_SIGN}
					</Text>
				</Center>
			</VStack>
		</Box>
	);
};
