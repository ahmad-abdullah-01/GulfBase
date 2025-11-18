import axiosInstance from "./apiClient";

export const getUserPortfolios = async (id = 0, langId = 1) => {
    const { data } = await axiosInstance.post('Portfolio/GetUserPortfolios', {
        id,
        langId
    })
    return data
}

export const createUserPortfolios = async (newPortfolioData) => {
    const { data } = await axiosInstance.post('Portfolio/SavePortfolio', newPortfolioData)
    return data
}

export const getAllCompanies = async () => {
    const { data } = await axiosInstance.post('Company/GetCompanies')
    return data
}

export const createPortfolioCompany = async (newCompanyData) => {
    const { data } = await axiosInstance.post('Portfolio/SavePortfolioCompanyies', newCompanyData)
    return data
}

export const getCurrencies = async (id, langId) => {
    const { data } = await axiosInstance.post('Portfolio/GetCurrencies', { id, langId })
    return data
}

export const getPortfolioCompanies = async (id, langId) => {
    const { data } = await axiosInstance.post('Portfolio/GetProtfolioTransactions', { id, langId })
    return data
}

export const createPortfolioTransaction = async (newTransactionData) => {
    const { data } = await axiosInstance.post('Portfolio/SavePortfolioTransactions', newTransactionData)
    return data
}

export const getPortfolioGeneralRatio = async (newRatioData) => {
    const { data } = await axiosInstance.post('Portfolio/GetGeneralRatios', newRatioData)
    return data
}

export const getPortfolioWidget = async () => {
        const { data } = await axiosInstance.post('Portfolio/GetgbWidget')
        return data
}

export const getPortfolioDashboardData = async (payLoad) => {
    const { data } = await axiosInstance.post('Portfolio/GetDashboardData', payLoad)
    return data
}