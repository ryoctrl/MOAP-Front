import { connect } from 'react-redux';

import * as userActions from '../stores/reducers/user';

const mapStateToProps = store => ({user: store.user, page: store.page });
const mapDiaptchToProps = dispatch  => ({
    setSex:  sex => dispatch(userActions.setSex(sex)),
    setPrivateKey: privateKey => dispatch(userActions.setPrivateKey(privateKey)),
    setUserInfo: (sex, studentNumber) => dispatch(userActions.initializeUserInfo({sex, studentNumber}))
})

export default connect(mapStateToProps, mapDiaptchToProps);
