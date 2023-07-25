import { useState } from "react";

const useForceRender = () => {
  const [render, setRender] = useState(true);

  return () => setRender(!render);
};

export default useForceRender();
