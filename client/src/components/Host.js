import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  FormText
} from "reactstrap";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import Spinner from "../utils/Spinner";
import axios from "axios";

class VisitorForm extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    masterPassword: "",
    isLoading: false
  };

  handleInput = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.setState({
      ...this.state,
      isLoading: true
    });
    const { name, email, phone, masterPassword } = this.state;
    const user = {
      name,
      phone,
      email
    };
    if (masterPassword === "admin") {
      axios
        .post("http://localhost:5000/host/register", user)
        .then(res => {
          toast.notify(`Thank you for Registertion ${user.name}!`, {
            position: "bottom-right"
          });
        })
        .catch(err => {
          toast.notify("Sorry!!Server Error:500", {
            position: "bottom-right"
          });
        });
    } else {
      toast.notify("Please Check Master Password");
    }
    this.setState({
      isLoading: false,
      name: "",
      phone: "",
      email: "",
      masterPassword: ""
    });
  };

  render() {
    return (
      <div>
        <Spinner loading={this.state.isLoading} />
        <Container>
          <h3 className="header">Host Registretion</h3>
          <Form className="form">
            <FormGroup>
              <Label for="hostName">Host's Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Host's Name"
                onChange={this.handleInput}
                value={this.state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleInput}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="masterPassword">Master Password</Label>
              <Input
                type="password"
                name="masterPassword"
                placeholder="ex. admin"
                onChange={this.handleInput}
                value={this.state.masterPassword}
              />
              <FormText>So everybody can't register.</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input
                type="text"
                name="phone"
                placeholder="Phone No."
                onChange={this.handleInput}
                value={this.state.phone}
              />
            </FormGroup>
            <Button onClick={this.handleSubmit}>Register</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default VisitorForm;
