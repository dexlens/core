/**
 * TODO: Needs better implementation, this is a temporary solution
 * Parse the chain events
 * @param data - The data to parse
 * @param options - The options for the parsing
 * @returns The parsed data
 */
export const parseChainEvents = async (data: any, {
    moneySeen,
    transactionsSeen,
    fullData,
}: {
    moneySeen: number;
    transactionsSeen: number;
    fullData: any;
}) => {
    let currentRoundMoneySeen = 0;
    let currentRoundTransactionsSeen = 0;
    let currentRoundData = {};
    for (const record of records) {
        moneySeen += record.amount_usd;
        transactionsSeen += 1;

        currentRoundMoneySeen += record.amount_usd;
        currentRoundTransactionsSeen += 1;

        if (!fullData[record.token_symbol]) {
            fullData[record.token_symbol] = {
                moneySeen: 0,
                transactionsSeen: 0,
            };
        }
        fullData[record.token_symbol].moneySeen += record.amount_usd;
        fullData[record.token_symbol].transactionsSeen += 1;

        if (!currentRoundData[record.token_symbol]) {
            currentRoundData[record.token_symbol] = {
                moneySeen: 0,
                transactionsSeen: 0,
            };
        }
        currentRoundData[record.token_symbol].moneySeen += record.amount_usd;
        currentRoundData[record.token_symbol].transactionsSeen += 1;
    }
    return {
        moneySeen,
        transactionsSeen,
        currentRoundMoneySeen,
        currentRoundTransactionsSeen,
        fullData,
        currentRoundData,
    };
};
