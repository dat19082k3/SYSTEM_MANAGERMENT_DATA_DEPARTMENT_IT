import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import ImageUser from '../../../../src/assets/images/logos/user_default.png'
import InlineSVG from 'react-inlinesvg';
import barsIcon from '@/assets/images/icons/duotone/bars.svg'
import {handleSetIsShowSideBar} from '@/states/modules/app';
import useWindowSize from '@/utils/hooks/useWindowSize';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";

const Header = () => {

    const titlePage = useAppSelector(state => state.app.title);
    const dispatch = useAppDispatch()
    const breadcrumb = useAppSelector(state => state.app.breadcrumb);

    const windowSize = useWindowSize()

    const handleRenderItemBreadCrumb = (index: number, item: any) => {
        switch (index) {
            case 0:
                return (
                    <>  <Link to={item.path}><span
                        className={`${styles.text}`}>{item.name}</span></Link>
                        {breadcrumb?.length !== 1 && "-"} </>
                );
            case breadcrumb.length - 1:
                return (
                    <Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link>
                );
            default:
                return (
                    <><Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link> - </>
                );
        }
    }

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
                <div className='px-[20px] h-[74px] bg-gray-100 py-3'>
                    {
                        titlePage ? <div className={styles.headerMainWrap}>
                            <div className={styles.titleWrap}>{titlePage}</div>
                        </div> : ''}
                    {
                        breadcrumb?.length > 0 ?
                            <div className={styles.breadcrumbWrap}>
                                {
                                    breadcrumb.map((item: any, index: number) => {
                                        return <span
                                            key={index}>{(handleRenderItemBreadCrumb(index, item))}</span>
                                    })
                                }
                            </div> : ''
                    }
                </div>
                {
                    ((windowSize.width <= 576)) ?
                        <InlineSVG onClick={() => dispatch(handleSetIsShowSideBar(true))} src={barsIcon} width={20}
                                   className={`cursor-pointer`}/> : ""
                }
            </div>
            <div className={`${styles.headerRightWrap}`}>
                <div className={`${styles.itemHeaderRight}`}>
                    <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo}
                             trigger="click">
                        <div className={styles.infoWrap}>
                            <div className={styles.avatarWrap}>
                                <img src={ImageUser} alt=""/>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </header>
    );
}

export default Header
