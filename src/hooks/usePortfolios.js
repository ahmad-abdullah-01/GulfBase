import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getUserPortfolios,
    getPortfolioWidget,
    getPortfolioDashboardData,
    createUserPortfolios,
    getAllCompanies,
    createPortfolioCompany,
    getCurrencies,
    getPortfolioCompanies,
    createPortfolioTransaction,
    getPortfolioGeneralRatio
} from "../services/userPortfolios";

export const useUserPortfolios = (id, langId) => {
    return useQuery({
        queryKey: ['userPortfolios', id, langId],
        queryFn: () => getUserPortfolios(id, langId)
    })
}

export const useCreateUserPortfolios = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newPortfolioData) => createUserPortfolios(newPortfolioData),
        onSuccess: () => queryClient.invalidateQueries(['userPortfolios'])
    })
}

export const useCreatePortfolioCompanies = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newCompanyData) => createPortfolioCompany(newCompanyData),
        onSuccess: () => queryClient.invalidateQueries(['portfolioCompanies'])
    })
}

export const useAllCompanies = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: getAllCompanies
    })
}

export const useCurrencies = (id, langId) => {
    return useQuery({
        queryKey: ['currencies', id, langId],
        queryFn: () => getCurrencies(id, langId)
    })
}

export const usePortfolioCompanies = (id, langId) => {
    return useQuery({
        queryKey: ['portfolioCompanies', id, langId],
        queryFn: () => getPortfolioCompanies(id, langId)
    })
}

export const useCreatePortfolioTransactions = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newTransactionData) => createPortfolioTransaction(newTransactionData),
        onSuccess: () => queryClient.invalidateQueries(['portfolioCompanies'])
    })
}

export const usePortfolioGeneralRatio = (newData) => {
    return useQuery({
        queryKey: [
            'generalRatio',
            newData?.portfolioId,
            newData?.flag,
            newData?.langId,
            newData?.portfolioName,
        ],
        queryFn: () => getPortfolioGeneralRatio(newData),
        enabled: !!newData?.portfolioId,
    });
};

export const usePortfolioWidget = () => {
    return useQuery({
        queryKey: ['widgets'],
        queryFn: getPortfolioWidget,
    });
};

export const usePortfolioDashboardData = (payLoad, options = {}) => {
    return useQuery({
        queryKey: ['portfolioDashboard', payLoad?.portfolioId, payLoad?.type],
        queryFn: () => getPortfolioDashboardData(payLoad),
        enabled: !!payLoad?.portfolioId && !!payLoad?.type,
        ...options,
    });
};