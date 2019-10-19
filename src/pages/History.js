import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { fetchHistory } from '../stores/actions';
import DateHelper from '../helpers/DateHelper';


class HistoryPage extends Component {
    componentWillMount() {
        this.props.dispatch(fetchHistory());
    }
    render() {
        const { classes, history: { orders } } = this.props;
        return (
            <div className={classes.wrapper}>
                <Typography align="center" variant="h5" component="h5">
                    注文履歴
                </Typography>
                <div className={classes.orders}>
                {orders.map(order => {
                    console.log(order);
                    return (
                        <div className={classes.card}key={order.id}>
                            <div className={classes.cardHeader}>
                                <div className={classes.cardId}>
                                    <span> { order.id } </span>
                                </div>
                                <div className={classes.cardTime}>
                                    <span>{ new DateHelper(order.handed_at, 'moment').date.format('HH:mm')}</span>
                                    <span>受渡</span>
                                </div>
                            </div>
                            {/*
                            <div className={classes.cardFlags}>
                                <span>{new DateHelper(order.created_at, 'moment').date.format('MM/DD HH:mm')}注文</span>
                            </div>
                            */}
                            {/*
                            <div className={classes.cardFlags}>
                                <div className={classes.paymentFlag}>
                                    <span>{ order.is_paid ? '支払い済' : '未払い'}</span>
                                </div>
                                <div className={classes.completeFlag}>
                                    <span>{ order.is_completed ? '準備済' : '準備中' }</span>
                                </div>
                            </div>
                            */}
                            <div className={classes.cardDetail}>
                                {/*
                                <Typography align="center" variant="body1" component="body1">
                                    注文商品
                                </Typography>
                                */}
                                { order.OrderItems.map( orderItem => {
                                    return (
                                    <div key={orderItem.id}className={classes.cardDetailItem}>
                                        <div className={classes.detailName}>
                                            <span>{ orderItem.Menu.name }</span>
                                        </div>
                                        <div className={classes.detailAmount}>
                                            <span>{ orderItem.amount }</span>
                                        </div>
                                        <div className={classes.detailPrice}>
                                            <span>{ orderItem.price }</span>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                            <div className={classes.totalBox}>
                                <div className={classes.totalTitle}>
                                    <span>Total</span>
                                </div>
                                <div className={classes.totalPrice}>
                                    <span>{ order.total_price }</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}


const styles = theme => ({
    orders: {
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: '100%'
        },
        border: '1px solid #cccccc',
        borderRadius: '5px',
        marginTop: '1vw',
        marginBottom: '1vw',
    },
    cardHeader: {
        display: 'flex',
    },
    cardId: {
        fontSize: '26px',
        textAlign: 'center',
        width: '50%',
    },
    cardTime: {
        fontSize: '26px',
        textAlign: 'center',
        width: '50%',

    },
    cardDetailItem: {
        display: 'flex',
        borderTop: '1px solid #cccccc',
        borderBottom: '1px solid #cccccc',
    },
    detailName: {
        width: '33%',
        textAlign: 'center',
    },
    detailAmount: {
        width: '33%',
        textAlign: 'center',
    },
    detailPrice: {
        width: '33%',
        textAlign: 'center'
    },
    totalBox: {
        display: 'flex',
    },
    totalTitle: {
        width: '66%',
        textAlign: 'center',
    },
    totalPrice: {
        width: '33%',
        textAlign: 'center',
    },
    cardFlags: {
        display: 'flex',
        textAlign: 'center',
        fontSize: '24px',
    },
    paymentFlag: {
        width: '50%',
    },
    completeFlag: {
        width: '50%',
    }
});

HistoryPage = connect(s => s)(HistoryPage);
HistoryPage = withStyles(styles)(HistoryPage);
export default HistoryPage;
