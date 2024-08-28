import { Box, HStack } from "@chakra-ui/react";
import { EPlayer } from "../enums";
import { useTable } from "../hooks";
import { RoundTableCards } from "../type";
import { TableCard } from "./TableCard";

interface ITableProps {
	tableCards: RoundTableCards;
	winner?: EPlayer;
	sx?: object;
}

export const Table = (props: ITableProps) => {
	const { animation } = useTable({ tableCards: props.tableCards, winner: props.winner });

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" justifyContent="center" alignItems="center" spacing={3.5}>
				{props.tableCards.map((tableCardValue, tableCardIndex) => {
					const tableCardKey = "table-card-key" + tableCardIndex;
					return (
						<TableCard
							key={tableCardKey}
							card={tableCardValue.card}
							player={tableCardValue.player}
							animation={animation[tableCardIndex]}
							sx={{ w: 10, minW: 10, maxW: 10, h: "full" }}
						/>
					);
				})}
			</HStack>
		</Box>
	);
};
