import React from 'react';
import MainList from './mainlist';
import MessageSorter from './messagesorter';
import ListStore from '../stores/liststore';
import ListFilterStore from '../stores/listfilterstore';
import TranslationStore from '../stores/translationstore';
import NotificationBar from './notificationbar';
import ErrorStore from '../stores/errorstore';
import Translation from './translation';
import _ from 'lodash';
import { dismissMessage } from '../actioncreators/erroractions';

export default class Container extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            namedListDictionary: {},
            listFilter: [],
            message: {
                text: "",
                isError: false,
                isDismissed: true
            },
            translationOptions: {
                targets: [],
                disabled: true
            }
        };
    }

    componentDidMount() {
        ListStore.addChangeListener(() => this.setState({
            namedListDictionary:ListStore.getAll()
        }));
        ListFilterStore.addChangeListener(() => this.setState({
            listFilter: ListFilterStore.getListFilter()
        }));
        ErrorStore.addChangeListener(() => this.setState({
            message: ErrorStore.getMessage()
        }));
        TranslationStore.addChangeListener(() => this.setState({
            translatedListDictionary: TranslationStore.getAll(),
            translationOptions: TranslationStore.getOptions()
        }));
    }

    render() {
        var listFilter = this.state.listFilter;
        var namedLists = [];
        for (var namedList in this.state.namedListDictionary) {
            if(this.state.namedListDictionary.hasOwnProperty(namedList)) {
                namedLists.push({
                    name: namedList,
                    messages: this.state.namedListDictionary[namedList],
                    isFiltered: listFilter.findIndex((filter) => { return filter === namedList}) > -1
                });
            }
        }

        var message = this.state.message;
        console.log('targets:', this.state.translationOptions.targets);

        return(
            <div id="container">
                {!this.state.message.isDismissed &&
                    <NotificationBar onDismissed={() => {dismissMessage()}} isError={message.isError} message={message.text} />
                }
                <Translation targets={this.state.translationOptions.targets} namedLists={namedLists} />
                <MainList namedLists={namedLists} />
                <MessageSorter namedLists={namedLists} />
            </div>
        );
    }
}
Container.propTypes = {

};