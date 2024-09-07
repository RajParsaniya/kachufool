import { defineStyle } from "@chakra-ui/react";

export const textStyle: Record<string, object> = {
	components: {
		Text: {
			baseStyle: {
				userSelect: "none",
				textDecoration: "none",
				fontFamily: "Helvetica, sans-serif",
			},
			variants: {
				title: defineStyle({
					fontSize: "2xl",
					fontWeight: "none",
					color: "brand.secondary.default",
				}),
				label: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					color: "brand.primary.default",
				}),
				profile: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					color: "brand.primary.default",
				}),
				editProfile: defineStyle({
					fontSize: "md",
					fontWeight: "semibold",
					textAlign: "center",
					placeContent: "center",
					color: "brand.secondary.default",
					_hover: {
						color: "brand.primary.default",
					},
				}),
				judgment: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					color: "brand.secondary.default",
				}),
				tableCardHeader: defineStyle({
					fontSize: "xs",
					fontWeight: "semibold",
					color: "brand.primary.default",
				}),
				tableCard: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					color: "brand.primary.default",
				}),
				playerCard: defineStyle({
					fontSize: "md",
					fontWeight: "semibold",
					color: "brand.secondary.default",
				}),
				cardType: defineStyle({
					fontSize: "md",
					fontWeight: "semibold",
					color: "brand.primary.default",
				}),
				rank: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					color: "brand.primary.default",
				}),
				score: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					color: "brand.secondary.default",
				}),
				report: defineStyle({
					fontSize: "sm",
					fontWeight: "semibold",
					textAlign: "center",
					placeContent: "center",
					color: "brand.primary.default",
				}),
			},
		},
	},
};
