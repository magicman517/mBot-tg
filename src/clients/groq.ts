import Groq from "groq-sdk";

import { logger } from "@/clients";
import { createReadStream } from "fs";

class GroqClient {
	private _groqClient: Groq;

	/**
	 * Models list can be found at https://console.groq.com/docs/models
	 */
	private readonly _transcriptionModel: string =
		process.env["GROQ_TRANSCRIPTION_MODEL"] || "whisper-large-v3"; // whisper-large-v3 is the default model because it has best word error rate

	constructor() {
		if (!process.env["GROQ_API_KEY"]) {
			throw new Error("GROQ_API_KEY is required");
		}

		this._groqClient = new Groq({ apiKey: process.env["GROQ_API_KEY"] });
	}

	/**
	 * This function is only called once in `src/index.ts`, to check if API key is valid
	 */
	public getModels = () => {
		this._groqClient.models
			.list()
			.then(() => {
				logger.debug("Groq API key is valid");
			})
			.catch(() => {
				logger.error("Failed to validate Groq API key");
				process.exit(1);
			});
	};

	/**
	 * Create a transcription from an audio file
	 */
	public transcribe = async (audio: string): Promise<string> => {
		const fileId = audio.replace(/\.mp3$/, "").slice(-20);
		logger.debug(`Transcribing audio ${fileId}`);

		const transcription =
			await this._groqClient.audio.transcriptions.create({
				file: createReadStream(audio),
				model: this._transcriptionModel,
				response_format: "json",
			});

		logger.debug(`Finished transcribing audio ${fileId}`);

		return transcription.text;
	};
}

export const groq = new GroqClient();
