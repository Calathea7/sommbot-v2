import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Select from 'react-select';


function Homepage() {
    return <div> Welcome to my site </div>
}

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
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}>
      </input>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}>
      </input>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}>
      </input>
      <button onClick={CreateUser}> Create Profile </button>
    </form>
  )
}

function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const LogoutUser = (e) => {
    e.preventDefault()
    fetch('/api/logout')
    .then(res => res.json())
    .then((data) => {
      alert(data.message)
    })
  };

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
      body: JSON.stringify(inputs)
    })
    .then(res => res.json())
    .then((data) => {
      alert(data.message)
    })
  };

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}>
      </input>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}>
      </input>
      <button onClick={VerifyUser}> Log In </button>
      <button onClick={LogoutUser}> Log Out </button>
    </form>
  )
}



// function Selector(props) {

//   function onChange(e) {
//     this.value = e.target.value
//   }
//   return (
//     <div>
//       <select onChange={self.onChange}>
//         {props.optionsList.map(option => {
//           return <option value={option}> option </option>;
//         }
//       </select>
//     </div>
//   )
// }

function MapContainer(props) {
  // const [myMap, setMyMap] = React.useState();
  const [options, setOptions] = React.useState({
    center: { lat: 38.297539, lng: -122.286865},
    zoom: 10
  });
  // const [markers, setMarkers] = React.useState([]);

  const mapDimensions = {
    width: '200px',
    height: '200px'
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
      {/* <MapBuilder options={{ center: {lat: 38.297539, lng: -122.286865}, zoom: 10 }} /> */}
      <MapBuilder
      options={options}
      mapDimensions={mapDimensions}
      onMountProps={props.data}
      onMount={placeMarkers}
    />
      {/* <WineMarkers map={myMap} data={props.data}/> */}
    </div>
  )
}


function MapBuilder(props) {
  const [myMap, setMyMap] = React.useState();
  // const [marker, setMarker] = React.useState();
  // const createMarker = () => new window.google.maps.Marker({ position: options.center, map: props.myMap });
  const options = { center: {lat: 38.297539, lng: -122.286865}, zoom: 10 };
  const mapRef = React.useRef();

  React.useEffect(() => {
    const createMap = () => setMyMap(new window.google.maps.Map(mapRef.current, options));
    // const createMarker = () => new window.google.maps.Marker({ position: options.center, map: myMap });
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

  // options.center.lat, options.center.lng

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
  }, [])

  return (
    <div>
      <ul>
        {savedRecs}
      </ul>
      <MapContainer data={wineData}/>
    </div>
  )
}


// function WineMarkers(props) {
//   const [markers, setMarkers] = React.useState([]);

//   function cleanMarkers() {
//     console.log("just double checking the clear")
//     for (const marker of markers) {
//       marker.setMyMap(null);
//     }
//     setMarkers([])
//   }

//   function placeMarkers(data) {
//     // cleanMarkers();
//     const allMarkers = []
//     for (let i = 0; i < data.length; i++) {
//       const wineMarker = new window.google.maps.Marker({
//         map: props.map,
//         position: {
//           lat: parseFloat(data[i]['lat']),
//           lng: parseFloat(data[i]['lng'])
//         },
//         title: data[i]['wine_title'],
//       })
//       allMarkers.push(wineMarker)
//     }
//     setMarkers(allMarkers)
//   }

//   React.useEffect(() => {
//     console.log("hi from WineMarkers 1")
//     console.log(props.data)
//     placeMarkers(props.data)
//     // fetch('/api/user-profile')
//   }, [props.data])


//   return null;
// }


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

  // const descriptors = ['cherry', 'strawberry', 'mushroom','perfumed', 'ripe', 'oak', 'juicy']
  const options = [
    {value: 'strawberry', label: 'strawberry'},
    {value: 'cherry', label: 'cherry'},
    {value: 'mushroom', label: 'mushroom'},
    {value: 'perfumed', label: 'perfumed'},
    {value: 'ripe', label: 'ripe'},
    {value: 'oak', label: 'oak'},
    {value: 'juicy', label: 'juicy'},
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
            {/* <Selector options=[1970, 1980, 1990, 2000] id="min-year" /> */}
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
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                  <Link to="/"> Home </Link>
              </li>
              <li>
                  <Link to="/about"> About </Link>
              </li>
              <li>
                  <Link to="/login"> Login </Link>
              </li>
              <li>
                  <Link to="/profile"> Profile </Link>
              </li>
              <li>
                  <Link to="/create-account"> Create Account </Link>
              </li>
              <li>
                  <Link to="/recommendation"> Wine Recommendation </Link>
              </li>
            </ul>
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
