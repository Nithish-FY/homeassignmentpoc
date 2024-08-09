import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAllCategories } from '../../../store/allCategoriesStore';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function ProductsList() {
	const { allProductsByCategory, updateSelectedProductListData, userSelectedCategory, updatedSelectedProducts, userSelectedProducts,updateDisabledButton } = useAllCategories();

	const handleSelectionChange = (event: any, value: any[]) => {
		if(value?.length){
			updateDisabledButton(false);
			updateSelectedProductListData(value);
			updatedSelectedProducts(value);
		} else{
			updateDisabledButton(false);
			updateSelectedProductListData(allProductsByCategory);
			updatedSelectedProducts([])
		}
		
	};

	return (
		<div style={{ margin: '1rem 10px' }}>
			<Autocomplete
				multiple
				disabled={userSelectedCategory === null}
				id='checkboxes-tags-demo'
				value={userSelectedProducts}
				options={allProductsByCategory || []}
				defaultValue={[]}
				disableCloseOnSelect
				getOptionLabel={(option: any) => option.title}
				renderOption={(props, option, { selected }) => {
					const { key, ...optionProps } = props;
					return (
						<li key={key} {...optionProps}>
							<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
							{option.title}
						</li>
					);
				}}
				style={{ width: 500 }}
				onChange={handleSelectionChange}
				renderInput={(params) => <TextField {...params} label='Select Products' placeholder='Choose products' />}
			/>
		</div>
	);
}
