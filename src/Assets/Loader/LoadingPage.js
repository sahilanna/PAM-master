import { Dimmer, Loader, } from "semantic-ui-react";
import React, { useState, useEffect } from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
    }, [])
    return (
    < div className="loader-container">
        
        <Dimmer active={loading}>
        <Loader size="small">Loading</Loader>
        </Dimmer>
    
        </div>
    )
}

export default LoadingPage