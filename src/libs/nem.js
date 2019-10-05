import {
    Deadline,
    Address,
    Account,
    AccountHttp,
    Mosaic,
    MosaicHttp,
    MosaicId,
    MosaicService,
    NetworkType,
    EncryptedMessage,
    PublicAccount,
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
const STORE_NEM_PUB_KEY = '2DFD4CA13807CD2DF597CCCA83BCF6E66D8D06711E3AFDA58DCD1FDA95129EB5';
//moapで使用するMOSAICのID
const MOSAIC_ID = '2bb09db8269361d6';
//使用するnem chainのnetwork_generation_hash
const NETWORK_GENERATION_HASH = '249B14C178A3E7A2C8556EC3571FFAD4BAB2E71349FFD6E97A06675906EA1584';
// nem node
//const NEM_NODE_HOST = 'https://catapult-test.opening-line.jp:3001/';
const NEM_NODE_HOST = 'https://nemp2p.mosin.jp';
const host = new TransactionHttp(NEM_NODE_HOST);
const accountHttp = new AccountHttp(NEM_NODE_HOST);
const mosaicHttp = new MosaicHttp(NEM_NODE_HOST);
const address = Address.createFromRawAddress(STORE_NEM_ADDR);

export const getRemain = async (privateKey) => {
    const { address } = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    return await new Promise((resolve, reject) => {
        const parseInfo = info => {
            let mosaic = info.mosaics.filter(mosaic => mosaic.id.id.toHex() === MOSAIC_ID);
            if(mosaic.length === 0) {
                console.log('dont have mosaic!');
                resolve({remain: 0});
            }
            mosaic = mosaic[0];
            const id = mosaic.id.id;
            const amount = mosaic.amount;
            resolve({remain: amount.compact()});
        }
        accountHttp.getAccountInfo(address).subscribe(parseInfo, err => reject({err}));
    });
};

export default async (amount, message, privateKey) => {
    const transaction = TransferTransaction.create(
        Deadline.create(),
        Address.createFromRawAddress(STORE_NEM_ADDR),
        [
            new Mosaic(
                new MosaicId(MOSAIC_ID),
                UInt64.fromUint(amount)
            )
        ],
        EncryptedMessage.create(message, PublicAccount.createFromPublicKey(STORE_NEM_PUB_KEY, NetworkType.MIJIN_TEST), privateKey, NetworkType.MIJIN_TEST),
        NetworkType.MIJIN_TEST
    );

    const sender = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = sender.sign(transaction, NETWORK_GENERATION_HASH);

    const res = await new Promise((resolve, reject) => {
        const succeeded = transactions => resolve(transactions);
        const failured = err => reject(err);
        host.announce(signedTransaction).subscribe(succeeded, failured);
    }).catch(err => ({isError: true, error: err}));

    await new Promise(res => setTimeout(res, 2000));
    await new Promise((resolve, reject) => {
        console.log('checking transaction');
        host.getTransactionStatus(signedTransaction.hash).subscribe(success => resolve(console.log(success)), err => reject(console.error(err)));
    });

    console.log('returning result');
    if(res.isError) return { error: res.error };
    return { data: { res, hash: signedTransaction.hash}};
};
