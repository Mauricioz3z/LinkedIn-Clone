import React, {Component} from 'react';
import '../../App.css';
import '../../home_wrapper.css';
import { reduxForm } from "redux-form";
import {Redirect} from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { applicantlogin } from '../../Actions';
import validator from 'validator';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: { value: '', isValid: true },
            lastname: { value: '', isValid: true },
            email: { value: '', isValid: true },
            password: { value: '', isValid: true },
            loginemail: { value: '', isValid: true },
            loginpassword: { value: '', isValid: true },
            islogged: false,
            message: "",          
        };

        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //firstname ,lastname, email and password change handler to update state variable with the text entered by the applicant
    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: {
            ...this.state[e.target.name],
            value: e.target.value,
            isValid: true,
          }
        };
        this.setState(state);
    }

    handleValidation() {

        console.log("validation check")

        let formIsValid = true;
        const firstname = { ...this.state.firstname };
        const lastname = { ...this.state.lastname };
        const email = { ...this.state.email };
        const password = { ...this.state.password };

        this.setState({
            message: ""
        });

        //firstname
        if(!firstname.value || firstname.value === ""){
            formIsValid = false;
            firstname.isValid = false;
            this.setState({
                message: "Please enter your first name"
            });
            return formIsValid
        } else if(typeof firstname.value !== "undefined"){
            if(!firstname.value.match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                this.setState({
                    message: "Please enter a valid first name"
                });
                firstname.isValid = false;
                return formIsValid
            }
        }

        //Lastname
        if(!lastname.value || lastname.value === ""){
            formIsValid = false;
            this.setState({
                message: "Please enter your last name"
            });
            lastname.isValid = false;
            return formIsValid
         } else if(typeof lastname.value !== "undefined"){
            if(!lastname.value.match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                this.setState({
                    message: "Please enter a valid last name"
                });
                lastname.isValid = false;
                return formIsValid
            }
        }
        
        //Email
        if(!email.value || email.value === ""){
            formIsValid = false;
            this.setState({
                message: "Please enter your email address"
            });
            email.isValid = false;
            return formIsValid
        }
        if(typeof email.value !== "undefined"){
            if (!validator.isEmail(email.value)) {
                formIsValid = false;
                this.setState({
                    message: "Please enter a valid email address"
                });
                email.isValid = false;
                return formIsValid
            }
        }

        //Password
        if(!password.value || password.value === ""){
            formIsValid = false;
            this.setState({
                message: "Please enter your password"
            });
            password.isValid = false;
            return formIsValid
        }
        return formIsValid;
   }
    
   submitSignup(event) {
        //prevent page from refresh
        event.preventDefault();
        if (this.handleValidation()) {
            const { firstname, lastname, email, password } = this.state;
            this.props.history.push({
                pathname:"/profilelocation/new",
                state:{
                    firstname : firstname.value,
                    lastname : lastname.value,
                    email : email.value,
                    password : password.value
                }
            });
        }
    }

    submitLogin(event) {
        //prevent page from refresh
        event.preventDefault();
        const { loginemail, loginpassword } = this.state;
        if ( loginemail && loginpassword) {
            const data = {
                email:  loginemail,
                password: loginpassword
            }
            this.props.applicantlogin(data).then(response => {
                if(response.payload.status === 200){
                    this.setState({
                        islogged: true
                    });
                }
            }).catch (error => {
                console.log("Error is", error);
                this.setState({

                });
            })
        }
    }
    
    componentDidMount() {
        
    }
    

    render(){
        const { firstname, lastname, email, password, message, loginemail, loginpassword, islogged } = {...this.state};
        console.log(message)
        let redirectVar = null;
        if( islogged ){
            redirectVar = <Redirect to= "/profile"/>
        }
        return(
          <div className = "global-wrapper">
            {redirectVar}
              <div className="navbar fixed-top navbar-dark bg-dark" style = {{height : "52px"}}>
                <div className = "home_wrapper">
                <h1><a className="navbar-brand" href="#"><img src = {"/linkedinfulllogo1.png"} alt = "LinkedIn"/></a></h1>
                    <form className = "login-form" onSubmit = {this.submitLogin}>
                        <label htmlFor = "login-email">Email</label>
                        <input onChange = {this.changeHandler} type = "text" id = "login-email" name = "loginemail" value={loginemail.value} placeholder ="Email" autoFocus = "autofocus"></input>
                        <label htmlFor = "login-password">Password</label>
                        <input onChange = {this.changeHandler} type = "password" id = "login-password" name = "loginpassword" value={loginpassword.value} placeholder ="Password" autoFocus = "autofocus"></input>
                        <input className = "login-submit" type ="submit" value = "Sign In"></input>
                        <a className = "link-forgot-password" tabIndex = "1">Forgot Password?</a>
                    </form>
                 </div>
              </div>
              <div className = "main background">
                <form id = "regForm" className = "reg-form" onSubmit = {this.submitSignup} >
                    <h2 className = "title">Be great at what you do</h2>
                    <h3 className = "subtitle">Get started - it's free</h3>
                    <div className = "reg-alert" role = "alert" tabIndex = "-1">
                    {message &&
                    (
                        <div className="wrapper">
                            <p className="message">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="alert-content"> {message} </span>
                            </p>
                        </div>
                    )}
                    </div>
                    <section className = "form-body">
                        <label htmlFor ="reg-firstname">First Name</label>
                        <input onChange = {this.changeHandler} type = "text" name = "firstname" value={firstname.value} id = "reg-firstname"></input>
                        <label htmlFor ="reg-lastname">Last Name</label>
                        <input onChange = {this.changeHandler} type = "text" name = "lastname" value={lastname.value} id = "reg-lastname"></input>
                        <label htmlFor ="reg-email">Email</label>
                        <input onChange = {this.changeHandler} type = "text" name = "email" value={email.value} id = "reg-email"></input>
                        <label htmlFor ="reg-password">Password(6 or more characters)</label>
                        <input onChange = {this.changeHandler} type = "password" name = "password" value={password.value} id = "reg-password"></input>
                        <span className = "agreement">By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</span>
                        <input id ="registration-submit" className = "registration submit-button" type = "submit" value = "Join now"></input>
                    </section>
                </form>
              </div>
              
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        applicantlogin: state.applicantlogin
    };
  }
  export default withRouter(reduxForm({
    form: "Home_Page"
  })(connect(mapStateToProps, { applicantlogin })(Home)));