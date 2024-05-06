import React from 'react'

const ConfessCard = ({description}) => {
  return (
    <div className='max-h-fit
          bg-white font-thin text-[1.4rem] p-[2rem] rounded-md '>
      <p className='bg-sky-900 p-[10px] text-white rounded-full'>{description}</p>
    </div>
  )
}

export default ConfessCard
