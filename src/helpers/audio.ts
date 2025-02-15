import { groq, logger, type mContext } from "@/clients";

export const handleAudioTranscription = async (
	ctx: mContext
): Promise<void> => {
	await ctx.replyWithChatAction("typing");

	const path = await downloadAudio(ctx);

	const transcription = await groq.transcribe(path);

	await ctx.reply(transcription);

	await removeAudio(path);
};

/**
 * Download file as .mp3 and return path
 */
const downloadAudio = async (ctx: mContext): Promise<string> => {
	const file = await ctx.getFile();

	logger.debug(`Downloading file ${file.file_id.slice(-20)}`);

	const path = await file.download(`assets/audios/${file.file_id}.mp3`);

	logger.debug(`Downloaded file ${file.file_id.slice(-20)}`);

	return path;
};

/**
 * Remove audio file
 */
const removeAudio = async (path: string): Promise<void> => {
	// remove the file extension
	const fileId = path.replace(/\.mp3$/, "").slice(-20);

	logger.debug(`Removing file ${fileId}`);

	const file = Bun.file(path);

	if (await file.exists()) {
		await file.delete();

		logger.debug(`Removed file ${fileId}`);
	} else {
		logger.debug(`File ${fileId} does not exist`);
	}
};
