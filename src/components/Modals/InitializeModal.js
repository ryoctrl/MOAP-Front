import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import { SEX_TYPE } from '../../constants/user';
import connectUser from '../../connectors/userConnector';

class InitializeModal extends Component {
    state = {
        sex: SEX_TYPE.NONE,
        privateKey: '',
    }

    changePrivateKey = ({target: { value: privateKey }})=> this.setState({privateKey})

    save = () => this.props.setUserInfo(...this.state)

    render() {
        const { user } = this.props;
        return (
            <Dialog open={!user.initialized}>
                <DialogTitle>初期設定</DialogTitle>
                <DialogContent>
                    <RadioGroup 
                        name="gender"
                        value={user.sex}
                        onChange={this.changeSex}>
                        <FormControlLabel
                            value={SEX_TYPE.FEMALE}
                            control={<Radio color="primary"/>}
                            label="女"
                            labelPlacement="start"
                            />
                        <FormControlLabel
                            value={SEX_TYPE.FEMALE}
                            control={<Radio color="primary"/>}
                            label="女"
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
