import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPoints } from "../redux/slices/userSlice";

const PointsResults = () => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.user.points);

  const handleClick = async () => {
    dispatch(setPoints());
  };

  useEffect(()=>{
    const interval = setInterval(() => {
      dispatch(setPoints())
    }, 2000);

    return ()=>[
      clearInterval(interval)
    ]
  },[])

  return (
    <div>
      <h1>Tap on button to increase your points</h1>
      <button onClick={handleClick}>Inc Points</button>
      <br />
      <br />
      <h1>
        Total earned points: <span>{points}</span>
      </h1>
    </div>
  );
};

export default PointsResults;
