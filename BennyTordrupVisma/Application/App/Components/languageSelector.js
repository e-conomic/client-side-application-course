var OptionsActions = require("../Actions/options-actions");
var MessageActions = require("../Actions/message-actions");
var React = require("react");

var LanguageSelector = React.createClass({
   render: function() {
       var langaugeList = this.props.availableLanguages.map(lang => <option key={lang.iso639_1} value={lang.iso639_1}>{lang.name}</option>)
        
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