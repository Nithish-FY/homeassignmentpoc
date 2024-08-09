import { create } from 'zustand';

export const useAllCategories = create<any>((set:any) => ({
	loading: true,
	allCategoriesData: [],
	allProductsByCategory: [],
	selectedProductListData: [],
	productLoading: false,
	userSelectedCategory: null,
	userSelectedProducts: [],
	finilizedData: [],
	selectedCategoryTitle: '',
	disbaledReportButton: true,
	updatedSelectedCategory: (data: any) => set(() => ({ userSelectedCategory: data })),
	updatedSelectedProducts: (data: any) => set(() => ({ userSelectedProducts: data })),
	storeData: (data: any) => set(() => ({ allCategoriesData: data, allProductsByCategory:[] })),
	updateStoreProductListData: (data: any) => set(() => ({ allProductsByCategory: data })),
	updateSelectedProductListData: (data: any) => set(() => ({ selectedProductListData: data })),
	updateFinilizedData:(data: any) => set(() => ({ finilizedData: data })),
	loader: (loading: boolean) => set(() => ({ loading: loading })),
	productLoader: (loading: boolean) => set(() => ({ productLoading: loading })),
	updateSelectedCategoryTitle: (data: string) => set(() => ({ selectedCategoryTitle: data })),
	updateDisabledButton: (disabled: boolean) => set(() => ({ disbaledReportButton: disabled })),
}));
