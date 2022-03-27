import React, { useEffect, useState } from "react";
import CardComponent from "./card";
import "../MainApp.scss";
import { API } from "aws-amplify";

const MainContext = (props) => {
  const [gameList, setGameList] = useState([]);

  const showItem = (item) => {
    props.showStripe(item);
  };

  useEffect(() => {
    const getGameList = async () => {
      return await API.get("cankartapi", "/getList", {})
        .then((result) => {
          setGameList(result);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getGameList();
  }, [gameList.length]);

  return (
    <div className="main_content">
      {gameList.map((item) => (
        <CardComponent key={item.videogameId} showItem={showItem} item={item} />
      ))}
    </div>
  );
};
export default MainContext;
