/**
 * Open the ETH Watcher websocket
 * @param ws - The websocket connection
 * @param options - The options for the subscription
 * @returns A promise that resolves when the websocket is opened
 */
export const openEthWatcherWebsocket = async (ws: any, options: any) => {
    return await new Promise((resolve, reject) => {
        ws.on("open", () => {
            const subscriptionData = {
                method: options.method,
                table: options.table,
            };
            ws.send(JSON.stringify(subscriptionData));
            resolve();
        });
        ws.on("error", (error: any) => reject(error));
    });
};
