import React from 'react';
import BarChart from './components/barChart';
import TotalChart from './components/totalChart';
import IN_History from './components/IN_History';
import OUT_History from './components/OUT_History';
import StockReport from './components/stockReport';
import ReactDOM from 'react-dom';

const App = () => (
	<>
		<div>
			<StockReport/>
		</div>
	</>
);

ReactDOM.render(<App/>, document.getElementById('app'));