import React, { useEffect, useState } from "react";
import createPagination from "./components/createPagination";
import axios from "axios"
import PostForm from "./components/PostForm"
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    }
  }
  componentDidMount() {
    fetch('https://mockrestapi.herokuapp.com/api/employee?pageNo=1&limit=5').then((resp) => {
      resp.json().then((result) => {
        this.setState({ users: result.data });
      });
    });

  }
  
  render() {
    const postDelete = (id, e) => {
        e.preventDefault();
        axios.delete(`https://mockrestapi.herokuapp.com/api/employee/${id}`)
          .then(res => console.log('Deleted..', res)).catch(err => console.log(err))
      }
      ;

      
    
      return (
  <div clssname="app-container">
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>phone</th>
          <th>address</th>
          <th>country</th>
          <th>age</th>
          <th>Delete op</th>
        </tr>
      </thead>
     <tbody>
      {
     this.state.users ?
              this.state.users.map((item, i) =>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.country}</td>
                  <td>{item.age}</td>
                  <th><button onClick={(e) => postDelete(item._id, e)}>Delete</button></th>
                </tr>
              )
              :
              null
            }
     </tbody>
      </table>
      <PostForm />
      
     
  </div>
  
  );
};
}
export  default App;
