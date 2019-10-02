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

/*
const STORE_NEM_ADDR = 'SCYGUKCQAC73UNEBVNCGY6AP43WVOY3AFIFNGYU7';
const MOSAIC_ID = '19c0c4cb72f1df65';
const NETWORK_HASH = '1759507CBA645118341E7C90D4B24E574762C8B764A72D58303A358A6A9EE81F';
const NEM_NODE_HOST = 'https://nemp2p.mosin.jp';
const host = new TransactionHttp(NEM_NODE_HOST);
*/

//店舗のNEMアドレス(売上の受取)
const STORE_NEM_ADDR = 'SCXQVSLDPTOP7OBS7EW454ZQQTXJRTV7V3MQGAYA';
//moapで使用するMOSAICのID
const MOSAIC_ID = '2bb09db8269361d6';
//使用するnem chainのnetwork_generation_hash
const NETWORK_GENERATION_HASH = '249B14C178A3E7A2C8556EC3571FFAD4BAB2E71349FFD6E97A06675906EA1584';
// nem node
//const NEM_NODE_HOST = 'https://catapult-test.opening-line.jp:3001/';
const NEM_NODE_HOST = 'https://nemp2p.mosin.jp';
const host = new TransactionHttp(NEM_NODE_HOST);

export default async (amount, privateKey) => {
    console.log(`sending ${amount} ${privateKey}`);
    const transaction = TransferTransaction.create(
        Deadline.create(),
        Address.createFromRawAddress(STORE_NEM_ADDR),
        [
            new Mosaic(
                new MosaicId(MOSAIC_ID),
                UInt64.fromUint(amount)
            )
        ],
        PlainMessage.create('send from moap'),
        NetworkType.MIJIN_TEST
    );

    const sender = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = sender.sign(transaction, NETWORK_GENERATION_HASH);

    const res = await new Promise((resolve, reject) => {
        console.log('announcing transaction!');
        const succeeded = transactions => resolve(transactions);
        const failured = err => reject(err);
        host.announce(signedTransaction).subscribe(succeeded, failured);
    }).catch(err => console.error(err));
    console.log('announced!');
    console.log(res);
    return { data: true };
};






