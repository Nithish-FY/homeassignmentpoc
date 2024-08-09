import { useEffect, useState } from 'react';
import useFetch from '../../hooks/api';
import { useAllCategories } from '../../store/allCategoriesStore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = () => {
  const { finilizedData, selectedCategoryTitle } = useAllCategories();

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (finilizedData?.length) {
      // Assuming that `data.products` is an array of products
      const formattedData = finilizedData.map((product: any) => ({
        name: product.title,
        y: Math.round(product.price),
      }));

      setChartData(formattedData);
    }
  }, [finilizedData]);

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Products in Selected Category',
    },
    xAxis: {
      categories: chartData.map(item => item.name),
    },
    yAxis: {
      title: {
        text: selectedCategoryTitle,
      },
    },
    series: [
      {
        name: 'Price',
        data: chartData,
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}$', // Formats the price with a dollar sign and no decimals
        },
      },
    ],
  };
  
  

  return (
    <div style={{marginTop:'2rem'}}>
      {!!chartData?.length && <HighchartsReact highcharts={Highcharts} options={chartOptions} /> }      
    </div>
  );
};

export default BarChart;
