import { FadeLoader } from "react-spinners";
import React, { useState, useEffect, CSSProperties } from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
    }, [])
    return (
    < div className="loader-container">
        
        <FadeLoader
            loading={loading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="black"
        />
    
        </div>
    )
}

export default LoadingPage