import React from 'react';
import NamedList from './namedlist.jsx';
import NamedListForm from './namedlistform.jsx';

export default class MainList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div id="main-list">
                <h2>Main List</h2>
                <div>
                    <h4>Create list:</h4>
                    <NamedListForm />
                </div>
                <div>
                    <h4>Lists:</h4>
                    <ul>
                        {this.props.namedLists.map((namedList, index, array) => {
                            return (<li><NamedList namedList={namedList} namedLists={this.props.namedLists}/></li>);
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}