import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import { SEX_TYPE } from '../../constants/user';
import connectUser from '../../connectors/userConnector';

class InitializeModal extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            sex: user.sex,
            studentNumber: user.studentNumber
        };
    }

    changeSex = event => {
        const { target: { value: sex } } = event;
        this.setState({sex});
    }

    changeStudentNumber = event => {
        const { target : { value: studentNumber }} = event;
        this.setState({ studentNumber });
    }

    save = () =>  {
        this.props.setUserInfo(this.state.sex, this.state.studentNumber);
    }

    render() {
        const { classes, user, page } = this.props;
        return (
            <Dialog open={!user.initialized}>
                <DialogTitle>初期設定</DialogTitle>
                <DialogContent>
                    <RadioGroup 
                        className={classes.gender}
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
                        id="studentNumber"
                        label="学籍番号"
                        onChange={this.changeStudentNumber}
                        fullWidth/>
                </DialogContent>
                { page.errorMessage.startsWith('INIT') &&
                    <Typography className={classes.errorMessage} >
                        { page.errorMessage.replace('INIT', '')}
                    </Typography>
                }
                <DialogActions>
                    <Button onClick={this.save} color="primary">
                        保存
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const styles = theme => ({
    gender: {
        display: 'flex',
        flexDirection: 'row'
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    }
});

InitializeModal = withStyles(styles)(InitializeModal);
export default connectUser(InitializeModal);
