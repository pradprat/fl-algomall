import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import WalletConnect from '@walletconnect/client';
import algosdk from 'algosdk';
import { formatJsonRpcRequest } from '@json-rpc-tools/utils';

const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org', // Required
    qrcodeModal: QRCodeModal,
});

export default connector;
