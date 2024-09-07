import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { UNKNOWN_SIGN } from "../constants";
import { EJudgment } from "../enums";

interface IJudgmentProps {
	onClickJudgment: (judgment?: EJudgment) => void;
	sx?: object;
}

export const Judgment = (props: IJudgmentProps): JSX.Element => {
	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" justifyContent="center" alignItems="center" spacing={3}>
				<HStack w="full" h="full" spacing={4}>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.ZERO)}>
						{EJudgment.ZERO}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.ONE)}>
						{EJudgment.ONE}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.TWO)}>
						{EJudgment.TWO}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.THREE)}>
						{EJudgment.THREE}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.FOUR)}>
						{EJudgment.FOUR}
					</Button>
				</HStack>
				<HStack w="full" h="full" spacing={4}>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.FIVE)}>
						{EJudgment.FIVE}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.SIX)}>
						{EJudgment.SIX}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.SEVEN)}>
						{EJudgment.SEVEN}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment(EJudgment.EIGHT)}>
						{EJudgment.EIGHT}
					</Button>
					<Button w="full" h="full" variant="judgment" onClick={() => props.onClickJudgment()}>
						{UNKNOWN_SIGN}
					</Button>
				</HStack>
			</VStack>
		</Box>
	);
};
