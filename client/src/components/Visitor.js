import React, { Component } from "react";
import { Table, Container, Button } from "reactstrap";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import axios from "axios";
import uuid from "uuid/v4";
import Spinner from "../utils/Spinner";

class Visitor extends Component {
  state = {
    isLoading: false,
    data: []
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true
    });
    axios.get("http://localhost:5000/visit").then(result => {
      this.setState({
        ...this.state,
        isLoading: false,
        data: result.data
      });
    });
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.data !== this.state.data) {
  //     this.setState({
  //       ...this.state,
  //       data: [...prevState.data, this.state.data]
  //     });
  //   }
  // }

  handleCheckout = email => {
    axios
      .put("http://localhost:5000/visit/checkout", { email })
      .then(res => {
        toast.notify("Visit again! Thank you.", {
          position: "bottom-right"
        });
        console.log(res.data);
        this.setState({
          ...this.state,
          data: [
            ...this.state.data.map(visitor => {
              return visitor.email === res.data.email ? res.data : visitor;
            })
          ]
        });
      })
      .catch(err => {
        toast.notify("OppSSS..!erver ERROR!");
      });
  };

  render() {
    return (
      <div>
        <Spinner loading={this.state.isLoading} />
        <Container>
          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(visitor => (
                <tr key={uuid()}>
                  <td>{visitor.name}</td>
                  <td>{visitor.email}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.checkIn}</td>
                  {!visitor.isCheckout ? (
                    <td>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => this.handleCheckout(visitor.email)}
                      >
                        CheckOut
                      </Button>
                    </td>
                  ) : (
                    <td>{visitor.checkOut}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Visitor;
