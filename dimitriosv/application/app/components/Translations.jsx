var React = require('react');
var ReactDOM = require('react-dom');
var TranslationStore = require('../stores/translation-store.js');
var TranslationActions = require('../actions/translation-actions.js');


var Translations = React.createClass({
        getInitialState: function() {
            return {
                    languages: TranslationStore.getLanguages(),
                    showLoader: TranslationStore.getShowLoader(),
                };
        },
        onStoreChange: function() {
            this.setState({
                languages: TranslationStore.getLanguages(),
                showLoader: TranslationStore.getShowLoader(),
            });
        },
        componentDidMount: function() {
            TranslationStore.addChangeListener(this.onStoreChange);
            TranslationActions.getAvailableLanguages();
        },
        componentWillUnmount: function() {
            TranslationStore.removeChangeListener(this.onStoreChange);
        },
        renderLanguagesOptions: function() {  return function(obj,i) {
                return (
                     <option key={"lan"+obj.language+i} value={obj.language}>{obj.language}</option>
                );
            }
        },
        traslateAll: function(e) {
            var LanguageCode=e.target.value;
            TranslationActions.translateAll(this.props.messages,LanguageCode);

        },
        cancelTranslations: function() {
            TranslationActions.cancelTranslations();
        },
        render: function() {
            return  (<div className="translationscont">
                        {this.state.showLoader
                        ? <div className="loadingLanguages">Loading....</div>
                        : <div>
                        <span>Translate:</span>
                        <select className="languagesselect" defaultValue="0" onChange={this.traslateAll}>
                                <option key="0" value="0"  >Select language:</option>
                                {this.state.languages.map(this.renderLanguagesOptions())}
                        </select>
                        <button type="button" onClick={this.cancelTranslations}>Disable</button>
                        </div>}
                    </div>)
        },
        handleMessageChange: function(evt) {
            this.setState({
              inputMessageName: evt.target.value
          });
        }
    })


module.exports = Translations;