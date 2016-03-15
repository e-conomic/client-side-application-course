var OptionsActions = require("../Actions/options-actions");
var React = require("react");

var LanguageSelector = React.createClass({
   render: function() {
        // Could languages be retrieved from web?
        
        return  <div>
                    <label>Translate to language:</label>
                    <select onChange={this.onListSelection} value={this.props.selectedLangauge}>
                        <option key={0} value={''}>No translation</option>
                        <option key={1} value={'da'}>Danish</option>
                        <option key={2} value={'en'}>English</option>
                        <option key={3} value={'de'}>German</option>
                        <option key={4} value={'es'}>Spanish</option>
                    </select>
                </div>
    },
    
    onListSelection: function(event) {
        var languageCode = event.target.value;
        OptionsActions.updateSelectedLanguage(languageCode);
    },
    
});

module.exports=LanguageSelector;