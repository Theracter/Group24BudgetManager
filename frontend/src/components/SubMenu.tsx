import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

// Type for the `item` prop
interface SubMenuProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
    iconClosed?: JSX.Element;
    iconOpened?: JSX.Element;
    subNav?: {
      title: string;
      path: string;
      icon: JSX.Element;
      cName?: string;
    }[];
  };
}

const SubMenu: React.FC<SubMenuProps> = ({ item }) => {
  const [subnav, setSubnav] = useState<boolean>(false); // Type for state

  const showSubnav = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    setSubnav(!subnav); // Toggle dropdown
  };

  return (
    <>
      {/* If there's a subNav, prevent navigation when clicked */}
      <SidebarLink to={item.subNav ? '#' : item.path} onClick={item.subNav ? showSubnav : undefined}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>

      {/* If subnav is open, render the dropdown items */}
      {subnav &&
        item.subNav?.map((subItem, index) => (
          <DropdownLink to={subItem.path} key={index}>
            {subItem.icon}
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
