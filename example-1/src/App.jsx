import { useState } from "react";
import "./App.css";
import { TodoItem } from "./components/TodoItem";

// 잘못된 케이스에 대한 설명
const TEST_MOCK_DATA1 = [
  { title: "테스트1", content: "테스트 컨텐츠1", isChecked: false },
  { title: "테스트2", content: "테스트 컨텐츠2", isChecked: false },
  { title: "테스트3", content: "테스트 컨텐츠3", isChecked: false },
  { title: "테스트4", content: "테스트 컨텐츠4", isChecked: false },
  { title: "테스트5", content: "테스트 컨텐츠5", isChecked: false },
  { title: "테스트6", content: "테스트 컨텐츠6", isChecked: false },
];

function App() {
  const TEST_MOCK_DATA2 = [
    { title: "테스트1", content: "테스트 컨텐츠1", isChecked: false },
    { title: "테스트2", content: "테스트 컨텐츠2", isChecked: false },
    { title: "테스트3", content: "테스트 컨텐츠3", isChecked: false },
    { title: "테스트4", content: "테스트 컨텐츠4", isChecked: false },
    { title: "테스트5", content: "테스트 컨텐츠5", isChecked: false },
    { title: "테스트6", content: "테스트 컨텐츠6", isChecked: false },
  ];

  const [testMock, setTestMock] = useState([
    { title: "테스트1", content: "테스트 컨텐츠1", isChecked: false },
    { title: "테스트2", content: "테스트 컨텐츠2", isChecked: false },
    { title: "테스트3", content: "테스트 컨텐츠3", isChecked: false },
    { title: "테스트4", content: "테스트 컨텐츠4", isChecked: false },
    { title: "테스트5", content: "테스트 컨텐츠5", isChecked: false },
    { title: "테스트6", content: "테스트 컨텐츠6", isChecked: false },
  ]);

  // 외부에 선언된 배열 값이 변경되어도 실제 화면은 변경되지 않는다.
  const handleWrongClick1 = () => {
    TEST_MOCK_DATA1.push({
      title: "테스트지롱",
      content: "테스트트트",
      isChecked: false,
    });
    console.log(TEST_MOCK_DATA1);
  };

  // 내부에 선언된 배열 값이 변경되어도 실제 화면은 변경되지 않는다.
  const handleWrongClick2 = () => {
    TEST_MOCK_DATA2.push({
      title: "테스트지롱",
      content: "테스트트트",
      isChecked: false,
    });
    console.log(TEST_MOCK_DATA2);
  };

  // 내부에 선언된 배열 값이 변경되어도 실제 화면은 변경되지 않는다.
  const handleWrongClick3 = () => {
    testMock.push({ title: "테스트지롱", content: "테스트트트" });
    console.log(testMock);
  };

  const handleClick = () => {
    setTestMock([...testMock, { title: "테스트지롱", content: "테스트트트" }]);
    // 화면상 바로 추가되는 모습은 보이지만 밑의 값은 변경되지 않은 수의 배열을 보여준다.
    console.log(testMock);
  };

  // 내부 선언된 배열 값이 변경되어도 실제 화면이 변경되지 않는다.
  const handleWrongRemove = (e) => (index) => {
    e.stopPropagation();
    setTestMock((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      // 배열은 참조타입이고 splice는 배열을 mutable하게 수정하는 함수기에 실제로 배열 값이 변경됬다라고 인지할 수 없다
      return prev;
    });
  };

  const handleRemove = (index) => {
    setTestMock((prev) => prev.filter((_, key) => key !== index));
  };

  const handleToggleCheckbox = (e) => (index) => {
    e.stopPropagation();
    setTestMock((prev) => {
      prev[index].isChecked = !prev[index].isChecked;
      return prev;
    });
  };

  return (
    <div className="Wrapper">
      {testMock.map((data, key) => (
        <TodoItem
          title={data.title}
          content={data.content}
          isChecked={data.isChecked}
          key={key}
          onClick={() => handleClick()}
          onRemove={() => handleRemove(key)}
          onToggle={(e) => handleToggleCheckbox(e)(key)}
        />
      ))}
    </div>
  );
}

export default App;
