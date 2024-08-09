import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useAllCategories } from '../../../store/allCategoriesStore';

export default function CategoriesList() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any>([]);

    const {
        allCategoriesData,
        loading,
        updateStoreProductListData,
        productLoader,
        updateSelectedProductListData,
        updatedSelectedCategory,
        updatedSelectedProducts,
        userSelectedCategory,
        updateSelectedCategoryTitle,
        updateDisabledButton
    } = useAllCategories();

    const getProductsBasedOnCategory = async (category: string) => {
        productLoader(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            updateSelectedProductListData(data?.products);
            updateStoreProductListData(data?.products);
            productLoader(false);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    React.useEffect(() => {
        if (allCategoriesData?.length && !loading) {
            setOptions([...allCategoriesData]);
        }
    }, [allCategoriesData]);

    React.useEffect(() => {
        updatedSelectedCategory(null);
    }, []);

    return (
        <div style={{ margin: '1rem 10px' }}>
            <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                value={userSelectedCategory || null}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(event, newValue: any) => {
                    console.log(event, newValue)
                    if (newValue !== null) {
                        updateDisabledButton(false);
                        updatedSelectedCategory(newValue);
                        updateSelectedCategoryTitle(newValue.slug)
                        getProductsBasedOnCategory(newValue.slug);
                    } else {
                        updateDisabledButton(true);
                        updatedSelectedCategory(newValue);
                        updateSelectedProductListData([]);
                        updateStoreProductListData([]);
                        updatedSelectedProducts([]);
                    }
                }}
                isOptionEqualToValue={(option: any, value) => value === null || option.name === value.name}
                getOptionLabel={(option: any) => option ? option.name : ''}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Category"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
}
