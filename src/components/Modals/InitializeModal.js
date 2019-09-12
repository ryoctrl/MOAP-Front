import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import { SEX_TYPE } from '../../constants/user';
import connectUser from '../../connectors/userConnector';

class InitializeModal extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            sex: user.sex,
            privateKey: user.privateKey
        };
    }

    changeSex = ({target: { value: sex }}) => this.setState({sex})
    changePrivateKey = ({target: { value: privateKey }})=> this.setState({privateKey})

    save = () => this.props.setUserInfo(this.state.sex, this.state.privateKey)


    render() {
        const { user } = this.props;
        return (
            <Dialog open={!user.initialized}>
                <DialogTitle>初期設定</DialogTitle>
                <DialogContent>
                    <RadioGroup 
                        name="gender"
                        value={this.state.sex}
                        onChange={this.changeSex}>
                        <FormControlLabel
                            value={SEX_TYPE.FEMALE}
                            control={<Radio color="primary"/>}
                            label="女"
                            labelPlacement="start"
                            />
                        <FormControlLabel
                            value={SEX_TYPE.MALE}
                            control={<Radio color="primary"/>}
                            label="男"
                            labelPlacement="start"
                            />
                    </RadioGroup>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="privateKey"
                        label="秘密鍵"
                        onChange={this.changePrivateKey}
                        fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.save} color="primary">
                        保存
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default connectUser(InitializeModal);
