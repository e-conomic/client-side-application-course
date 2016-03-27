import React, {PropTypes} from 'react';
import Message from './message';
import { changeFilter } from '../actioncreators/listfilteractions';

export default class MessageSorter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }


    render() {
        let namedLists = this.props.namedLists;
        let messages =  _.flatten(namedLists.map((namedList) => {
            if(namedList.isFiltered) {
                return [];
            } else {
                return namedList.messages;
            }
        })).sort((a, b) => {
            if(a.text > b.text) {
                return 1;
            } else if(a.text < b.text) {
                return -1;
            } else {
                return 0;
            }
        });
        return(
            <div id="message-sorter">
                <h2>Message sorter</h2>
                <div className="messages">
                    <ul>
                        {messages.map((message) => {
                            return <Message namedLists={this.props.namedLists} message={message}  />
                        })}
                    </ul>
                </div>
                <div className="sorter">
                    {this.props.namedLists.map((namedList) => {
                        return(<label>{namedList.name}<input checked={!namedList.isFiltered} onChange={(event) => changeFilter(namedList.name)} value={namedList.name} type="checkbox"/></label>);
                    })}
                </div>
            </div>
        );
    }
}
MessageSorter.propTypes = {
    namedLists: PropTypes.array
};
