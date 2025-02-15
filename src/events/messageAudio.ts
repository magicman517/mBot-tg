import { type mContext } from "@/clients";
import { handleAudioTranscription, handleInteraction } from "@/helpers";
import { Composer } from "grammy";

export const messageAudioComposer = new Composer<mContext>();

messageAudioComposer.on("message:audio", async (ctx) => {
	await handleInteraction("message:audio", async () => {
		await handleAudioTranscription(ctx);
	});
});
