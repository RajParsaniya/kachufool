import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { ADD_PROFILE_LATER_TOAST, ADD_PROFILE_TOAST, NOT_STARTED_TOAST, REMOVE_PROFILE_LATER_TOAST, REMOVE_PROFILE_TOAST } from "../constants";
import { EPlayer } from "../enums";
import { StringUtils } from "../utils";

interface IToastValueExports {
	getNotStartedToastOptions: UseToastOptions;
	getAddProfileToastOptions: (player: EPlayer) => UseToastOptions;
	getRemoveProfileToastOptions: (player: EPlayer) => UseToastOptions;
	getAddProfileLaterToastOptions: (player: EPlayer) => UseToastOptions;
	getRemoveProfileLaterToastOptions: (player: EPlayer) => UseToastOptions;
	getAddProfileLaterToastId: (player: EPlayer) => ToastId;
	getRemoveProfileLaterToastId: (player: EPlayer) => ToastId;
}

export const useToastValue = (): IToastValueExports => {
	const getNotStartedToastOptions: UseToastOptions = {
		id: "not-started",
		title: NOT_STARTED_TOAST,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const getAddProfileToastOptions = (player: EPlayer): UseToastOptions => {
		return {
			id: "add-profile-" + player,
			title: StringUtils.replace(ADD_PROFILE_TOAST, player),
			isClosable: true,
			position: "top-right",
			status: "success",
			duration: 2500,
		};
	};

	const getRemoveProfileToastOptions = (player: EPlayer): UseToastOptions => {
		return {
			id: "remove-profile-" + player,
			title: StringUtils.replace(REMOVE_PROFILE_TOAST, player),
			isClosable: true,
			position: "top-right",
			status: "success",
			duration: 2500,
		};
	};

	const getAddProfileLaterToastOptions = (player: EPlayer): UseToastOptions => {
		return {
			id: "add-profile-later-" + player,
			title: StringUtils.replace(ADD_PROFILE_LATER_TOAST, player),
			isClosable: true,
			position: "top-right",
			status: "warning",
			duration: null,
		};
	};

	const getRemoveProfileLaterToastOptions = (player: EPlayer): UseToastOptions => {
		return {
			id: "remove-profile-later-" + player,
			title: StringUtils.replace(REMOVE_PROFILE_LATER_TOAST, player),
			isClosable: true,
			position: "top-right",
			status: "warning",
			duration: null,
		};
	};

	const getAddProfileLaterToastId = (player: EPlayer): ToastId => {
		return "add-profile-later-" + player;
	};

	const getRemoveProfileLaterToastId = (player: EPlayer): ToastId => {
		return "remove-profile-later-" + player;
	};

	return {
		getNotStartedToastOptions,
		getAddProfileToastOptions,
		getRemoveProfileToastOptions,
		getAddProfileLaterToastOptions,
		getRemoveProfileLaterToastOptions,
		getAddProfileLaterToastId,
		getRemoveProfileLaterToastId,
	};
};
