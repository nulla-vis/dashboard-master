import React from 'react'
import DismissibleAlert from '../components/Alert'

const dashboard = ({ error, setError}) => {
  return (
    <div>
      {error && <DismissibleAlert severity={error.severity} title={error.title} message={error.message} />}
      dashboard
    </div>
  )
}

export default dashboard