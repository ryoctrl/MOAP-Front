import React, { Component } from 'react';
import { connect } from 'react-redux';

class HistoryPage extends Component {
    render() {
        return (
            <div>
                This is History page
            </div>
        )
    }
}

export default connect(s => s)(HistoryPage);
