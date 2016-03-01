import React from 'react';
import ListStore from '../stores/liststore.js';
import { createList } from '../actioncreators/listactions.js';

export default class NamedListForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    onSubmit(event) {
        createList(this.state.name);
        this.setState({
            name: ""
        });
    }

    render() {
        return (
            <div>
                <input value={this.state.name} onChange={this.onChange}/>
                <button onClick={this.onSubmit}>Submit list</button>
            </div>
        );
    }
} 
