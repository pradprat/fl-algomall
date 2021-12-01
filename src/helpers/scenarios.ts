import algosdk from 'algosdk';
import { apiGetTxnParams, ChainType } from './api';
import connector from './WalletConnect';

const testAccounts = [
    algosdk.mnemonicToSecretKey(
        'cannon scatter chest item way pulp seminar diesel width tooth enforce fire rug mushroom tube sustain glide apple radar chronic ask plastic brown ability badge',
    ),
    algosdk.mnemonicToSecretKey(
        'person congress dragon morning road sweet horror famous bomb engine eager silent home slam civil type melt field dry daring wheel monitor custom above term',
    ),
    algosdk.mnemonicToSecretKey(
        'faint protect home drink journey humble tube clinic game rough conduct sell violin discover limit lottery anger baby leaf mountain peasant rude scene abstract casual',
    ),
];

export function signTxnWithTestAccount(txn: algosdk.Transaction): Uint8Array {
    const sender = algosdk.encodeAddress(txn.from.publicKey);

    for (const testAccount of testAccounts) {
        if (testAccount.addr === sender) {
            return txn.signTxn(testAccount.sk);
        }
    }

    throw new Error(`Cannot sign transaction from unknown test account: ${sender}`);
}

export interface IScenarioTxn {
    txn: algosdk.Transaction;
    signers?: string[];
    authAddr?: string;
    message?: string;
}

export type ScenarioReturnType = IScenarioTxn[][];

export type Scenario = (
    chain: ChainType,
    addressFrom: string,
    addressTo: string,
    amount: number,
) => Promise<ScenarioReturnType>;

export enum AssetTransactionType {
    Transfer = 'asset-transfer',
    OptIn = 'asset-opt-in',
    Close = 'asset-close',
}

const singlePayTxn: Scenario = async (
    chain: ChainType,
    addressFrom: string,
    addressTo: string,
    amount: number,
): Promise<any> => {
    const suggestedParams = await apiGetTxnParams(chain);
    // connector.sendCustomRequest()
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: addressFrom,
        to: addressTo,
        amount: amount,
        note: new Uint8Array(Buffer.from('example note value')),
        suggestedParams,
    });
    return txn;
    console.log(txn.toByte());

    const txnsToSign = [{ txn, message: 'This is a transaction message' }];
    return [txnsToSign];
};

export const scenarios: Array<{ name: string; scenario: Scenario }> = [
    {
        name: 'Pay',
        scenario: singlePayTxn,
    },
];
