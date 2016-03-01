import React from 'react';
import NamedList from './namedlist.jsx';
import NamedListForm from './namedlistform.jsx';
import ListStore from '../stores/liststore.js';

export default class MainList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidUpdate() {
        console.log('data:', ListStore.getAll());
    }

    componentDidMount() {
        ListStore.addChangeListener(() => this.setState(ListStore.getAll()));
    }

    render() {
        var lists = [];
        for (var key in this.state) {
            if(this.state.hasOwnProperty(key)) {
                lists.push(<li><NamedList name={key} messages={this.state[key]}
                                          swap={this.swap} archiveMessage={this.archiveMessage}
                                          deleteMessage={this.deleteMessage} swapMessage={this.swapMessage}/></li>);
            }
        }
        return (
            <div>
                <h3>Assignment 3</h3>

                <div>
                    <h4>Create list:</h4>
                    <NamedListForm />
                </div>
                <div>
                    <h4>Lists:</h4>
                    <ul>
                        {lists}
                    </ul>
                </div>
            </div>
        );
    }
}