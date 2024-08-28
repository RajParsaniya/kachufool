import { Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Content } from ".";
import { FOOTER_TEXT, GITHUB_URL, TITLE_TEXT } from "../constants";
import { useApp } from "../hooks";

export const App = (): JSX.Element => {
	const {
		config,
		reports,
		profiles,
		tableCards,
		playerCards,
		isLoading,
		isStarted,
		isEnded,
		reload,
		onClickStart,
		onClickFinish,
		onClickReplay,
		onClickProfile,
		onClickJudgment,
		onClickCard,
		winner,
	} = useApp();

	return (
		<Center w="full" minW="100vw" h="full" minH="100vh">
			<VStack w="fit-content" h="fit-content" backgroundColor="brand.primary.default" borderRadius="3xl" py={7} spacing={0}>
				<Text w="fit-content" h="fit-content" variant="title">
					{TITLE_TEXT}
				</Text>
				<HStack w="600px" minW="600px" maxW="600px" h="400px" minH="400px" maxH="400px" pt={2} pb={6} px={10} spacing={0}>
					<Content
						config={config}
						reports={reports}
						profiles={profiles}
						tableCards={tableCards}
						playerCards={playerCards}
						isLoading={isLoading}
						isStarted={isStarted}
						isEnded={isEnded}
						reload={reload}
						onClickStart={onClickStart}
						onClickFinish={onClickFinish}
						onClickReplay={onClickReplay}
						onClickProfile={onClickProfile}
						onClickJudgment={onClickJudgment}
						onClickCard={onClickCard}
						winner={winner}
						sx={{ w: "full", h: "full" }}
					/>
				</HStack>
				<Link w="fit-content" h="fit-content" variant="footer" target="_blank" href={GITHUB_URL}>
					{FOOTER_TEXT}
				</Link>
			</VStack>
		</Center>
	);
};
