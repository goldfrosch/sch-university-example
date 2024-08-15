import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import Logo from "../assets/react.svg";

const LayoutInfo = styled.div`
  width: 400px;
  min-height: 100vh;
  box-shadow: 0px 0px 5px #aeaeae;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
`;

const Main = styled.main`
  flex: 1;
`;

const HeaderCategoryList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const HeaderCategoryItem = styled.li`
  color: black;
  padding: 12px;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
    opacity: 0.3;
  }
`;

export const Layout = () => {
  return (
    <LayoutInfo>
      <Header>
        <Link to="/">
          <img src={Logo} alt="main logo" />
        </Link>
        <HeaderCategoryList>
          <HeaderCategoryItem>
            <Link to="/product/1">추천 상품</Link>
          </HeaderCategoryItem>
          <HeaderCategoryItem>
            <Link to="/purchase/list">상품 구매 목록</Link>
          </HeaderCategoryItem>
        </HeaderCategoryList>
      </Header>
      <Main>
        {/* Outlet으로 선언해 이후에는 Router 하위 컴포넌트들이 들어간다고 선언 */}
        <Outlet />
      </Main>
    </LayoutInfo>
  );
};
