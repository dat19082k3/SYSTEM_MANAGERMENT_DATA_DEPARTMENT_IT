import { Empty } from "antd";

export default function NoData({description}:{description:string}) {

    return (
        <Empty 
            description={<span className='text-[#a7a9ac]'>{description}</span>}
        />
    );
}
