
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import InputPage from './pages/InputPage'
import RunPage from './pages/RunPage'
import DebatePage from './pages/DebatePage'
import JudgePage from './pages/JudgePage'
import SingleAIPage from './pages/SingleAIPage'
import ReportPage from './pages/ReportPage'
import ChartsPage from './pages/ChartsPage'
import ExportPage from './pages/ExportPage'
import HistoryPage from './pages/HistoryPage'
import FilePage from './pages/FilePage'
import SettingsPage from './pages/SettingsPage'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage/>} />
          <Route path="/input" element={<InputPage/>} />
          <Route path="/run" element={<RunPage/>} />
          <Route path="/debate" element={<DebatePage/>} />
          <Route path="/judge" element={<JudgePage/>} />
          <Route path="/single" element={<SingleAIPage/>} />
          <Route path="/report" element={<ReportPage/>} />
          <Route path="/charts" element={<ChartsPage/>} />
          <Route path="/export" element={<ExportPage/>} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/files" element={<FilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/final" element={<ReportPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
