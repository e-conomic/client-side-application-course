import React, {Component}  from 'react';
import ListDropDown from './ListDropDown'
let MessageActions = require('../actions/message-actions')
let ListStore = require('../stores/list-store')


class ListDropdownContainer extends Component {

        state = {
                lists: ListStore.getAll(),
                targetListId: 0
        }

        componentDidMount() {
            ListStore.addChangeListener(this.onChange);
        }

        componentWillUnmount() {
            ListStore.removeChangeListener(this.onChange);
        }

        render() {
            return  <ListDropDown lists={this.state.lists} handleChange={this.handleChange.bind(this)} moveMessage={this.moveMessage.bind(this)} />;
        }
        moveMessage() {
            MessageActions.moveMessage(this.props.message, this.state.targetListId)
        }
        handleChange(event) {
            this.setState({targetListId: parseInt(event.target.value)});
        }
        onChange = () => {
                this.setState({
                    lists: ListStore.getAll()
                });
        }
}

export default ListDropdownContainer;