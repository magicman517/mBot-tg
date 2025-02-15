import { logger } from "@/clients";

export const handleInteraction = async (
	interactionName: string,
	callback: () => Promise<void>
) => {
	try {
		const startTime = Date.now();

		await callback();

		const timeTaken = Date.now() - startTime;

		logger.debug(
			`Interaction ${interactionName} handled in ${timeTaken}ms`
		);
	} catch (err: any) {
		logger.error(`Error handling interaction ${interactionName}: ${err}`);
	}
};
