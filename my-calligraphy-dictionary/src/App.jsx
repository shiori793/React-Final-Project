import './App.css'
import Header from './Component/Header';
import Kana from './Component/Kana';
import { useSelector, useDispatch } from 'react-redux'

function App() {

  const kanaList = useSelector((state) => state.kana.kanaList)
  const searchList = useSelector((state) => state.kana.searchList)
  const showAddModal = useSelector(state => state.kana.showAddModal)
  const showEditModal = useSelector(state => state.kana.showEditModal)
  const dispatch = useDispatch()

  return (
    <>
      <Header />
      {searchList.map(kana => {

      })}
    </>
  )
}

export default App
