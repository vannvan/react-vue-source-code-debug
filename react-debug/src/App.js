import { useEffect, useState, React, useLayoutEffect, useContext, createContext } from 'react';
// import * as React from 'react';
import './App.css';
import Button from './APP2';
import Childs from './App3';
import { Routes, Route, UNSAFE_NavigationContext, useNavigate, useNavigation, Link, Navigate } from 'react-router-dom'
import App4 from './App4';
import StateEffect from './State-Effect'
const Nav = createContext(null)
export { Nav }
function App() {
  console.log('APP render all')
  const { navigator } = useContext(UNSAFE_NavigationContext)
  console.warn(navigator)
  const wrap = (nav) => {
    const history = nav
    const push = nav.push
    history.blockTasks = []
    history.block = (fn) => {
      history.blockTasks.push(fn)
      window.addEventListener('beforeunload', (e) => {
        e.preventDefault()
        e.returnValue = ''
        fn()
      })
      window.addEventListener('popstate', () => {
        fn()
      })
      return () => (history.blockTasks = history.blockTasks.filter((val) => val !== fn))
    }
    history.push = function (...args) {
      if (history.blockTasks.length) {
        history.blockTasks.forEach((fn) => {
          fn(() => push(...args))
        })
      } else {
        push(...args)
      }
    }
    return history
  }
  // const go = useNavigate()
  const [state, set] = useState('i am one state')
  const [s2, set2] = useState('i am two state')
  const fn = function () {
    set(Math.random())
    set2(Math.random())
  }
  const async = () => {
    setTimeout(() => {
      set(Math.random())
    }, 300)
    setTimeout(() => {
      set2(Math.random())
    }, 301)
  }
  const fs = () => {
    set(Math.random())
  }
  const fac = () => {
    set(Math.random())
  }
  useEffect(() => {
    // 下面节点需要开启
    // document.getElementById('dom').addEventListener('click', () => {
    //   set(Math.random())
    //   set2(Math.random())
    // })
    console.log('log: app effect')
    // set(1)
  }, [])
  useLayoutEffect(() => {
    console.log('log： app layouteffect')
    return () => {
      console.log('destory layout')
    }
  }, [])

  return (
    <>
      <Nav.Provider value={{ history: wrap(navigator) }}>
        <Routes>
          <Route path="/sa" element={<p>说我是sa</p>}>
            <Route path="sd" element={<p>我是sd</p>}></Route>
          </Route>
          <Route path="/s" element={<Button fn={fn}></Button>}>
            <Route path="b" element={<p>我是sb</p>}></Route>
          </Route>
          <Route path="/app4" element={<App4 />}></Route>
          <Route path="/stateEffect" element={<StateEffect />}></Route>
        </Routes>
        {/* <div className="App" onKeyDown={fac}>
          <Link to={'/s/b'}>s/b</Link>
          <hr />
          <Link to={'/sa'}>sa</Link>
          <hr />
          <Link to={'/s'}>s</Link>
          <hr />
          <Link to={'/sa/sd'}>sa/sd</Link>
          <hr />
          <Link to={'/app4'}>App4</Link>
        </div> */}
      </Nav.Provider>
      {/* <button id={'dom'}>按钮原生事件</button>
      <button onClick={async}>按钮异步事件</button>
      <input value={s2} onFocus={fs} onChange={(e) => set2(e.target.value)} onKeyDown={fs}></input> */}
    </>
  )
}

export default App;
