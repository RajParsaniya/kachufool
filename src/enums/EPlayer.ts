export enum EPlayer {
	YOU = "You",
	BOT_1 = "Bot 1",
	BOT_2 = "Bot 2",
	BOT_3 = "Bot 3",
	BOT_4 = "Bot 4",
	BOT_5 = "Bot 5",
}

export const allPlayers = (): Array<EPlayer> => {
	return Object.keys(EPlayer).map((_, index) => Object.values(EPlayer)[index]);
};
