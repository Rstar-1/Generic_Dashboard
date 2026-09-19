import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../components/common/generic/ScrollToTop'
import Cursor from '../components/common/animation/Cursor'
import { ToastContainer } from '../components/common/Toast'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Cursor />
            <AppRoutes />
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App

