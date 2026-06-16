const AI_REQUEST_TIMEOUT_MS = 30_000;

export async function sendAiDraftRequest(request: string): Promise<string> {
    const endpoint = "https://dictionary-editor-ai.viktor-senia.workers.dev/generate";
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT_MS);

    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: request
            }),
            signal: controller.signal
        });

        const responseText = await result.text();

        if (!result.ok) {
            throw new Error(responseText || `HTTP ${result.status}`);
        }

        return responseText;
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("aiPanel.requestTimedOut");
        }

        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
}
