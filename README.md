# mBot-tg

A simple Telegram bot that transcribes audio messages to text.

## Prerequisites

Before running the bot, ensure that you have set the following environment variables:

- **BOT_TOKEN**: Your [Telegram bot](https://telegram.me/BotFather) token.
- **GROQ_API_KEY**: Your [Groq Cloud](https://console.groq.com/keys) API key
- **GROQ_TRANSCRIPTION_MODEL**: (Optional) [Model]((https://console.groq.com/docs/speech-text)) to use for transcription (default: `whisper-large-v3`).
- **LOG_LEVEL**: (Optional) The logging level (default: `info`).
- **LOG_SAVE**: (Optional) Whether to save logs (default: `false`).

Additionally, ensure you have [Bun](https://bun.sh/) version **1.2** or higher installed.

## Installation

First, install the required dependencies:

```bash
bun install
```

Then, run the bot:

```bash
bun run start
```