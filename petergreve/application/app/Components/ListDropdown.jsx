import React, {Component} from 'react';
let MessageActions = require('../actions/message-actions')
let ListStore = require('../stores/list-store')

class ListDropdown extends Component {

    static propTypes = {
        lists: React.PropTypes.array,
        moveMessage: React.PropTypes.func,
        handleChange: React.PropTypes.func
    }

    render() {
        return  (
                    <span>
                        <button type="button" onClick={this.props.moveMessage}>Move to</button>
                        <select onChange={this.props.handleChange} defaultValue='0'>
                            {this.props.lists.map(function(list,i) {
                                return <option key={i} value={list.id}  >{list.name}</option>;
                            },this)}
                        </select>
                    </span>
                )
    }
}

export default ListDropdown;