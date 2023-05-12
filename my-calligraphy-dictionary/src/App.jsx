import './App.css'
import Header from './Component/Header';
import Kana from './Component/Kana';
import { useSelector } from 'react-redux'
import AddModal from './Component/AddModal';
import EditModal from './Component/EditModal';
import { Container } from 'reactstrap';

function App() {

  const searchList = useSelector((state) => state.kana.searchList);

  return (
    <>
      <Header />
      {
        Object.keys(searchList).length > 0 ?
        Object.keys(searchList).map(
          kana => 
            <Container key={kana}>
              <div>{kana}</div>
                <Kana kana={searchList[kana]}/>
            </Container>
        )
        :
        <Container>
          <h1>No Data</h1>
        </Container>
      }
      <AddModal />
      <EditModal />
    </>
  )
}

export default App
