import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({to}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
    <div>Redirect</div>
  )
}

export default Redirect