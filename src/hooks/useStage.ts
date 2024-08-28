import { allRounds, allTables, ERound, ETable } from "../enums";
import { Stage } from "../type";

interface IUpdateStageExports {
	stage: Stage;
	isEnded: boolean;
}

interface IStageExports {
	updateStage: (stage: Stage) => IUpdateStageExports;
	getPreviousStage: (stage: Stage) => Stage;
	isStageFinished: (stage: Stage) => boolean;
}

export const useStage = (): IStageExports => {
	const updateStage = (stage: Stage): IUpdateStageExports => {
		const isEnded: boolean = stage.table === ETable.EIGHTH;
		const updatedStage: Stage = isStageFinished(stage)
			? { round: ERound.FOURTH, table: ETable.EIGHTH }
			: isEnded
			? { round: allRounds()[allRounds().indexOf(stage.round) + 1], table: ETable.FIRST }
			: { round: stage.round, table: allTables()[allTables().indexOf(stage.table) + 1] };
		return { stage: updatedStage, isEnded: isEnded };
	};

	const getPreviousStage = (stage: Stage): Stage => {
		return isStageFinished(stage)
			? { round: ERound.FOURTH, table: ETable.EIGHTH }
			: stage.table === ETable.FIRST
			? { round: allRounds()[allRounds().indexOf(stage.round) - 1], table: ETable.EIGHTH }
			: { round: stage.round, table: allTables()[allTables().indexOf(stage.table) - 1] };
	};

	const isStageFinished = (stage: Stage): boolean => {
		return stage.round === ERound.FOURTH && stage.table === ETable.EIGHTH;
	};

	return { updateStage, getPreviousStage, isStageFinished };
};
