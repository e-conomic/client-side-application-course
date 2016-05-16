import React from 'react';
import { asyncTranslate, asyncGetTargets } from '../actioncreators/translationactions';

export default class Translation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        asyncGetTargets();
    }

    render() {
        return(
            <div id="translations">
                <select onChange={(event) => asyncTranslate(event.target.value, this.props.namedLists)} value="da">
                    {this.props.targets.map((target) => {
                        return (<option value={target.language}>{target.language}</option>);
                    })}
                </select>

                Translations
            </div>
        );
    }

}
Translation.propTypes = {
    namedLists: React.PropTypes.array,
    targets: React.PropTypes.array
};