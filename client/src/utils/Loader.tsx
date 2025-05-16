import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const Loader = () => {
  return (
    <div className='flex item-center justify-center'>
      <FaSpinner className='animate-spin text-white text-2xl' />
    </div>
  )
}

export default Loader
