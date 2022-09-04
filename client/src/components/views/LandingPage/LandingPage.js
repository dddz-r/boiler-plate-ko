import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {

  useEffect(() => {
    axios.get('api/hello')//서버측으로 주는 엔드포인트, 서버측 index.js에 get라우터 구현
    .then(response => console.log(response.data))
  }, [])

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>LandingPage</div>
  )
}

export default LandingPage