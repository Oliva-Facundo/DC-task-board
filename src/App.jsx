import { Route, Routes, useNavigate } from "react-router-dom";
import Board from "./components/Board";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();

  const [boardId, setBoardId] = useState(() => {
    const savedId = localStorage.getItem("id")
    if (!savedId) {
      const randomId = Math.random().toString(36).substring(2, 7);
      localStorage.setItem("id", randomId);
      return randomId;
    }
    return savedId
  })

  useEffect(() => {
    if (!boardId) {
      navigate("/board");
    } else {
      navigate(`/board/${boardId}`);
    }
  }, [boardId, navigate]);

  return (
        <Routes>
          <Route path="/" element={ <Board /> } />
          <Route path="/board/:board_id" element={<Board />} />
        </Routes>
  );
}

export default App;
