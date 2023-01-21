import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Inicio from '../components/Inicio';
import NotFound from '../components/NotFound';
import { FormActivities } from '../Views/Activities/Activities';
import Detail from '../Views/CountryDetail/CountryDetail';




function App() {

  return (
    <div className="App">
     
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Inicio} />
          <Route path="/countries/:id" component={Detail} />
          <Route path="/activities" component={FormActivities} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;



      // <Route path="/country/:id" element={<CountryDetail/>}/>
      // <Route path='*' element={<NotFound/>}/>     --- lo mismo de siempre---
      // <Route path='/create-activity' element={<CreateActivity/>}/>