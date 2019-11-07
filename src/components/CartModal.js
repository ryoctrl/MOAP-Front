import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
    Button, 
    Typography, 
    Dialog, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Avatar, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText,
    CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
    postOrder,
    closeCart,
    performPayment,
    interruptOrder
} from '../stores/actions';

import { amountToStr } from '../helpers/AmountHelper';

import ORDER_TYPES from '../constants/orderType';

const API_HOST = process.env.REACT_APP_API_HOST;
const IMAGE_PATH = API_HOST + 'images/';


class CartModal extends Component {
    closeModal() {
        this.props.dispatch(closeCart());
        this.props.dispatch(interruptOrder());
    }

    submitOrder() {
        this.props.dispatch(postOrder());
    }

    performPayment() {
        const { order, dispatch } = this.props;
        dispatch(performPayment(order.order));
    }

    getTitle() {
        const { order } = this.props;
        switch(order.orderState) {
            case ORDER_TYPES.ORDER:
                return 'カート';
            case ORDER_TYPES.PAYMENT:
                return '支払い';
            case ORDER_TYPES.PAYMENTED:
                return 'Thank you!';
            default:
                return 'カート';
        }
    }

    renderOrderContent() {
        const { classes, cart, menu } = this.props;
        const cartList = cart.list.map(cartMenu => {
            const cartMenuObj = menu.list.filter(m => m.id === cartMenu.id);
            return Object.assign({}, cartMenu, cartMenuObj[0]);
        });

        let totalPrice = cartList.reduce((sum, cart) => sum + (cart.amount * cart.price), 0);

        const isEmpty = cartList.length === 0;

        return (
            <div>
                { isEmpty && <Typography className={classes.center}>商品をカートに入れてください</Typography>}
                <List className={classes.fullWidth}>
                    { cartList.map(item => {
                        let img;
                        if(!item.image) img = '/img/no-image.svg';
                        else img = IMAGE_PATH + item.image;
                        return (
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={img} className={classes.avatar}/>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={item.name} 
                                    secondary={`${item.amount}コ ${item.amount * item.price}円`} />
                            </ListItem>
                        )
                    })}
                </List>
                <hr></hr>
                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        noWrap={true}
                        className={classes.rowTitle}>
                        合計金額
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        { amountToStr(totalPrice) } 円
                    </Typography>
                </div>

                <Button 
                    onClick={this.submitOrder.bind(this)}  
                    className={classes.fullWidth}
                    disabled={isEmpty}>
                    決済画面へ
                </Button>
            </div>
        )
    }

    renderPaymentContent() {
        const { classes, user: { remain, remainStr }, order: { order: { total_price: totalPrice}, isPaymenting }} = this.props;
        const afterRemain = remain - totalPrice;
        const canPayment = afterRemain >= 0;
        return (
            <div>
                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        className={classes.rowTitle}>
                          合計  
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        {totalPrice}円
                    </Typography>
                </div>
                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        className={classes.rowTitle}>
                          残高  
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        {remainStr}円
                    </Typography>
                </div>
                <hr></hr>
                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        noWrap={true}
                        className={classes.rowTitle}>
                        決済後残高
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        { amountToStr(afterRemain) } 円
                    </Typography>
                </div>
                <Button 
                    onClick={this.performPayment.bind(this)} 
                    disabled={!canPayment || isPaymenting}
                    className={classes.fullWidth}>
                    { isPaymenting ? '決済中...' : '支払う'}
                </Button>
                { isPaymenting && 
                    <div className={classes.loadingCircle}>
                        <CircularProgress />
                    </div>
                }
            </div>
        )
    }

    renderPaymentedContent() {
        const { classes, order: { order, requiredMinute, handedTime }} = this.props;
        /*
        const getRequiredMinutes = menuItem => menuItem.Menu.required_time * menuItem.amount;
        const requiredMinutes = order.order.OrderItems.map(getRequiredMinutes);
        const requiredMinute = Math.max(requiredMinutes);
        const handedTime = new DateHelper().getAfter('minutes', requiredMinute);
        */
        //const requiredMinute = order
        //const handedTime = order.handedTime;
        return (
            <div>
                <Typography 
                    className={classes.center}>
                    ご利用ありがとうございました。
                </Typography>
                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        noWrap={true}
                        className={classes.rowTitle}>
                        受渡可能時刻
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        {handedTime}
                    </Typography>
                </div>

                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        noWrap={true}
                        className={classes.rowTitle}>
                        所要時間
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        {requiredMinute}分
                    </Typography>
                </div>
                <div className={classes.row}>
                    <DialogContentText 
                        align='left'
                        noWrap={true}
                        className={classes.rowTitle}>
                        注文ID
                    </DialogContentText>
                    <Typography 
                        align='right' 
                        className={classes.rowContent}>
                        {order.id}
                    </Typography>
                </div>

                <Typography>
                    受取時には学生証をお持ちください。
                </Typography>

                <Button 
                    onClick={this.closeModal.bind(this)} 
                    className={classes.fullWidth}>
                    Close
                </Button>
            </div>
        )
    }

    renderContent() {
        const { order } = this.props;
        switch(order.orderState) {
            case ORDER_TYPES.ORDER:
                return this.renderOrderContent();
            case ORDER_TYPES.PAYMENT:
                return this.renderPaymentContent();
            case ORDER_TYPES.PAYMENTED:
                return this.renderPaymentedContent();
            default:
                return this.renderOrderContent();
        }
    }

    render() {
        const { classes, cart } = this.props;

        return (
            <Dialog 
                open={cart.isOpen} 
                onClose={this.closeModal.bind(this)} 
                className={classes.dialog}>
                <div className={classes.dialogCard}>
                    <DialogTitle className={classes.dialogTitle}>{this.getTitle()}</DialogTitle>
                    <DialogContent>
                        {this.renderContent()}
                    </DialogContent>
                </div>
            </Dialog>
        );
    }
}

const styles = theme => ({
    avatar: {
        display: 'inline-block',
        width: 40,
        height: 40
    },
    info: {
        lineHeight: '40px',
    },
    dialogCard: {
        [theme.breakpoints.down('md')]: {
            minWidth: '50vw',
        },
        [theme.breakpoints.up('md')]: {
            minWidth: '25vw'
        },
        flex: 1,
    },
    dialogTitle: {
        textAlign: 'center',
    },
    center: {
        textAlign: 'center',
    },
    fullWidth: {
        width: '100%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    rowTitle: {
        flexGrow: 1
    },
    rowContent: {
        flexGrow: 1
    },
    loadingCircle: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
    }
});

CartModal = connect(s => s)(CartModal);
CartModal = withStyles(styles)(CartModal);
export default CartModal;
