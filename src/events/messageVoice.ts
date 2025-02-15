import { type mContext } from "@/clients";
import { handleAudioTranscription, handleInteraction } from "@/helpers";
import { Composer } from "grammy";

export const messageVoiceComposer = new Composer<mContext>();

messageVoiceComposer.on("message:voice", async (ctx) => {
	await handleInteraction("message:voice", async () => {
		await handleAudioTranscription(ctx);
	});
});
