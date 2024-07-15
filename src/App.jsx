import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "./redux/slices/userSlice";
import PointsResults from "./components/PointsResults";

const App = () => {
  const uId = useSelector(state=> state.user.userId)
  const dispatch = useDispatch();

  const generateId = () => {
    if (uId) return;
    const id = Date.now();
    dispatch(setUserId(id))
  };

  useEffect(() => {
    generateId();
  }, []);

  return (
    <div>
      <PointsResults />
    </div>
  );
};

export default App;
