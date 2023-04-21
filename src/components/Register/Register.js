import React, {Component} from "react";
import LoadingCircle from "../Loading/LoadingCircle";
// import './FaceRecognition.css';
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            requestInProcess: false
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSubmitSignIn = () => {
        this.setState({requestInProcess: true});
        fetch("https://face-recognition-node-server.onrender.com/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            });
        
    };

    render(){
        return(
        <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba b--black-90 bg-transparent hover-bg-black hover-white w-100" 
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba b--black-90 bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="pa2 input-reset ba b--black-90 bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                    </div>
                    </fieldset>
                    <div className="center0 pb3 pt0">
                        {this.state.requestInProcess && (
                            <LoadingCircle className='center0'></LoadingCircle>
                        )}
                    </div>
                    <div className="center0">
                        <input
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                    </div>
                </div>
            </main>
        </article>
        );
    }
}

export default Register;