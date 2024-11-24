import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

import { RxDashboard } from "react-icons/rx";
import { CgLogOut } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";



// Type definitions for the sidebar item
interface SubNavItem {
  title: string;
  path: string;
  icon: JSX.Element;
  cName?: string;
}

interface SidebarItem {
  title: string;
  path: string;
  icon: JSX.Element;
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  subNav?: SubNavItem[];
}

export const SidebarData: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/main-menu',
    icon: <RxDashboard />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaHistory />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Log Out',
    path: '/',
    icon: <CgLogOut />
  }
];
