/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
    const naviagte = useNavigate();
    useEffect(()=>{
        naviagte('/login');
    },[])
  return (
    <div>
        <div className="">Loading...</div>
    </div>
  )
}

export default Loading