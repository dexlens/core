import WebSocket from 'npm:ws';

/**
 * Setup the websocket connection to the ETH Watcher
 * @param ETH_WATCHER_WEBSOCKET_URL - The URL of the ETH Watcher websocket
 * @returns The websocket connection
 */
export const setupEthWatcherWebsocket = (ETH_WATCHER_WEBSOCKET_URL: string) => {
    return new WebSocket(ETH_WATCHER_WEBSOCKET_URL);
};