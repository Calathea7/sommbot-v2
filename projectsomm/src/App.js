import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import smimg from './sommbot-bckgrnd.png'

function Homepage() {
    return (
      <div
        style={{ backgroundImage: `url(${smimg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}}>
          <h3>Discover your next favorite wine with SommBot!</h3>
      </div>
    )
}
{/* <div>
        Discover your next favorite wine with SommBot!
        <img src={require('./sommbot-bckgrnd.png')} className="img-fluid" alt="Robot with wine bottles"></img>
      </div> */}
{/* <div
style={{ backgroundImage: `url('/sommbot-bckgrnd.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
</div> */}

function About() {
    return <div> Wine recommendation app </div>
}


function CreateAccount(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const CreateUser = (e) => {
    e.preventDefault()
    const fields = {
      "email":email,
      "password":password,
      "name": name
    }
    fetch('/api/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(res => res.json())
    .then((data) => {
      alert(data.message)
    })
  };
  return (
    <form>
      <div className="container">
          <div className="form-group">
            <div className="form-row justify-content-center">
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                  <input
                    id="exampleInputEmail1"
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}>
                  </input>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row justify-content-center">
              <div className="col-5">
                <label htmlFor="exampleInputName1">Name</label>
                  <input
                    id="exampleInputName1"
                    className="form-control"
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => setEmail(e.target.value)}
                    value={name}>
                  </input>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row justify-content-center">
              <div className="col-5">
                <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    id="exampleInputPassword1"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                  </input>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-outline-primary" onClick={CreateUser}> Create Profile </button>
          </div>
      </div>
    </form>
  )
}


function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userLog, setUserLog] = React.useState('')

  // const LogoutUser = (e) => {
  //   e.preventDefault()
  //   fetch('/api/logout')
  //   .then(res => res.json())
  //   .then((data) => {
  //     alert(data.message)
  //   })
  // };

  const VerifyUser = (e) => {
    e.preventDefault()
    const inputs = {
      "email": email,
      "password": password
    }
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inputs)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setLoggedIn(true);
        setUserLog(data.status);
        console.log(loggedIn);
        console.log("1logged-in?");
        console.log(userLog);
        alert(data.message);
      }
      else {
        alert(data.message);
      }
    })
  }

  if (loggedIn === true) {
    localStorage.setItem('userLog', userLog)
    console.log('2does it save to local storage?')
    console.log(localStorage.getItem('userLog'))
    return <Redirect to='/recommendation'/>
  }

  if (localStorage.getItem('userLog')) {
    console.log('if logged in already')
    console.log(localStorage.getItem('userLog'))
    alert('Already logged in!')
    return <Redirect to='/recommendation'/>
  }


  return (
    <form>
      <div className="container">
          <div className="form-group">
            <div className="form-row justify-content-center">
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                  <input
                    id="exampleInputEmail1"
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}>
                  </input>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row justify-content-center">
              <div className="col-5">
                <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    id="exampleInputPassword1"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                  </input>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-outline-primary" onClick={VerifyUser}> Log In </button>
            {/* <button className="btn-outline-primary" onClick={LogoutUser}> Log Out </button> */}
          </div>
      </div>
    </form>
  )
}


function MapContainer(props) {
  const [options, setOptions] = React.useState({
    center: { lat: 38.297539, lng: -122.286865},
    zoom: 10
  });

  const mapDimensions = {
    width: '200px',
    height: '800px'
  }

  function placeMarkers(map, data) {
    for (let i = 0; i < data.length; i++) {
      const wineMarker = new window.google.maps.Marker({
        map: map,
        position: {
          lat: parseFloat(data[i]['lat']),
          lng: parseFloat(data[i]['lng'])
        },
        title: data[i]['wine_title'],
      })
    }
  }

  return (
    <div id = "google-map-container">
      <MapBuilder
      options={options}
      mapDimensions={mapDimensions}
      onMountProps={props.data}
      onMount={placeMarkers}
    />
    </div>
  )
}


