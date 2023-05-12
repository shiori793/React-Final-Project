import './App.css'
import Header from './Component/Header';
import Kana from './Component/Kana';
import { useSelector } from 'react-redux'
// import AddModal from './Component/AddModal';
// import EditModal from './Component/EditModal';
import UpdateModal from './Component/UpdateModal';
import { Container } from 'reactstrap';

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 6fr',
}

function App() {

  const searchList = useSelector((state) => state.kana.searchList);

  return (
    <div className='App'>
      <Header />
      <div className='main'>
        {
          Object.keys(searchList).length > 0 ?
            Object.keys(searchList).map(
              kana => 
                <Container key={kana} style={containerStyle}>
                  <h1>{kana}</h1>
                    <Kana kana={searchList[kana]}/>
                </Container>
            )
            :
            <Container>
              <h1>No Data</h1>
            </Container>
        }
      </div>
      {/* <AddModal />
      <EditModal /> */}
      <UpdateModal />
    </div>
  )
}

export default App
