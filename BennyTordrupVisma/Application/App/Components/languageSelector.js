var OptionsActions = require("../Actions/options-actions");
var MessageActions = require("../Actions/message-actions");
var React = require("react");

var LanguageSelector = React.createClass({
   render: function() {
        var langaugeList = (this.props.availableLanguages) ? this.props.availableLanguages.map(lang => <option key={lang.language} value={lang.language}>{lang.name}</option>) : null;
        
        return  <div>
                    <label>Translate to language:</label>
                    <select onChange={this.onListSelection} value={this.props.selectedLangauge}>
                        <option key={0} value={''}>No translation</option>
                        {langaugeList}
                    </select>
                </div>
    },
    
    onListSelection: function(event) {
        var languageCode = event.target.value;
        OptionsActions.updateSelectedLanguage(languageCode);
        MessageActions.translateAllMessages(languageCode);
    },
    
});

module.exports=LanguageSelector;