import React,{Component} from "react";
import '../../BadEntry.css';
import './SignIn.css';
import LoadingCircle from '../Loading/LoadingCircle';
class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            badSignInStatus: false,
            requestInProcess: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    };

    onSubmitSignIn = () => {
        this.setState({requestInProcess: true});
        this.setState({badSignInStatus: false});
        let badRequest = false; //parkour
        fetch("https://face-recognition-node-server.onrender.com/signin", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })})
        .then(res => {
            if(res.status === 400){
                badRequest = true;
                this.setState({badSignInStatus: badRequest});
            }
            return res;
        })
        .then(res =>
            {
            if(badRequest){
                return false;
            } else {
                return res.json();
            }  
            }
        )
        .then(user => {
            if(user.id){  
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    };

    render(){
        const {onRouteChange} = this.props;
        return(
        <>
        <p className="f3 explanationText">
                {`This page will detect faces in your pictures, just sign in or register if you haven't`}
        </p>
        <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba b--black-90 bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b ph2 pt2 input-reset ba b--black-90 bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                    </div>
                    </fieldset>
                    <div className="center0 pb3">
                        {this.state.badSignInStatus && (
                            <p className="badEntryText">Incorrect email and password combination!</p>
                        )}
                        {!this.state.badSignInStatus && this.state.requestInProcess && (
                            <LoadingCircle className='center0'></LoadingCircle>
                        )}
                    </div>
                    <div className="center0">
                        <input
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black-90 b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
        </>
        )
    }
}

export default SignIn;