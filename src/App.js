import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg'

const initialState = {
  input: '',
  imageUrl: '',
  boxes: {},
  route: 'signIn',
  // route: 'home', //FOR TESTING ONLY
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFacesLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    const regions = clarifaiFaces.map(element => {
      return {
        leftCol: element.region_info.bounding_box.left_col*width,
        topRow: element.region_info.bounding_box.top_row*height,
        rightCol: width - (element.region_info.bounding_box.right_col*width),
        bottomRow: height - (element.region_info.bounding_box.bottom_row*height)
      }
    });
    return regions;
  };

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  };

  onInputChange = (event) => {
    if(this.state.route === 'signOut'){
      this.state({isSignedIn: false})
    } else if (this.state.route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://face-recognition-node-server.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://face-recognition-node-server.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFacesLocation(response))
      })
      .catch(err => console.log(err));
  }
   
  onRouteChange = (route) => {
    if(route === "signOut"){
      this.setState(initialState);
    } else if (route === "home"){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render (){
    const {isSignedIn, imageUrl, route, boxes} = this.state;
    return(
      <div className="App">
        <ParticlesBg type="cobweb"
                      num={141}
                      bg={true} 
                      />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'?
        <div className='floatingImage'>
          <Logo />
          <Rank name = {this.state.user.name} entries ={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition boxes = {boxes} imageUrl={imageUrl}/>
        </div>
        : (
          (route==='signIn' || route ==='signOut')?
          <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          )
        }
        <p className='footer'>Made with &hearts; by Roberto Villalobos, 2023</p>
      </div>
    );
  };
};

export default App;
