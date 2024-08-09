import React, { useState } from 'react';
import CategoreisList from './Categories/Categoreis';
import ProductsList from './Products/Products';
import { Button, CircularProgress } from '@mui/material';
import { useAllCategories } from '../../store/allCategoriesStore';

const SideBar = () => {
	const [loading, setLoading] = useState(false);

	const {
		updateFinilizedData,
		userSelectedProducts,
		selectedProductListData,
		updatedSelectedCategory,
		updateSelectedProductListData,
		updateStoreProductListData,
		updatedSelectedProducts,
		disbaledReportButton,
		updateDisabledButton
	} = useAllCategories();
	console.log(userSelectedProducts, selectedProductListData, 'userSelectedProducts😎😎😎😎😎😎😎😎😎');

	const handleSubmit = () => {
		setLoading(true);
		updateDisabledButton(true);
		setTimeout(() => {
			updateFinilizedData(selectedProductListData);
			setLoading(false);
		}, 3000);
	};

	const ClearFilters = () => {
		updatedSelectedCategory(null);
		updateSelectedProductListData([]);
		updateStoreProductListData([]);
		updatedSelectedProducts([]);
		updateFinilizedData([]);
		updateDisabledButton(true);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<h6 style={{ color: 'black', paddingLeft: '10px' }}>Filters</h6>
				<Button
					onClick={() => {
						ClearFilters();
					}}
					variant='text'>
					Clear
				</Button>
			</div>
			<CategoreisList />
			<ProductsList />{' '}
			<Button
				disabled={disbaledReportButton}
				endIcon={loading ? <CircularProgress size={20} /> : null}
				style={{ marginTop: 'auto', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}
				variant='contained'
				onClick={() => {
					handleSubmit();
				}}>
				{loading ? 'Loading...' : 'Run Report'}
			</Button>
		</div>
	);
};

export default SideBar;
