import { defineStyle } from "@chakra-ui/react";

export const buttonStyles: Record<string, object> = {
	components: {
		Button: {
			variants: {
				primary: defineStyle({
					fontSize: "sm",
					fontWeight: "normal",
					borderRadius: "lg",
					color: "brand.primary.darker",
					backgroundColor: "brand.secondary.default",
				}),
				judgment: defineStyle({
					fontSize: "sm",
					fontWeight: "normal",
					borderWidth: 1,
					borderRadius: "md",
					borderColor: "brand.primary.default",
					color: "brand.primary.darker",
					backgroundColor: "brand.secondary.default",
					_hover: {
						color: "brand.secondary.default",
						backgroundColor: "brand.primary.default",
					},
				}),
			},
		},
	},
};
