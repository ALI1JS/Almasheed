import React from 'react'
import { useParams } from 'react-router-dom'

export default function Customer() {
  const param = useParams()
  const id = param.customerId
  return (
    // <div>{id}</div>
    <div></div>
  )
}
