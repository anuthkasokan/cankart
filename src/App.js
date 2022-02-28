import React from "react";
import "./App.css";
import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const getList = () => {
    return API.get("cankartapi", "/getList/1", {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addList = () => {
    return API.post("cankartapi", "/getList", {
      body: {
        videogameId: 1,
        name: "Call of duty",
        imageUrl: "./assets/callofduty.jpg",
        size: "11.6GB",
        price: "16.57$",
        company: "Activision",
        rating: "8.5",
        version: "7",
        creationDate: "02/21/2022",
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const putList = () => {
    return API.put("cankartapi", "/getList", {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteList = () => {
    return API.del("cankartapi", "/getList/1", {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut></AmplifySignOut>
        <h2>CanKart</h2>
        <button onClick={getList} className="btn book-link">
          Get /getList
        </button>
        <button onClick={addList} className="btn book-link">
          Add /getList
        </button>
        <button onClick={putList} className="btn book-link">
          Put /getList
        </button>
        <button onClick={deleteList} className="btn book-link">
          Delete /getList
        </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
