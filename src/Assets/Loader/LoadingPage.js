import { MoonLoader } from "react-spinners";
import React, { useState, useEffect, CSSProperties } from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
    }, [])
    return (
    < div className="loader-container">
        
        <MoonLoader
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="black"
        />
    
        </div>
    )
}

export default LoadingPage