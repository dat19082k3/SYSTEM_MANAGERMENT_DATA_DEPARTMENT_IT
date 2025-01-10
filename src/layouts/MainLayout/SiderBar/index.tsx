import { useState } from "react";
import styles from "./styles.module.scss";
import { MenuFoldOutlined } from "@ant-design/icons";
import NavItem from "./components/NavItem";
import { routeMap } from "@/router/routeMap";
import { useNavigate } from "react-router-dom";
import { handleSetIsShowSideBar } from "@/states/modules/app";
import useWindowSize from "../../../utils/hooks/useWindowSize.ts";
import InlineSVG from "react-inlinesvg";
import timeIcon from "@/assets/images/icons/duotone/times.svg";
import { handleCheckRoute } from "@/utils/helper.tsx";
// import logo from '@/assets/images/logos/logo2.svg'
// import logo2 from "@/assets/images/logos/icon2.png";
import { useAppDispatch, useAppSelector } from "@/states/hooks.ts";
import logo from "@/assets/animation/logo-document.json";
import Lottie from "lottie-react";

interface Sidebar {
  isShowSidebar: Boolean;
  handleToggleIsShowSideBar: Function;
}

function SideBar({ isShowSidebar = true, handleToggleIsShowSideBar }: Sidebar) {
  const [indexNavItemSelect, setIndexNavItemSelect] = useState(null);
  const [menuSub, setMenuSub] = useState([]);
  const [topMenuSub, setTopMenuSub] = useState(0);
  const me = useAppSelector((state) => state.auth.authUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const windowSize = useWindowSize();
  const set = new Set(me.permissions);

  const handleToggleMenu = (indexNavItem: any, menuNavItem: any) => {
    if (menuNavItem.path) {
      navigate(menuNavItem.path);
    }
    if (isShowSidebar) {
      setIndexNavItemSelect(
        indexNavItem !== indexNavItemSelect ? indexNavItem : null
      );
    }
  };

  const handleHoverMenuNavItem = (e: any, menuNavItem: any) => {
    const { top } = e.target.getBoundingClientRect();
    setTopMenuSub(top);
    if (menuNavItem.children) {
      setMenuSub(menuNavItem.children);
    } else {
      setMenuSub([]);
    }
  };

  const handleLeaveMenuNavItem = () => {
    setMenuSub([]);
  };

  return (
    <div
      onMouseLeave={() => handleLeaveMenuNavItem()}
      className={`${styles.sideBarWrap} ${
        !isShowSidebar ? styles.sideBarWrapClose : ""
      }`}
    >
      <div className={styles.logoWrap}>
        {windowSize.width <= 576 ? (
          <InlineSVG
            onClick={(e) => {
              dispatch(handleSetIsShowSideBar(false));
              e.stopPropagation();
            }}
            src={timeIcon}
            className="absolute top-[50%] right-[10px] translate-y-[-50%] w-[30px] h-[20px] cursor-pointer"
          />
        ) : (
          ""
        )}
        {isShowSidebar ? (
          <div
            className={`${styles.imgWrap} text-white items-center font-bold`}
          >
            <Lottie animationData={logo} loop={true} className="h-[90px] p-2" />
            <span className="text-3xl font-extrabold" style={{ fontFamily: 'Roboto Slab, serif' }}>FITA</span>
          </div>
        ) : (
          <div
            className={`${styles.imgWrap} ${styles.imgWrapDesktop} text-white items-center font-bold`}
          >
            <Lottie animationData={logo} loop={true} className="h-14" />
          </div>
        )}

        <div
          className={`${styles.btnToggleSideBar} ${
            styles.btnToggleSideBarMobi
          } ${!isShowSidebar ? styles.btnToggleSideBarClose : ""}`}
          onClick={() => handleToggleIsShowSideBar()}
        >
          <MenuFoldOutlined />
        </div>
      </div>

      <div className={`${styles.navbarWrap}`}>
        <ul className={`${styles.menuNav}`}>
          {routeMap.map((route, index) => {
            if (
              !route.permissions ||
              route.permissions.some((i) => set.has(i))
            ) {
              return (
                <li
                  onMouseEnter={(e) => handleHoverMenuNavItem(e, route)}
                  onClick={() => handleToggleMenu(index, route)}
                  key={route.path}
                  className={`${styles.menuNavItem}`}
                >
                  <NavItem
                    route={route}
                    isShowMenu={index === indexNavItemSelect}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>

      <div
        className={`${styles.btnToggleIsShowSideBar} ${
          !isShowSidebar ? styles.btnToggleIsHideSideBar : ""
        }`}
      >
        {windowSize.width > 576 ? (
          <svg
            onClick={() => dispatch(handleSetIsShowSideBar(!isShowSidebar))}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5.5 7.5 8l6 7.5" stroke="currentColor" />
            <path d="M8.5.5 2.5 8l6 7.5" stroke="currentColor" />
          </svg>
        ) : (
          ""
        )}
      </div>

      {!isShowSidebar && menuSub && menuSub.length > 0 ? (
        <div
          className={`${styles.boxMenuSubWrap}`}
          style={{
            top: `${topMenuSub}px`,
          }}
        >
          <div className={styles.listMenuSub}>
            <ul className={styles.menuSubClose}>
              {menuSub.map((menuSubItem: any) => {
                return (
                  <li
                    className={styles.menuSubCloseItem}
                    key={`close${menuSubItem.path}`}
                  >
                    <div
                      onClick={() => navigate(menuSubItem.path)}
                      className={`
                              ${styles.contentSubItemWrap} 
                              ${
                                handleCheckRoute(menuSubItem.routeActive)
                                  ? styles.menuSubItemActive
                                  : ""
                              }
                            `}
                    >
                      <div className={styles.textWrap}>
                        <span className={styles.text}>
                          {" "}
                          {menuSubItem.label}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SideBar;
