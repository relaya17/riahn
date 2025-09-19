import { useState, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../constants';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
    execute: (config?: any) => Promise<T | null>;
    reset: () => void;
}

export const useApi = <T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
): UseApiReturn<T> => {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(
        async (config: any = {}): Promise<T | null> => {
            setState(prev => ({ ...prev, loading: true, error: null }));

            try {
                const response: AxiosResponse<T> = await axios({
                    method,
                    url: `${API_CONFIG.BASE_URL}${endpoint}`,
                    timeout: API_CONFIG.TIMEOUT,
                    ...config,
                });

                setState({
                    data: response.data,
                    loading: false,
                    error: null,
                });

                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                const errorMessage = axiosError.response?.data?.message || axiosError.message || 'שגיאה לא ידועה';

                setState({
                    data: null,
                    loading: false,
                    error: errorMessage,
                });

                return null;
            }
        },
        [endpoint, method]
    );

    const reset = useCallback(() => {
        setState({
            data: null,
            loading: false,
            error: null,
        });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
};
