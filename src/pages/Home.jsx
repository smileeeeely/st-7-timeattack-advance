import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchTodos = async () => {
    const response = await todoApi.get("/todos");
    return response.data;
  };

  const {
    data: todos,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (isError) {
    <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <>
      <h2>서버통신 투두리스트 by TQ</h2>
      <TodoForm />
      <TodoList todos={todos} />
    </>
  );
}
