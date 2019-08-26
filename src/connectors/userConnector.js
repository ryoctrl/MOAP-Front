import { connect } from 'react-redux';

import * as userActions from '../stores/reducers/user';

const mapStateToProps = store => ({user: store.user});
const mapDiaptchToProps = dispatch  => ({
    setSex:  sex => dispatch(userActions.setSex(sex)),
    setPrivateKey: privateKey => dispatch(userActions.setPrivateKey(privateKey)),
    setUserInfo: (sex, privateKey) => dispatch(userActions.setUserInfo({sex, privateKey}))
})

export default connect(mapStateToProps, mapDiaptchToProps);
