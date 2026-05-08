export default async function apiRequest(url, data = null) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
        });

        const rawText = await response.text();

        try {
            return JSON.parse(rawText);
        } catch (parseError) {
            const cleanMessage = rawText.replace(/<[^>]*>?/gm, ' ').trim();
            throw new Error(cleanMessage || "Пустой ответ от сервера");
        }

    } catch (error) {
        console.error("Запрос не удался:", error.message);
        return {
            error: true,
            message: error.message
        };
    }
}