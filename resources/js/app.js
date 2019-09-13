import React from 'react';
import BarChart from './components/barChart';
import TotalChart from './components/totalChart';
import IN_History from './components/IN_History';
import OUT_History from './components/OUT_History';
import ReactDOM from 'react-dom';

const App = () => (
	<>
		<div>
			<BarChart />
			<br/>
			<TotalChart />
			<hr/><br/><br/>
			<IN_History/>
			<hr/><br/><br/>
			<OUT_History/>
		</div>
	</>
);

ReactDOM.render(<App/>, document.getElementById('app'));