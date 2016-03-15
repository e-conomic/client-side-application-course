import React from 'react';
import MainList from './mainlist';
import MessageSorter from './messagesorter';
import ListStore from '../stores/liststore.js';

export default class Container extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };
        this.propTypes = {

        }
    }

    componentDidMount() {
        ListStore.addChangeListener(() => this.setState(ListStore.getAll()));
    }

    render() {
        var namedLists = [];
        for (var key in this.state) {
            if(this.state.hasOwnProperty(key)) {
                namedLists.push({
                    name: key,
                    messages:this.state[key]
                });
            }
        }

        return(
            <div id="container">
                <MainList namedLists={namedLists}  />
                <MessageSorter messages={namedLists} />
            </div>
        );

    }
}