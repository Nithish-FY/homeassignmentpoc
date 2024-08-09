import React from 'react';
import './App.css';
import PieChart from './components/pieChart';
import SideBar from './components/sideBar';
import BarChart from './components/barChat';
import { useAllCategories } from './store/allCategoriesStore';

function App() {
	const { finilizedData } = useAllCategories();
	return (
		<div className='App'>
			<header className='App-header appRow'>
				<div className="w-20">
				<SideBar />
				</div>
				<div className="w-80">
				{finilizedData?.length ? <BarChart /> : <PieChart />}
				</div>
			</header>
		</div>
	);
}

export default App;
