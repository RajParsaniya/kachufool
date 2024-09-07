import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ADD_SIGN, FADE_IN_KEY_FRAME, JUDGMENT_TEXT, REMOVE_SIGN, TEXT_ANIMATION, UNKNOWN_SIGN } from "../constants";
import { EJudgment, EPlayer } from "../enums";
import { StringUtils } from "../utils";

interface IProfileProps {
	player: EPlayer;
	score: number;
	achivedJudgment: EJudgment;
	predictedJudgment?: EJudgment;
	isLoading: boolean;
	isVisible: boolean;
	isRequired: boolean;
	isDisabled: boolean;
	onClickProfile: (player: EPlayer) => void;
	sx?: object;
}

export const Profile = (props: IProfileProps): JSX.Element => {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	const onClickProfile = (): void => {
		if (!props.isRequired) {
			setIsHovering(false);
			props.onClickProfile(props.player);
		}
	};

	return (
		<Box w="full" h="full" sx={props.sx}>
			{props.isLoading ? (
				<Center
					w="full"
					h="full"
					borderWidth={1}
					borderRadius="md"
					borderColor="brand.secondary.default"
					backgroundColor="transparent"
					overflow="hidden"
				>
					<Spinner size="sm" color="brand.secondary.default" />
				</Center>
			) : props.isVisible ? (
				props.isRequired ? (
					<VStack
						w="full"
						h="full"
						borderWidth={1}
						borderRadius="md"
						borderColor="brand.secondary.default"
						backgroundColor="transparent"
						cursor="not-allowed"
						overflow="hidden"
						onClick={onClickProfile}
						spacing={0}
					>
						<ProfileView
							player={props.player}
							achivedJudgment={props.achivedJudgment}
							predictedJudgment={props.predictedJudgment}
							sx={{ w: "full", h: "full" }}
						/>
					</VStack>
				) : (
					<VStack
						w="full"
						h="full"
						borderWidth={1}
						borderRadius="md"
						borderColor="brand.secondary.default"
						backgroundColor="transparent"
						overflow="hidden"
						cursor="pointer"
						opacity={props.isDisabled ? 0.7 : 1.0}
						_hover={{ backgroundColor: "brand.secondary.default" }}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						onClick={onClickProfile}
						spacing={0}
					>
						{isHovering ? (
							<VStack w="full" h="full" spacing={0}>
								<Text w="full" h="full" variant="editProfile">
									{REMOVE_SIGN}
								</Text>
							</VStack>
						) : (
							<ProfileView
								player={props.player}
								achivedJudgment={props.achivedJudgment}
								predictedJudgment={props.predictedJudgment}
								sx={{ w: "full", h: "full" }}
							/>
						)}
					</VStack>
				)
			) : (
				<VStack
					w="full"
					h="full"
					borderWidth={1}
					borderRadius="md"
					borderColor="brand.secondary.default"
					backgroundColor="transparent"
					overflow="hidden"
					cursor="pointer"
					_hover={{ backgroundColor: "brand.secondary.default" }}
					onClick={onClickProfile}
					spacing={0}
				>
					<Text w="full" h="full" variant="editProfile">
						{ADD_SIGN}
					</Text>
				</VStack>
			)}
		</Box>
	);
};

interface IProfileViewProps {
	player: EPlayer;
	achivedJudgment: EJudgment;
	predictedJudgment?: EJudgment;
	sx?: object;
}

const ProfileView = (props: IProfileViewProps): JSX.Element => {
	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" spacing={0}>
				<Center w="full" h={5} backgroundColor="brand.secondary.default" px={1.5}>
					<Text w="fit-content" h="fit-content" variant="profile">
						{props.player}
					</Text>
				</Center>
				<Center w="full" h="full">
					<Text w="fit-content" h="fit-content" variant="judgment" animation={StringUtils.replace(TEXT_ANIMATION, FADE_IN_KEY_FRAME)}>
						{props.predictedJudgment !== undefined
							? StringUtils.replace(JUDGMENT_TEXT, props.achivedJudgment.toString(), props.predictedJudgment.toString())
							: UNKNOWN_SIGN}
					</Text>
				</Center>
			</VStack>
		</Box>
	);
};
