import React from "react";
import Link from "next/link";

class SignUpForm extends React.Component {
  formData;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      interests: "",
      error: "",
      errorMsg: "",
      disabled: false,
      enabled: false,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleInterestInput = this.handleInterestInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleEmailInput(event) {
    let isValidField = this.isValid(event.target);
    console.log(isValidField);
    this.setState({
      email: event.target.value,
    });
  }

  handleInterestInput(event) {
    this.setState({
      interests: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.formData = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.formData);
    if (localStorage.getItem("userInfo")) {
      for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue;
        }
        let data = localStorage.getItem(key);
        data = data ? JSON.parse(data) : {};
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      this.setState({
        email: this.formData.email,
        interests: this.formData.interests,
        enabled: true,
      });
    } else {
      this.setState({
        email: "",
        interests: "",
        enabled: false,
      });
    }
  }

  isValid(input) {
    if (input.getAttribute("type") === "email" && input.value !== "") {
      if (!this.validateEmail(input.value)) {
        this.setState({
          error: true,
          errorMsg: "Please enter a valid email address",
          disabled: true,
        });
        return false;
      } else {
        this.setState({ error: false, errorMsg: "", disabled: false });
      }
    }
    return true;
  }

  validateEmail(value) {
    let result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return result.test(value);
  }



  UNSAFE_componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem("userInfo", JSON.stringify(nextState));
  };

  render() {
    const { email, interests, error, errorMsg } = this.state;

    return (
      <div className="layout-container">
        { this.state.enabled ? (
              <section className="main-content">
              <div>
                <h1 className="heading-text">Internship Signup Form</h1>
                <div className="bottom-border"></div>
                <h1 className="heading-thanks">Thanks for your interest!</h1>
                <p className="p-text">
                  We will review your application and contact you for addition
                  information should your background and experience meet the 
                  requirements of one of our oppenings
                </p>
              </div>
            </section>
            ) : 
          (<section className="main-content">
            <div>
              <h1 className="heading-text">Internship Signup Form</h1>
              <div className="bottom-border"></div>
              <p className="p-text">
                Prepare for your career with a Project Management,
                Web-Development, Graphic design, or Digital Marketing Internship
                at Nothern
              </p>
            </div>
            <div className="container">
              <form>
                {error && (
                  <div
                    style={{
                      color: "#ffffff",
                      marginBottom: "5px",
                      marginTop: "10px",
                      textAlign: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
                <div className="container-row">
                  <div className="form-container">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleEmailInput}
                      placeholder="Your Email Address"
                      required
                    />
                  </div>
                  <div className="form-container">
                    <select
                      name="interests"
                      value={interests}
                      onChange={this.handleInterestInput}
                    >
                      <option value="">Your interests</option>
                      <option name="devops" value="devops">
                        DevOps
                      </option>
                      <option name="frontend" value="frontend">
                        Frontend
                      </option>
                      <option name="backend" value="backend">
                        Backend
                      </option>
                      <option name="fullstack" value="fullstack">
                        Full Stack
                      </option>
                    </select>
                  </div>
                </div>
                <div className="btn">
                  <Link href="/" className="register">
                    <button
                      type="submit"
                      href="#"
                      className="register"
                      disabled={this.state.enabled}
                      disabled={
                        !this.state.email ||
                        !this.state.interests ||
                        this.state.disabled
                      }
                      onClick={this.handleFormSubmit}
                    >
                      {!this.state.enabled ? "Sign Up Now" : "Submitting..."}
                      <small>&#9656;</small>
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </section>
          )}
      </div>
    );
  }
}

export default SignUpForm;
