import React, { useContext, createContext, useState } from "react"

const PortfolioContext = createContext()

export const PortfolioProvider = ({ children }) => {
  const [activePortfolio, setActivePortfolio] = useState(null)

  return (
    <PortfolioContext.Provider value={{ activePortfolio, setActivePortfolio }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
