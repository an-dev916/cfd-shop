import { Button } from "antd";
import React, { useState } from "react";

const TestPage = () => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState(true);

  const handleValue = () => {
    setValue1(false);
    setValue();
  };

  console.log("all value :>> ", [value, value1]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>TestPage</h1>
      <Button onClick={handleValue}>Click me!</Button>
    </div>
  );
};

export default TestPage;
