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
            requestInProcess: false,
            semicolonSomewhere: false,
            invalidEmailFormat: false,
            emptyField: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    };

    validateStrNotSemicolon = (str) => {
        return !str.includes(';');  
    };

    validateEmail = () =>{
        /*eslint no-undef: 0*/
        let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regexEmail.test(this.state.signInEmail);
    };

    onSubmitSignIn = () => {
        this.setState({requestInProcess: false, badSignInStatus: false, semicolonSomewhere: false, invalidEmailFormat: false, emptyField: false})
        let badRequest = false;
        if(!this.validateStrNotSemicolon(this.state.signInEmail) || !this.validateStrNotSemicolon(this.state.signInPassword)){
            this.setState({semicolonSomewhere: true});
        } else if (!this.state.signInEmail || !this.state.signInPassword){
            this.setState({emptyField: true});
        } else if (!this.validateEmail(this.state.signInEmail)){
            this.setState({invalidEmailFormat: true});
        } else {
            this.setState({requestInProcess: true});
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
                    this.setState({requestInProcess: false, badSignInStatus: badRequest});
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
            });
        }
    };


    render(){
        const {onRouteChange} = this.props;
        return(
        <>
            <div className="f4 explanationTextField">
                <p className="explanationTextSignIn">
                    {`This page will detect faces in your pictures, just register or sign in :)`}
                </p>
                <p className="explanationTextSignInAdd">
                    (We will not be sending you emails, also you can enter anything that looks remotely close to an email while at registry... just imagine the joy of pretending to be your favorite Star Wars alien while you submit an image for face recognition)
                </p>
            </div>
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
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba b--black-90 bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                    </div>
                    </fieldset>
                    <div className="center0 pb3 pt0">
                        {   
                            this.state.semicolonSomewhere && (
                            <p className="badEntryText">Hello, my name is Íñigo Montoya, you have entered a semicolon, prepare to die!</p>
                        )}
                        {
                            this.state.emptyField && (
                            <p className="badEntryText">Fields cannot be empty!</p>
                        )}
                        {
                            this.state.invalidEmailFormat && (
                            <p className="badEntryText">Invalid email format!</p>
                        )}
                        {this.state.badSignInStatus && (
                            <p className="badEntryText">Incorrect email and password combination!</p>
                        )}
                        {this.state.requestInProcess && (
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