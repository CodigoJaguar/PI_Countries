import { Link } from 'react-router-dom'


 function Country(props) {
   

    const {Nome, Bandiera, ID, Continente } = props
    
    

    return (
       <div>
           <Link to={`/countries/${ID}`}>
              <div className='Card'>
              <img src={Bandiera} width="150" height="150" alt={Nome} />
                <div className='StyleCard'>
                    <h1>{Nome}</h1>
                    <h3>{Continente}</h3>
                    <h3>{ID}</h3>
                </div>
              </div>
            </Link>
       </div>
    );
 }
 
 
 export default Country;