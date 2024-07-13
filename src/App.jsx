import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PointsResutls from "./components/PointsResutls";
import { setUserId } from "./redux/slices/userSlice";

const App = () => {
  const uId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const generateId = () => {
    if (uId) return;
    const id = Date.now();
    localStorage.setItem("userId", id);
  };

  useEffect(() => {
    generateId();
  }, []);

  const createUser = async () => {
    const data = { userId: uId };
    try {
      const res = await fetch("https://telegram-bot-backend-beryl.vercel.app/points/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res?.ok) {
        const result = await res.json();
        dispatch(setUserId(result?.user?.userId));
        setTexts("");
      } else {
        console.error("Failed to create user:", res.status);
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  useEffect(() => {
    if (uId) {
      createUser();
    }
  }, [uId, generateId]);

  return (
    <div>
      <PointsResutls />
    </div>
  );
};

export default App;
