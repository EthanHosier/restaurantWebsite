"use client";

import React from 'react'
import handleSmoothScroll from "util/handleSmoothScroll.js"

const SmoothScrollButton = ({target,title}) => {
  return (
    <button className='bg-accent rounded text-tsecondary p-4 px-7 text-xl font-semibold mb-12' onClick={() => handleSmoothScroll(target)}>{title}</button>
  )
}

export default SmoothScrollButton