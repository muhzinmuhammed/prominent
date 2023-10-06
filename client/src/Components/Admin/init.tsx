import React from 'react'

const Init = () => {
  return (
    window.global ||=window
  )
}

export default Init
