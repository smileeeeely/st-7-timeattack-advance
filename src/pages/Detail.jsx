import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../api/todos";
import { useQuery } from "@tanstack/react-query";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTodoDetail = async () => {
    const response = await todoApi(`/todos/${id}`);
    return response.data;
  };

  const {
    data: todos_detail,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos_detail"],
    queryFn: fetchTodoDetail,
  });

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (isError) {
    <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {todos_detail.title}</p>
      <p>내용: {todos_detail.contents}</p>
      <p>작성일자: {new Date(todos_detail.createdAt).toDateString()}</p>
    </div>
  );
}
