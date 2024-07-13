import React, { useEffect, useState } from "react";

const PointsResutls = () => {
  const userId = localStorage.getItem("userId");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const increasePoints = async () => {
    try {
      const res = await fetch("https://telegram-bot-backend-beryl.vercel.app/points/inc-points", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pointsToInc: 1 }),
      });

      if (res?.ok) {
        fetchPoints();
      }
    } catch (error) {
      console.log("error in inc points:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    increasePoints();
  };

  const fetchPoints = async () => {
    const res = await fetch(`http://localhost:5000/points/${userId}`);
    const data = await res.json();
    setPoints(data?.points);
  };

  useEffect(()=>{
    const interval = setInterval(() => {
      increasePoints()
    }, 2000);

    return () =>{
      clearInterval(interval)
    }
  },[points, increasePoints, fetchPoints])

  useEffect(() => {
    fetchPoints();
  }, [handleClick, points, loading, increasePoints]);

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

export default PointsResutls;
