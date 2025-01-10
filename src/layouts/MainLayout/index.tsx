import {useEffect} from 'react';
import styles from './styles.module.scss';
import SideBar from "./SiderBar";
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess, handleSetIsShowSideBar} from "@/states/modules/app";
import useWindowSize from '../../utils/hooks/useWindowSize';
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

function MainLayout(props: any) {
    const {children} = props;
    const isShowSideBar = useAppSelector(state => state.app.isShowSideBar);
    const goToPage = useAppSelector(state => state.app.goToPage);
    const location = useAppSelector(state => state.app.location);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const windowSize = useWindowSize()

    useEffect(() => {
        if (goToPage.path && !goToPage.redirected) {
            dispatch(goToPageSuccess());
            navigate(goToPage.path);
        }
    }, [goToPage, navigate, dispatch]);

    useEffect(() => {
        if (windowSize.width <= 576) {
            setTimeout(() => dispatch(handleSetIsShowSideBar(false)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <div className={`${styles.boxMainLayout}`}>
            <div className={styles.mainLayoutWrap}>
                <SideBar
                    isShowSidebar={isShowSideBar}
                    handleToggleIsShowSideBar={handleSetIsShowSideBar}/>
                <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
                    <div className={styles.headerBox}>
                        <Header/>
                    </div>
                    <main className={styles.mainContentWrap}>
                        <div id='contentOfMainLayout' className={`${styles.content} relative px-[22px]`}>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
