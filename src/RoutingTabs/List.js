import React from "react";
import Table from "react-bootstrap/Table";

const List = ({ items }) => {
  return (
    <Table responsive striped bordered hover size="lg" variant="dark">
      <thead>
        <tr>
          {items.length > 0 && typeof items[0] === "object"
            ? Object.entries(items[0]).map(([key]) => {
                return <th key={key}>{key.toUpperCase()}</th>;
              })
            : null}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {Object.entries(item).map(([key, value]) => {
              return <td key={key}>{JSON.stringify(value)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;
