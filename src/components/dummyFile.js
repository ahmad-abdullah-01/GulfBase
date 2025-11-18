import { useEffect } from "react"

const getCountries = async () => {
    try {
        const res = await fetch('dummy', {}).then(res => res.json())
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
}

useEffect(() => {
    getCountries()
}, [])