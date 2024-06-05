import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    flattenData,
    getClickCountOverTime,
    getTotalClicksOverTime,
} from '@frontend/src/utils/analytics/dataFormatting';
import { RefererData, URLData } from '@frontend/src/utils/types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type TotalClicksGraphProps = {
    urlData: URLData;
};

function TotalClicksGraph({ urlData }: TotalClicksGraphProps) {
    const getClickCountOverTimeData = getTotalClicksOverTime(urlData.analytics?.referer_data || {});

    const chartRef = useRef<any>(null);

    const data = {
        labels: Object.keys(getClickCountOverTimeData),
        datasets: [
            {
                label: 'Total Clicks',
                data: Object.values(getClickCountOverTimeData),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options: any = {
        animation: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 1,
                },
            },
        },
    };

    useEffect(() => {
        return () => {
            // Clean up chart instance when component is unmounted
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    });

    console.log(getClickCountOverTime(urlData.analytics?.referer_data || {}));
    console.log(getTotalClicksOverTime(urlData.analytics?.referer_data || {}));
    return <Line ref={chartRef} data={data} options={options} />;
}

export default TotalClicksGraph;