function MapBuilder(props) {
  const [myMap, setMyMap] = React.useState();
  const options = { center: {lat: 38.297539, lng: -122.286865}, zoom: 10 };
  const mapRef = React.useRef();

  React.useEffect(() => {
    const createMap = () => setMyMap(new window.google.maps.Map(mapRef.current, options));

    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTVa4w0Bjwaq6azDxGnnPoZhZ7lgcM-L8&libraries=places';
      document.head.append(googleMapScript);
      googleMapScript.addEventListener('load', createMap);
      return () => googleMapScript.removeEventListener('load', createMap);
    } else {
      createMap();
    }
  }, []);

  if (myMap && typeof props.onMount === `function`){props.onMount(myMap, props.onMountProps)}

  return (
    <div
      id="google-map-div"
      ref={mapRef}
      style={{ width: '400px', height: '400px' }}
    >
    </div>
  )
}


function UserProfile(props) {

  const [savedRecs, setSavedRecs] = React.useState(["loading..."]);
  const [wineData, setWineData] = React.useState([])

  React.useEffect(() => {
    // fetch('/api/user-profile')
    fetch('/api/latlng-wines')
    .then(res => res.json())
    .then((data) => {
      const recs = []
      // console.log(data.length)
      // console.log("wine_title:", data[0]['wine_title'])
      for (let i = 0; i < data.length; i++) {
        recs.push(<PostRecItem rec={data[i]['wine_title']}/>);
      }
      setSavedRecs(recs)
      setWineData(data)
      console.log("wineData state:", data)
    })
  }, [localStorage.getItem('userLog')])

  function AccessProfile() {
    if (localStorage.getItem('userLog')) {
    return (
        <div>
          <ul>
            {savedRecs}
          </ul>
          <MapContainer data={wineData}/>
        </div>
      )
    } else {
        alert('You need to log in for this feature')
        return <Redirect to='/login'/>
  }}

  return <AccessProfile/>

}


function PostRecItem(props) {
  return <li>{props.rec}</li>
}

function Recommendation(props) {

  const [minYear, setMinYear] = React.useState('1000')
  const [maxYear, setMaxYear] = React.useState('2017')
  const [minPrice, setMinPrice] = React.useState('0')
  const [maxPrice, setMaxPrice] = React.useState('3300')
  const [descriptor, setDescriptor] = React.useState([])
  const [recList, setRecList] = React.useState(["loading..."])
  const [showResult, setShowResult] = React.useState(false)
  const [recInfo, setRecInfo] = React.useState([])

  const options = [
    {value: 'strawberry', label: 'strawberry'},
    {value: 'cherry', label: 'cherry'},
    {value: 'mushroom', label: 'mushroom'},
    {value: 'perfumed', label: 'perfumed'},
    {value: 'ripe', label: 'ripe'},
    {value: 'oak', label: 'oak'},
    {value: 'juicy', label: 'juicy'},
    {value: 'mineral', label: 'mineral'},
    {value: 'pineapple', label: 'pineapple'},
    {value: 'lime', label: 'lime'},
    {value: 'slate', label: 'slate'},
    {value: 'peach', label: 'peach'},
    {value: 'apple', label: 'apple'},
    {value: 'pear', label: 'pear'},
    {value: 'violet', label: 'violet'},
    {value: 'blackberry', label: 'blackberry'},
    {value: 'apricot', label: 'apricot'},
    {value: 'cinnamon', label: 'cinnamon'},
    {value: 'almond', label: 'almond'},
    {value: 'honeysuckle', label: 'honeysuckle'},
    {value: 'melon', label: 'melon'},
    {value: 'rose', label: 'rose'},
    {value: 'asparagus', label: 'asparagus'},
    {value: 'pepper', label: 'pepper'},
    {value: 'black', label: 'black'},
    {value: 'red', label: 'red'},
    {value: 'plum', label: 'plum'},
    {value: 'papaya', label: 'papaya'},
    {value: 'banana', label: 'banana'},
    {value: 'honey', label: 'honey'},
    {value: 'butter', label: 'butter'},
    {value: 'toasted', label: 'toasted'},
    {value: 'chalk', label: 'chalk'},
    {value: 'vanilla', label: 'vanilla'},
    {value: 'caramel', label: 'caramel'},
    {value: 'licorice', label: 'licorice'},
    {value: 'leather', label: 'leather'},
    {value: 'prune', label: 'prune'},
    {value: 'game', label: 'game'},
    {value: 'cigar', label: 'cigar'},
    {value: 'rosemary', label: 'rosemary'},
    {value: 'coffee', label: 'coffee'},
    {value: 'clove', label: 'clove'},
    {value: 'tobacco', label: 'tobacco'},
    {value: 'chocolate', label: 'chocolate'},
    {value: 'cedar', label: 'cedar'}
  ]

  const filterCheckbox = (e) => {
    setDescriptor(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  const SaveRec = (e) => {
    e.preventDefault()
    const fields = {
      "rec_info":recInfo
    }
    fetch('/api/wine/save-rec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(res => res.json())
    .then((data) => {
      alert(data.message)
    })
  };


  const WineFilters = (e)=> {
    e.preventDefault()
    const filters = {"min_year": minYear,
                    "max_year": maxYear,
                    "min_price": minPrice,
                    "max_price": maxPrice,
                    "descriptor": descriptor}
    console.log(filters)
    console.log(JSON.stringify(filters))

    fetch('/api/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters),
    })
    .then(res => res.json())
    .then((data) => {
      const recs = []
      const rec_wines = []
      for (const rec of data) {
        recs.push(<PostRecItem rec={rec}/>)
        rec_wines.push(rec)
      }
      setRecList(recs)
      setShowResult(true)
      setRecInfo(rec_wines)
    })
  }

  function WineResult() {
    if (showResult) {
      return (
        <div>
          Here are some wines that match your criteria:
          <ul>
            {recList}
          </ul>
          <button onClick={SaveRec}>Save this</button>
        </div>
      )
    }
    {
      return (
        <form onSubmit={WineFilters} id="wine-search" method="POST">
          <div>
            Please pick your year of production range(optional):
            Min:
            <select value={minYear} onChange={(e) => setMinYear(e.target.value)} id="min-year" name="min-year">
              <option value="1970">1970</option>
              <option value="1980">1980</option>
              <option value="1990">1990</option>
              <option value="2000">2000</option>
            </select>
            Max:
            <select value={maxYear} onChange={(e) => setMaxYear(e.target.value)} id="max-year" name="max-year">
              <option value="2017">2017</option>
              <option value="2015">2015</option>
              <option value="2013">2013</option>
              <option value="2011">2011</option>
            </select>
          </div>
          <div>
            Please pick your price range:
            Min:
            <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)} id="min-price" name="min-price">
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
            </select>
            Max:
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} id="max-price" name="max-price">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="1000">1000</option>
            </select>
          </div>
          <div>
            Please choose descriptors for your dream wine:
            <Select
            value={options.filter(obj => descriptor.includes(obj.value))}
            options = {options}
            onChange={filterCheckbox}
            isMulti
            isClearable
            />
          </div>
          <input type="submit"/>
        </form>
      )
    }
  };

  return (
    <WineResult />
  )
  }


