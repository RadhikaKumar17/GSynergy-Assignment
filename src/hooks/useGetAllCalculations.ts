import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetAllCalculations() {
    const getCalculations = async () => {

        const response = await axios.get(`https://gsynergy-backend.onrender.com/calculations`);

        return response.data;
    };

    return useQuery({
        queryKey: ['GET_ALL_CALCULATIONS',],
        queryFn: getCalculations,

    });
}
