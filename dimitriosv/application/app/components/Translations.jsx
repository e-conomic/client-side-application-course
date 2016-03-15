var React = require('react');
var ReactDOM = require('react-dom');



var Translations = React.createClass({
        getInitialState: function() {
            return {
                    languages:[1,2,3]
                };
        },
        renderLanguagesOptions: function() {  return function(language,i) {
                return (
                     <option key={language+i} value={language}>{language}</option>
                );
            }
        },
        render: function() {
            return  <div className="translationscont">
                        <select className="languagesselect" defaultValue="0">
                                <option key="0" value="0"  >Select language:</option>
                                {this.state.languages.map(this.renderLanguagesOptions())}
                        </select>
                    </div>
        },
        handleMessageChange: function(evt) {
            this.setState({
              inputMessageName: evt.target.value
          });
        }
    })


module.exports = Translations;