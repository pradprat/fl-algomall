/* global AlgoSigner */
import React, { useEffect, useState } from 'react';
import './Modal.css';
import walletconimg from './WalletConnect.svg';
import algosignimg from './algosigner.png';
import { WalletConnectConnector, URI_AVAILABLE } from '@web3-react/walletconnect-connector';
import walletConnect from '../helpers/WalletConnect';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import WalletConnect from '@walletconnect/client';
import algosdk from 'algosdk';
import { formatJsonRpcRequest } from '@json-rpc-tools/utils';

import { apiGetAccountAssets, clientForChain } from '../helpers/api';
import { scenarios, signTxnWithTestAccount } from '../helpers/scenarios';

import MyAlgoConnect from '@randlabs/myalgo-connect';

const modalIcon = {
    width: '120px',
    height: '25px',
};

const chain = 'testnet';

function Modal({ closeModal, onConnect }) {
    const myAlgoWallet = new MyAlgoConnect();
    const [connected, setconnected] = useState(false);
    const [connector, setconnector] = useState(null);
    const [address, setaddress] = useState(null);
    const [balance, setbalance] = useState(null);
    const [pendingRequest, setpendingRequest] = useState(false);
    const [result, setresult] = useState(null);

    const walletConnectInit = () => {
        const bridge = 'https://bridge.walletconnect.org';
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        setconnector(connector);
        setconnected(connector.connected);
        if (connector.connected) {
            onConnect(connector);
            setaddress(connector.accounts[0]);
            apiGetAccountAssets(chain, connector.accounts[0]).then(data => {
                setbalance(
                    (Number(data[0].amount) / Math.pow(10, data[0].decimals)).toLocaleString(),
                );
            });
        } else {
        }
        subscribeToEvents();
    };

    const subscribeToEvents = () => {
        if (!connector) {
            return;
        }
        connector.on('session_update', (error, payload) => {
            if (error) {
                throw error;
            }
            const { accounts } = payload.params[0];
        });

        connector.on('connect', (error, payload) => {
            setconnected(true);
            // walletConnectInit();
            const { accounts } = payload.params[0];
            if (error) {
                throw error;
            }
        });

        connector.on('disconnect', (error, payload) => {
            setconnected(false);
            // walletConnectInit();
            if (error) {
                throw error;
            }
        });
    };

    const signTxnScenario = scenario => {
        if (!connector) {
            return;
        }
        try {
            const txnsToSign = scenario(chain, address);
            txnsToSign.then(data => {
                console.log(data);
                const flatTxns = data.reduce((acc, val) => acc.concat(val), []);
                const walletTxns = flatTxns.map(({ txn, signers, authAddr, message }) => ({
                    txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
                    signers, // TODO: put auth addr in signers array
                    authAddr,
                    message,
                }));
                // sign transaction
                const requestParams = [walletTxns];
                const request = formatJsonRpcRequest('algo_signTxn', requestParams);
                let sendRequest = connector.sendCustomRequest(request);
                sendRequest
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {});
            });
        } catch (error) {}
    };

    useEffect(() => {
        walletConnectInit();
        return () => {};
    }, [connected]);

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                {address && (
                    <>
                        <h1>Balance</h1>
                        <h1>{balance} Algo</h1>
                        <button
                            className='con-btn'
                            onClick={() => {
                                // walletConnectInit();
                                if (connector) {
                                    if (connected) {
                                        connector.killSession();
                                        setaddress(null);
                                    }
                                }
                            }}
                        >
                            Disconnect
                        </button>
                        {scenarios.map(({ name, scenario }) => {
                            return (
                                <button
                                    className='con-btn'
                                    onClick={() => {
                                        signTxnScenario(scenario);
                                    }}
                                >
                                    {name}
                                </button>
                            );
                        })}
                    </>
                )}
                {!address && (
                    <>
                        <div className='modal-title'>
                            <h1 className='modaltitle'>Connect Your Wallet To Algomall</h1>
                        </div>
                        <div className='modalbody'>
                            <p className='modalparagraph'>
                                Choose your preferred wallet authentication method.
                            </p>
                            <img src={walletconimg} alt='walletconnect_icon' style={modalIcon} />
                            <br />
                            <button
                                className='con-btn'
                                onClick={() => {
                                    if (connector) {
                                        if (!connected) {
                                            connector.createSession();
                                            setconnected(!connected);
                                        }
                                    }
                                }}
                            >
                                Use WalletConnect
                            </button>
                            <br />
                            <button
                                className='con-btn'
                                onClick={() => {
                                    myAlgoWallet
                                        .connect()
                                        .then(data => {
                                            const address = data[0].address;
                                            console.log(address);
                                            onConnect(address);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }}
                            >
                                Use MyAlgo
                            </button>
                            <br />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Modal;
