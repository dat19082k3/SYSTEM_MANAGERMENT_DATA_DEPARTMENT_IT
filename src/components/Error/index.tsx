import {PAGE_ERROR} from '@/utils/constaints.ts';
import ImageNotFound from '@/assets/images/error/not-found.png'
import ImageForbidden from '@/assets/images/error/forbidden.png'
import MainLayout from '@/layouts/MainLayout';

function PageError({type, title}: {
    type: string,
    title: string
}) {
    return (
        <MainLayout>
            <div
                className='flex justify-center items-center h-[calc(100vh_-_130px)] rounded-2xl bg-white shadow-card-page'>
                <div className='text-center'>
                    <img
                        src={type === PAGE_ERROR.NOT_FOUND ? ImageNotFound : ImageForbidden}
                        alt="img-err"
                    />
                    <p className='text-[#121213] font-semibold m-5'>
                        {title}
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}

export default PageError;