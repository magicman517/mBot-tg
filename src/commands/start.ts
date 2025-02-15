import type { mContext } from "@/clients";
import { handleInteraction } from "@/helpers";
import { Composer } from "grammy";

export const commandStartComposer = new Composer<mContext>();

const response =
	"Send me a voice message, audio file or a video note and I will transcribe it for you!";

commandStartComposer.command("start", async (ctx) => {
	await handleInteraction("command:start", async () => {
		await ctx.reply(response);
	});
});
