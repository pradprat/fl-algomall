import algosdk from 'algosdk';
// import { IAssetData } from './types';
export enum ChainType {
    MainNet = 'mainnet',
    TestNet = 'testnet',
}
const mainNetClient = new algosdk.Algodv2('', 'https://algoexplorerapi.io', '');
const testNetClient = new algosdk.Algodv2('', 'https://testnet.algoexplorerapi.io', '');

export function clientForChain(chain: any) {
    switch (chain) {
        case 'mainnet':
            return mainNetClient;
        case 'testnet':
            return testNetClient;
        default:
            throw new Error(`Unknown chain type: ${chain}`);
    }
}

export async function apiGetAccountAssets(chain: any, address: any) {
    const client = clientForChain(chain);

    const accountInfo = await client
        .accountInformation(address)
        .setIntDecoding(algosdk.IntDecoding.BIGINT)
        .do();

    const algoBalance = accountInfo.amount;
    const assetsFromRes = accountInfo.assets;

    const assets = assetsFromRes.map((id: any, amount: any, creator: any, frozen: any) => {
        return {
            id: Number(id),
            amount,
            creator,
            frozen,
            decimals: 0,
        };
    });

    assets.sort((a: any, b: any) => a.id - b.id);

    await Promise.all(
        assets.map(async (asset: any) => {
            const { params } = await client.getAssetByID(asset.id).do();
            asset.name = params.name;
            asset.unitName = params['unit-name'];
            asset.url = params.url;
            asset.decimals = params.decimals;
        }),
    );

    assets.unshift({
        id: 0,
        amount: algoBalance,
        creator: '',
        frozen: false,
        decimals: 6,
        name: 'Algo',
        unitName: 'Algo',
    });

    return assets;
}

export async function apiGetTxnParams(chain: any) {
    const params = await clientForChain(chain).getTransactionParams().do();
    return params;
}

export async function apiSubmitTransactions(chain: any, stxns: any) {
    const { txId } = await clientForChain(chain).sendRawTransaction(stxns).do();
    return await waitForTransaction(chain, txId);
}

async function waitForTransaction(chain: any, txId: any) {
    const client = clientForChain(chain);

    let lastStatus = await client.status().do();
    let lastRound = lastStatus['last-round'];
    while (true) {
        const status = await client.pendingTransactionInformation(txId).do();
        if (status['pool-error']) {
            throw new Error(`Transaction Pool Error: ${status['pool-error']}`);
        }
        if (status['confirmed-round']) {
            return status['confirmed-round'];
        }
        lastStatus = await client.statusAfterBlock(lastRound + 1).do();
        lastRound = lastStatus['last-round'];
    }
}
