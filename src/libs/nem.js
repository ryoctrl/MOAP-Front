import {
    Deadline,
    Address,
    Account,
    AccountHttp,
    Mosaic,
    MosaicId,
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

// nem node
//const NEM_NODE_HOST = 'https://catapult-test.opening-line.jp:3001/';
const NEM_NODE_HOST = process.env.REACT_APP_NEM_HOST;
const host = new TransactionHttp(NEM_NODE_HOST);
const accountHttp = new AccountHttp(NEM_NODE_HOST);

export const generateAccount = () => {
    const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
    console.log(account);
    return {
        address: account.address.address,
        publicKey: account.publicKey,
        privateKey: account.privateKey
    };
};

export const getAddress = privateKey => {
    const { address: { address }} = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    return address;
};

export const getRemain = async (privateKey, mosaicId) => {
    const { address } = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);

    return await new Promise((resolve, reject) => {
        const parseInfo = info => {
            console.log('parsing!!');
            let mosaic = info.mosaics.filter(mosaic => mosaic.id.id.toHex() === mosaicId);
            //let mosaic = info.mosaics.filter(mosaic => mosaic.id.id.toHex() === mosaicId);
            if(mosaic.length === 0) {
                console.log('dont have mosaic!');
                resolve({remain: 0});
                return;
            }
            mosaic = mosaic[0];
            const amount = mosaic.amount;
            resolve({remain: amount.compact()});
        }
        accountHttp.getAccountInfo(address).subscribe(parseInfo, err => {
            resolve({err});
        });
    });
};

export default async (amount, message, privateKey, storeAddress, storePublicKey, mosaicId, generationHash) => {
    const transaction = TransferTransaction.create(
        Deadline.create(),
        Address.createFromRawAddress(storeAddress),
        [
            new Mosaic(
                new MosaicId(mosaicId),
                UInt64.fromUint(amount)
            )
        ],
        EncryptedMessage.create(message, PublicAccount.createFromPublicKey(storePublicKey, NetworkType.MIJIN_TEST), privateKey, NetworkType.MIJIN_TEST),
        NetworkType.MIJIN_TEST
    );

    const sender = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
    const signedTransaction = sender.sign(transaction, generationHash);

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
