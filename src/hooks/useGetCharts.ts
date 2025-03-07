import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetCharts() {
    const getCharts = async () => {

        const response = await axios.get(`https://gsynergy-backend.onrender.com/chart`);

        return response.data;
    };

    return useQuery({
        queryKey: ['GET_ALL_CHARTS',],
        queryFn: getCharts,

    });
}
