import useRouteElement from './useRouteElement'
// React Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const element = useRouteElement()
  return (
    <div>
      {element}
      <ToastContainer />
    </div>
  )
}

export default App
