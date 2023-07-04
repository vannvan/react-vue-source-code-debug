import { useEffect, useState } from 'react'
// 验证state和effect的调用链路

const StateEffect = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      console.clear()
    }, 3000)
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>加1</button>
    </div>
  )
}

export default StateEffect
