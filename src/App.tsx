import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
// React Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const element = useRouteElement()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLocalStorage', reset)
    }
  }, [reset])

  return (
    <div>
      {element}
      <ToastContainer limit={1} />
    </div>
  )
}

export default App
