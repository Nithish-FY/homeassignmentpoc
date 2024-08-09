import { useEffect, useState } from 'react';
import useFetch from '../../hooks/api';
import { useAllCategories } from '../../store/allCategoriesStore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
	const { data, loading } = useFetch<any>('https://dummyjson.com/products/categories');
	const { allCategoriesData, storeData, loader } = useAllCategories();
 const [chartOptions, setChartOptions] = useState<any>(null)

	useEffect(() => {
		storeData(data);
		loader(loading);
	}, [data]);

	useEffect(() => {
		if (allCategoriesData?.length) {
      const tempData = allCategoriesData.map((category: { name: string }) => ({
        name: category.name,
        y: Math.floor(Math.random() * 100), // Assuming a random value for demonstration
      }))
      setChartOptions({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Product Categories',
        },
        series: [
          {
            name: 'Categories',
            colorByPoint: true,
            data: tempData,
          },
        ],
      })
		}
	}, [allCategoriesData]);


	return (
		<div style={{marginTop:'2rem'}}>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};

export default PieChart;
