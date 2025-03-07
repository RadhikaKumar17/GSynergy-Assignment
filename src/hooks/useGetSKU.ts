import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetAllSKU() {
    const getSku = async () => {

        const response = await axios.get(`https://gsynergy-backend.onrender.com/skus`);

        return response.data;
    };

    return useQuery({
        queryKey: ['GET_ALL_SKU',],
        queryFn: getSku,

    });
}
