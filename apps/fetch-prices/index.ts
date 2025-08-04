import { fetchAllPrices } from "@dexlens/utils";

async function getAllPrices() {
    const prices = await fetchAllPrices();
    console.log(prices);
}

getAllPrices();