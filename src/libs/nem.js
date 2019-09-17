import {
    Deadline,
    Address,
    Account,
    Mosaic,
    MosaicId,
    NetworkId,
    NetworkType,
    PlainMessage,
    TransactionHttp,
    TransferTransaction,
    UInt64
} from 'nem2-sdk';

const STORE_NEM_ADDR = 'SCYGUKCQAC73UNEBVNCGY6AP43WVOY3AFIFNGYU7';
const MOSAIC_ID = '19c0c4cb72f1df65';
const NETWORK_HASH = '1759507CBA645118341E7C90D4B24E574762C8B764A72D58303A358A6A9EE81F';
const NEM_NODE_HOST = 'https://nemp2p.mosin.jp';
const host = new TransactionHttp(NEM_NODE_HOST);

export default (amount, privateKey) => {
    const transaction = TransferTransaction.create(
        Deadline.create(),
        Address.createFromRawAddress(STORE_NEM_ADDR),
        [
            new Mosaic(
                new MosaicId(MOSAIC_ID),
                UInt64(amount)
            )
        ],
        PlainMessage.create('send from moap'),
        NetworkType.MIJIN_TEST
    );

    const sender = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = sender.sign(transaction, NETWORK_HASH);

    host.announce(signedTransaction)
        .subscribe(console.log, console.error);
};






