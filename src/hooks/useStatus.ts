import { Status } from "../type";

interface IStatusExports {
	setIsInitializingStatus: (status: Status, isInitializing?: boolean) => Status;
	setIsPredictingStatus: (status: Status, isPredicting?: boolean) => Status;
	setIsLastPredictingStatus: (status: Status, isLastPredicting?: boolean) => Status;
	setIsStartingStatus: (status: Status, isStarting?: boolean) => Status;
	setIsPlayingStatus: (status: Status, isPlaying?: boolean) => Status;
	setIsLastPlayingStatus: (status: Status, isLastPlaying?: boolean) => Status;
	setIsEndingStatus: (status: Status, isEnding?: boolean) => Status;
	setIsClosingStatus: (status: Status, isClosing?: boolean) => Status;
}

export const useStatus = (): IStatusExports => {
	const setIsInitializingStatus = (status: Status, isInitializing?: boolean): Status => {
		return {
			isInitializing: isInitializing !== undefined ? isInitializing : !status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsPredictingStatus = (status: Status, isPredicting?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: isPredicting !== undefined ? isPredicting : !status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsLastPredictingStatus = (status: Status, isLastPredicting?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: isLastPredicting !== undefined ? isLastPredicting : !status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsStartingStatus = (status: Status, isStarting?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: isStarting !== undefined ? isStarting : !status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsPlayingStatus = (status: Status, isPlaying?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: isPlaying !== undefined ? isPlaying : !status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsLastPlayingStatus = (status: Status, isLastPlaying?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: isLastPlaying !== undefined ? isLastPlaying : !status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsEndingStatus = (status: Status, isEnding?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: isEnding !== undefined ? isEnding : !status.isEnding,
			isClosing: status.isClosing,
		};
	};

	const setIsClosingStatus = (status: Status, isClosing?: boolean): Status => {
		return {
			isInitializing: status.isInitializing,
			isPredicting: status.isPredicting,
			isLastPredicting: status.isLastPredicting,
			isStarting: status.isStarting,
			isPlaying: status.isPlaying,
			isLastPlaying: status.isLastPlaying,
			isEnding: status.isEnding,
			isClosing: isClosing !== undefined ? isClosing : !status.isClosing,
		};
	};

	return {
		setIsInitializingStatus,
		setIsPredictingStatus,
		setIsLastPredictingStatus,
		setIsStartingStatus,
		setIsPlayingStatus,
		setIsLastPlayingStatus,
		setIsEndingStatus,
		setIsClosingStatus,
	};
};
