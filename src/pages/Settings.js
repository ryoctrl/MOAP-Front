import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Typography
} from '@material-ui/core';

class Settings extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <Typography align="center" variant="h5" component="h5">
                    設定
                </Typography>
                <div>
                    <Typography align="left" variant="body1" component="body1">
                        学籍番号
                    </Typography>
                    <Typography align="center" variant="body2" component="body2">
                        Your number.
                    </Typography>
                </div>
                <div>
                    <Typography align="left" variant="body1" component="body1">
                        秘密鍵
                    </Typography>
                    <Typography align="center" variant="body2" component="body2">
                        {user.privateKey.substr(0, 6)}*******************
                    </Typography>
                </div>
                <div>
                    <Typography align="left" variant="body1" component="body1">
                        性別
                    </Typography>
                    <Typography align="center" variant="body2" component="body2">
                        {user.sex}
                    </Typography>
                </div>


            </div>
        )
    }
}

export default connect(s => s)(Settings);
