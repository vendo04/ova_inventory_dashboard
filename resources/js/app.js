import React from 'react';
import IN_History from './components/IN_History';
import OUT_History from './components/OUT_History';
import ReactDOM from 'react-dom';

const App = () => (
	<>
		<div>
			<IN_History/>
			<br/>
			<OUT_History/>
		</div>
	</>
);

ReactDOM.render(<App/>, document.getElementById('app'));