import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetPlannings() {
    const getPlanning = async () => {

        const response = await axios.get(`https://gsynergy-backend.onrender.com/planning`);

        return response.data;
    };

    return useQuery({
        queryKey: ['GET_ALL_PLANNING',],
        queryFn: getPlanning,

    });
}
