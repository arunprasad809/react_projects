import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import "./RoutingTabs.scss";
import List from "./List";

const RoutingTabs = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [request, setRequest] = useState("users");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${request}`);
        if (!response.ok) throw Error("Unable to fetch data");
        const listItems = await response.json();
        setItems(listItems);
      } catch (err) {
        console.log(err.message);
      }
    };
    (async () => await fetchItems())();
  }, [request]);
  return (
    <div className="container">
      <div className="row">
        <h1 className="title">Routing as Tabs</h1>
        <div className="col routing_data">
          <Buttons request={request} setRequest={setRequest} />
          <List items={items} />
        </div>
      </div>
    </div>
  );
};

export default RoutingTabs;
