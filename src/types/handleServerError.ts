export function handleServerError(error: unknown, customMessage = "Server error, please try again") {
    console.error("Server Error:", error);
    return {
        message: customMessage,
        status: 500,
    };
}
