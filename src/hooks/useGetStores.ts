import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetAllStores() {
    const getStores = async () => {

        const response = await axios.get(`https://gsynergy-backend.onrender.com/stores`);

        return response.data;
    };

    return useQuery({
        queryKey: ['GET_ALL_STORES',],
        queryFn: getStores,

    });
}
