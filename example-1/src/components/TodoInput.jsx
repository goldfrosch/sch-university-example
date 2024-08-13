import "./TodoInput.css";

import { useState } from "react";

const MAX_TITLE_LENGTH = 12;
const MAX_CONTENT_LENGTH = 30;

const TodoInput = ({ onSubmit }) => {
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
  };

  return (
    <form className="TodoInputLayout" onSubmit={handleSubmit}>
      <input
        className="TodoInputTitle"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={handleChangeTitle}
      />
      <input
        className="TodoInputContent"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={handleChangeContent}
      />
      <button type="submit">등록하기</button>
    </form>
  );
};

export default TodoInput;
