import { useCallback, useMemo, useState } from "react";
import { EPlayer, ERound } from "../enums";
import { Report, ReportRound, Reports } from "../type";
import { useCore } from "./useCore";

interface IReportProps {
	reports: Reports;
}

interface IReportExports {
	rank: number,
	player: EPlayer;
	isLoading: boolean;
	onChange: (player: EPlayer) => void;
	getRound: (round: ERound) => ReportRound;
	getScore: (player: EPlayer) => number;
}

export const useReport = (props: IReportProps): IReportExports => {
	const { getRank } = useCore();

	const [player, setPlayer] = useState<EPlayer>(EPlayer.YOU);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const rank = useMemo((): number => {
		return getRank(props.reports, player);
	}, [getRank, player, props]);

	const onChangePlayer = useCallback((player: EPlayer): void => {
		setPlayer(player);
		setIsLoading(true);
		setTimeout((): void => {
			setIsLoading(false);
		}, 300);
	}, []);

	const onGetRound = useCallback(
		(round: ERound): ReportRound => {
			const report: Report = props.reports.find((reportValue) => reportValue.player === player) as Report;
			return report.rounds.find((roundValue) => roundValue.round === round) as ReportRound;
		},
		[player, props]
	);

	const onGetScore = useCallback(
		(player: EPlayer): number => {
			const report: Report = props.reports.find((reportValue) => reportValue.player === player) as Report;
			return report.score;
		},
		[props]
	);

	const onChange = (player: EPlayer): void => {
		onChangePlayer(player);
	};

	const getRound = (round: ERound): ReportRound => {
		return onGetRound(round);
	};

	const getScore = (player: EPlayer): number => {
		return onGetScore(player);
	};

	return {
		rank,
		player,
		isLoading,
		onChange,
		getRound,
		getScore,
	};
};