function App() {

  const LogoutUser = (e) => {
    e.preventDefault()
    fetch('/api/logout')
    .then(res => res.json())
    .then((data) => {
    if (data.status === 'error') {
      alert(data.message)
    } else {
      localStorage.removeItem('userLog');
      alert(data.message)
    }
    })
  };

  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#faf2f2"}}>
            <a className="navbar-brand" href="/">
            <img src={require('./smlogo.png')} width="50" height="50" className="d-inline-block align-top" alt="wine glass with mustache"/>
              SommBot
            </a>
            <button className="navbar-toggler" type="button" dataToggle="collapse" dataTarget="#navbarSupportedContent" ariaControls="navbarSupportedContent" ariaExpanded="false" ariaLabel="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link"><span className="sr-only">(current)
                    <Link to="/"> Home </Link>
                  </span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/about" className="nav-item"> About </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/login"> Login </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/profile" > Profile </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/create-account"> Create Account </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/recommendation"> Wine Recommendation </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/" onClick={LogoutUser}> Logout </Link>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/create-account">
              <CreateAccount />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/recommendation">
              <Recommendation />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
          </div>
      </Router>
    );

}

export default App;

{/* <Navbar bg="light" variant="light">
<Navbar.Brand href='/'>SommBot</Navbar.Brand>
<Nav className="mr-auto">
  <Nav.Link href="/">Home</Nav.Link>
  <Nav.Link href="/profile">Wine Journal</Nav.Link>
  <Nav.Link href="/create-account">Create Account</Nav.Link>
  <Nav.Link href="/login">Login</Nav.Link>
  <Nav.Link href="/recommendation">Wine Recommendation</Nav.Link>
</Nav>
</Navbar> */}
