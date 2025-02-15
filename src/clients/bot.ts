import { commandStartComposer } from "@/commands";
import { messageAudioComposer, messageVoiceComposer } from "@/events";
import { logger } from "@/clients";

import { Context, Bot as gBot } from "grammy";
import { hydrateFiles, type FileFlavor } from "@grammyjs/files";
import { mkdir, existsSync, rm } from "fs";

export type mContext = FileFlavor<Context>;

class Bot {
	private _bot: gBot<mContext>;

	constructor() {
		if (!process.env["BOT_TOKEN"]) {
			throw new Error("Token is required");
		}

		this._bot = new gBot<mContext>(process.env["BOT_TOKEN"]);
		this._bot.api.config.use(hydrateFiles(process.env["BOT_TOKEN"]));

		this._registerCommands();
		this._registerEvents();

		this._createAudiosFolder();
	}

	public run = (): void => {
		this._bot.catch((err) => {
			logger.error(`Uncaught error: ${err}`);
		});

		logger.info("Starting bot...");
		this._bot.start();
	};

	private _registerCommands = (): void => {
		this._bot.use(commandStartComposer);
	};

	private _registerEvents = (): void => {
		this._bot.use(messageVoiceComposer);
		this._bot.use(messageAudioComposer);
	};

	private _createAudiosFolder = (): void => {
		// clear folder if it exists
		if (existsSync("assets/audios")) {
			rm("audio", { recursive: true, force: true }, (err) => {
				if (err) {
					logger.error("Failed to delete audio folder");
					process.exit(1);
				}
			});
		}

		mkdir("assets/audios", { recursive: true }, (err) => {
			if (err) {
				logger.error("Failed to create audio folder");
				process.exit(1);
			}
		});
	};
}

export const bot = new Bot();
