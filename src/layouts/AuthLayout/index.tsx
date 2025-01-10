import {useEffect} from 'react';
import './styles.scss'
import styles from './styles.module.scss';
import Logo from "@/assets/images/logos/logo_ato2.png";
import {useNavigate} from "react-router-dom";
import {goToPageSuccess} from "@/states/modules/app/index.js";
import InlineSVG from 'react-inlinesvg';
import noSupportIcon from "@/assets/images/icons/noSupport/no-support.svg";
import {PAGE_LOGIN} from '@/utils/constaints.ts';
import {useAppDispatch, useAppSelector} from "@/states/hooks.ts";
import Lottie from 'lottie-react';
import logoLogin from '@/assets/animation/login.json';
import logoForgot from '@/assets/animation/forgot.json';
import logoReset from '@/assets/animation/reset-password.json';

function AuthLayout(props: any) {
    const {children, title, description} = props;
    const goToPage = useAppSelector(state => state.app.goToPage);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (goToPage.path && !goToPage.redirected) {
            dispatch(goToPageSuccess());
            navigate(goToPage.path);
        }
    }, [goToPage, navigate, dispatch]);

    return (
        <>
            <div className={styles.authLoginWrap}>
                <div className={styles.contentWrap}>
                    <div className={styles.contentContainer}>
                        <div className={styles.companyMobile}>
                            <img src={Logo} alt=""/>
                        </div>
                        <div className={styles.formWrap}>
                            <div className={styles.content}>
                                <div className={styles.header}>{title}</div>
                                <div className={styles.headerDetail}>{description}</div>
                                <div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.viewWrap}>
                   <div className='n:hidden md:flex md:justify-center md:items-center'>
                        {PAGE_LOGIN.LOGIN === title ? (
                            <Lottie animationData={logoLogin} loop={true} className="lg:w-[70%] xl:w-[75%] 2xl:w-[80%] h-full"/>
                        ) : PAGE_LOGIN.FORGOT_PASSWORD === title ? (
                            <Lottie animationData={logoForgot} loop={true} className="lg:w-[70%] xl:w-[80%] 2xl:w-full h-full"/>
                        ) : (
                            <Lottie animationData={logoReset} loop={true} className="lg:w-[70%] xl:w-[75%] 2xl:w-[80%] h-full"/>
                        )}
                   </div>
                </div>
            </div>
            <div className={`${styles.noSupport}`}>
                <InlineSVG className={`${styles.noSupIcon}`} src={noSupportIcon}/>
                <span className={`${styles.noSupText}`}>Không hỗ trợ!</span>
            </div>
        </>
    );
}

export default AuthLayout;
