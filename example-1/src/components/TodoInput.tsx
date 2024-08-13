import React from "react";
import { useState } from "react";
import { styled } from "styled-components";

const MAX_TITLE_LENGTH = 12;
const MAX_CONTENT_LENGTH = 30;

const TodoInputLayout = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  padding: 12px;
  border: 2px solid #ababab;
  border-radius: 16px;
`;

const TodoInputTitle = styled.input`
  font-size: 20px;
  font-weight: 700;
  color: #049afe;
  width: 50%;
`;

const TodoInputContent = styled.input`
  font-size: 16px;
  font-weight: 400;
  color: #9b9b9b;

  width: 70%;
`;

interface TodoInputProps {
  onSubmit: ({ title, content }: { title: string; content: string }) => void;
}

// 상위에서 props로 선언하고 밑에서 구조분해할당할 필요없이 처음부터 구조분해 할당해도 문제가 되진 않는다.
const TodoInput = ({ onSubmit }: TodoInputProps) => {
  // 원시타입, string, number 등은 자동으로 타입이 감지되기 때문에 굳이 <string>이라고 type 선언할  필요는 없다
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangeTitle = (e) => {
    if (e.target.value.length < MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    }
  };

  const handleChangeContent = (e) => {
    if (e.target.value.length < MAX_CONTENT_LENGTH) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <TodoInputLayout onSubmit={handleSubmit}>
      <TodoInputTitle
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={handleChangeTitle}
      />
      <TodoInputContent
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={handleChangeContent}
      />
      <button type="submit">등록하기</button>
    </TodoInputLayout>
  );
};

export default TodoInput;
