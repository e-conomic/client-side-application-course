var OptionsStore = require("../Stores/options-store");
var OptionsActions = require("../Actions/options-actions");
var React = require("react");

var Options = React.createClass({
    render: function() {
        var options = OptionsStore.get();
        
        return  <div>
                    <label>Show combined messages</label>
                    <input type="checkbox" value={options.showCombinedMessages} onChange={this.handleChange} />
                </div>
    },
    
    handleChange: function(event) {
        OptionsActions.updateOptions(!event.target.value);
    }
});

module.exports = Options;