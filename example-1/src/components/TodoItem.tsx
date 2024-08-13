import React from "react";
import "./TodoItem.css";

interface TodoItemProps {
  content: string;
  title: string;
  isChecked: boolean;
  onClick: (e: any) => void;
  onRemove: () => void;
  onToggle: (e: any) => void;
}

// 이름이 꼭 파일명과 일치할 필요는 없다.
// props 라는 객체는 상위 컴포넌트에서 정의해둔 값을 사용하기 위해 선언된다.
// 물론 props라는 이름을 쓸 필요는 없지만 React에서는 Props라고 정의하기에 props라고 암묵적으로 작성한다.
export const TodoItem = (props: TodoItemProps) => {
  // 구조분해 할당이라고 하는 props 객체에서 사용되는 값을 가져올 때 사용한다.
  // 해당 방법은 props.content라고 접근할 필요없이 바로 content로 가져오는 장점이 있으나
  // content라는 property가 존재하지 않을 시 에러가 발생하기에 조심히 사용해야한다.
  const { content, title, isChecked, onClick, onRemove, onToggle } = props;

  // React의 컴포넌트는 HTML 태그를 return 시킨다.
  // <></>는 Fragment를 의미하며, React에서는 무조건 하나의 태그만을 return 해야하는데
  // 2개 이상의 최상위 태그가 생겨버린다면 <></>로 묶어서 하나의 태그로 만든다.
  // 실제로 <></>는 빌드된 HTML에서는 제거된다.
  return (
    <div className="TodoItemLayout" onClick={onClick}>
      <div className="TodoItemDesc">
        <p className="TodoItemTitle">{title}</p>
        <p className="TodoItemContent">{content}</p>
      </div>
      <input
        className="TodoItemCheckbox"
        type="checkbox"
        value={String(isChecked)}
        onChange={onToggle}
        // inline 함수에서 선언한 stopPropagation()로 상위 함수의 동작을 막아준다.
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <button className="TodoItemRemoveBtn" onClick={onRemove}>
        X
      </button>
    </div>
  );
};
