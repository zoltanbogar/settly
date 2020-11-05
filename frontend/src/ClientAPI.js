import axios from 'axios';

export const onLoadClients = async myCancelToken => {
    try {
        const { data } = await axios.get(`/get-all-clients`, {
            cancelToken: myCancelToken,
        });
        return data;
    } catch (error) {
        throw error;
    }
};