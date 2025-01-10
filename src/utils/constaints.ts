import {LiteralUnion} from "antd/es/_util/type";
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors";

export const PRODUCT_TYPE: string[] = [];
PRODUCT_TYPE[0] = "Sản phẩm bài báo"
PRODUCT_TYPE[1] = "Sản phẩm đào tạo"
PRODUCT_TYPE[2] = "Sản phẩm khác"

export const STATUS_SCIENCE: string[] = [];
STATUS_SCIENCE[0] = "Chưa nghiệm thu"
STATUS_SCIENCE[1] = "Không đạt"
STATUS_SCIENCE[2] = "Đạt"
STATUS_SCIENCE[3] = "Khá"
STATUS_SCIENCE[4] = "Tốt"

export const TYPE_SUBMIT = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
}

export const PROTECTED = {
    UNPROTECTED: 0,
    PROTECTED: 1,
};

export const PERMISSIONS = {
    SUPER_ADMIN: 'supper_admin',
    LIST: {
        DOWNLOAD_EXCEL_SCIENCE: "export-download-excel-science",
        DOWNLOAD_EXCEL_IDEA: "export-download-excel-idea",
        DOWNLOAD_EXCEL_PAPER: "export-download-excel-paper",
        DOWNLOAD_EXCEL_SEMINAR: "download-excel-seminar",
        SCIENCE_MANAGEMENT: "list-science-management",
        IDEA_MANAGEMENT: "list-idea-management",
        PAPER_MANAGEMENT: "list-paper-management",
        SEMINAR_MANAGEMENT: "list-seminar-management",
        USER_MANAGEMENT: "list-user-management",
        GRADUATE_MANAGEMENT: "list-graduate-management",
        FACULTY_MANAGEMENT: "list-faculty-management",
        PERMISSION_MANAGEMENT: "list-permission-management",
        ROLE_MANAGEMENT: "list-role-management",

    },
    ADD: {
        SCIENCE_MANAGEMENT: "add-science-management",
        IDEA_MANAGEMENT: "add-idea-management",
        PAPER_MANAGEMENT: "add-paper-management",
        SEMINAR_MANAGEMENT: "add-seminar-management",
        USER_MANAGEMENT: "add-user-management",
        GRADUATE_MANAGEMENT: "add-graduate-management",
        FACULTY_MANAGEMENT: "add-faculty-management",
        ROLE_MANAGEMENT: "add-role-management",
    },
    EDIT: {
        BACKUP_SCIENCE: "edit-backup-science",
        BACKUP_PAPER: "edit-backup-paper",
        BACKUP_SEMINAR: "edit-backup-seminar",
        RESET_PASSWORD_USER: "edit-reset-password-user",
        USER_WITH_ROLE: "edit-user-with-role",
        SCIENCE_MANAGEMENT: "edit-science-management",
        IDEA_MANAGEMENT: "edit-idea-management",
        PAPER_MANAGEMENT: "edit-paper-management",
        SEMINAR_MANAGEMENT: "edit-seminar-management",
        USER_MANAGEMENT: "edit-user-management",
        GRADUATE_MANAGEMENT: "edit-graduate-management",
        FACULTY_MANAGEMENT: "edit-faculty-management",
        PERMISSION_MANAGEMENT: "edit-permission-management",
        ROLE_MANAGEMENT: "edit-role-management",
    },
    DELETE: {
        USER_WITH_ROLE: "delete-user-with-role",
        SCIENCE_MANAGEMENT: "delete-science-management",
        IDEA_MANAGEMENT: "delete-idea-management",
        PAPER_MANAGEMENT: "delete-paper-management",
        SEMINAR_MANAGEMENT: "delete-seminar-management",
        USER_MANAGEMENT: "delete-user-management",
        GRADUATE_MANAGEMENT: "delete-graduate-management",
        FACULTY_MANAGEMENT: "delete-faculty-management",
        ROLE_MANAGEMENT: "delete-role-management",
    },
}


export const TYPE_MODAL_PACKAGE = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
}

export const OPTION_SELECT_LIMIT = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    }
];

export const OPTION_SELECT_STATUS = [
    {
        value: 0,
        label: 'Chưa nghiệm thu',
    },
    {
        value: 1,
        label: 'Đã nghiệm thu - Không đạt',
    },
    {
        value: 2,
        label: 'Đã nghiệm thu - Đạt',
    },
    {
        value: 3,
        label: 'Đã nghiệm thu - Khá',
    },
    {
        value: 4,
        label: 'Đã nghiệm thu - Tốt',
    }
];

export type ObjectStatus = {
    key: number,
    label: string,
    color: LiteralUnion<PresetColorType | PresetStatusColorType>
}

export const STATUS_NCKH: Array<ObjectStatus> = [
    {
        key: 0,
        label: 'Chưa nghiệm thu',
        color: 'gray',
    },
    {
        key: 1,
        label: 'Đã nghiệm thu - Không đạt',
        color: 'red',
    },
    {
        key: 2,
        label: 'Đã nghiệm thu - Đạt',
        color: 'green',
    },
    {
        key: 3,
        label: 'Đã nghiệm thu - Khá',
        color: 'blue',
    },
    {
        key: 4,
        label: 'Đã nghiệm thu - Tốt',
        color: 'gold ',
    },
];

export const handleFillStatus = (status: any, value: string): LiteralUnion<PresetColorType | PresetStatusColorType> | string | number | undefined => {
    const result: ObjectStatus | undefined = STATUS_NCKH.find((item) => item.key === status);
    return result && result[value as keyof ObjectStatus]
};

export const handleFillStatusColor = (status: any): LiteralUnion<PresetColorType | PresetStatusColorType> | undefined => {
    const result: ObjectStatus | undefined = STATUS_NCKH.find((item) => item.key === status);
    return result && result.color
};

export const OPTION_SELECT_PRODUCT_TYPE = [
    {
        value: 'Sản phẩm bài báo',
        label: 'Sản phẩm bài báo',
    },
    {
        value: 'Sản phẩm đào tạo',
        label: 'Sản phẩm đào tạo',
    },
    {
        value: 'Sản phẩm khác',
        label: 'Sản phẩm khác',
    }

];

export const PAGE_ERROR = {
    NOT_FOUND: "NOT_FOUND",
    FORBIDDEN: "FORBIDDEN"
}

export const PAGE_LOGIN = {
    FORGOT_PASSWORD: 'Quên mật khẩu',
    LOGIN: 'Đăng nhập',
    RESET_PASSWORD: 'Đặt lại mật khẩu',
};

export const TOPIC_TYPE = {
    1: "MINISTRY_OF_EDUCATION_AND_TRAINING",  // Đề tài BGD&ĐT
    2: "MINISTRY_OF_AGRICULTURE_AND_PTNT",  // Đề tài BNN&PTNT
    3: "BASIC_RESEARCH_PROJECT",    // Đề tài NC cơ bản
    4: "MINISTRY_LEVEL_PROJECT",   // Dự án SXTN cấp Bộ
    5: "LOCAL_PROJECT",  // Địa phương
    6: "INDEPENDENT_PROJECT", // Đề tài/dự án độc lập cấp quốc gia
    7: "NATIONAL_PROGRAM_PROJECT",  // Đề tài/dự án thuộc Chương trình KHCN trọng điểm cấp quốc gia
    8: "PROTOCOL_MISSION", // Nhiệm vụ Nghị định thư
    10: "STUDENT_RESEARCH_PROJECT",  // Đề tài sinh viên NCKH
    11: "INSTITUTIONAL_LEVEL_PROJECT",  // Đề tài cấp Học viện
    12: "TECHNOLOGY_INCUBATOR",  // Ươm tạo công nghệ
    13: "PRIORITY_PROJECT_HOCHIMINH",  // Đề tài trọng điểm Học viện
    14: "INTERNATIONAL_COOPERATION_PROJECT",  // Đề tài/dự án Hợp tác quốc tế (KP>=30.000$)
    15: "SPQG_PROGRAM",  // Chương trình SPQG
    16: "TAYBAC_PROGRAM",  // Chương trình Tây Bắc
    17: "TAYNAMBO_PROGRAM",  // Chương trình Tây Nam Bộ
    18: "SOUTH_PLANT_VARIETY_PROGRAM",  // CT Giống cây trồng phía Nam Bộ
    19: "INTERNATIONAL_PROJECT_UNDER_30K",  // Đề tài/dự án Hợp tác quốc tế (KP<30.000$)
    20: "TECHNOLOGY_TRANSFER_PROJECT",  // Hợp đồng chuyển giao KHCN
}

export const TOPIC_OPTIONS_TYPE = {
    1: "Đề tài BGD&ĐT",  //
    2: "Đề tài BNN&PTNT",  // Đề tài BNN&PTNT
    3: "Đề tài NC cơ bản",    // Đề tài NC cơ bản
    4: "Dự án SXTN cấp Bộ",   // Dự án SXTN cấp Bộ
    5: "Địa phương",  // Địa phương
    6: "Đề tài/dự án độc lập cấp quốc gia", // Đề tài/dự án độc lập cấp quốc gia
    7: "Đề tài/dự án thuộc Chương trình KHCN trọng điểm cấp quốc gia",  // Đề tài/dự án thuộc Chương trình KHCN trọng điểm cấp quốc gia
    8: "Nhiệm vụ Nghị định thư", // Nhiệm vụ Nghị định thư
    10: "Đề tài sinh viên NCKH",  // Đề tài sinh viên NCKH
    11: "Đề tài cấp Học viện",  // Đề tài cấp Học viện
    12: "Ươm tạo công nghệ",  // Ươm tạo công nghệ
    13: "Đề tài trọng điểm Học viện",  // Đề tài trọng điểm Học viện
    14: "Đề tài/dự án Hợp tác quốc tế (KP>=30.000$)",  // Đề tài/dự án Hợp tác quốc tế (KP>=30.000$)
    15: "Chương trình SPQG",  // Chương trình SPQG
    16: "Chương trình Tây Bắc",  // Chương trình Tây Bắc
    17: "Chương trình Tây Nam Bộ",  // Chương trình Tây Nam Bộ
    18: "CT Giống cây trồng phía Nam Bộ",  // CT Giống cây trồng phía Nam Bộ
    19: "Đề tài/dự án Hợp tác quốc tế (KP<30.000$)",  // Đề tài/dự án Hợp tác quốc tế (KP<30.000$)
    20: "Hợp đồng chuyển giao KHCN",  // Hợp đồng chuyển giao KHCN
}

export const MANAGER_LEVEL = {
    4: "NATIONAL_LEVEL",// Cấp quốc gia
    2: "MINISTRY_OF_EDUCATION",// Cấp Bộ GDĐT
    5: "INSTITUTIONAL_LEVEL",// Cấp cơ sở
    6: "LOCAL_LEVEL",// Địa phương
    8: "MINISTRY_OF_AGR_PTNT", // Cấp Bộ BNN&PTNT
    11: "NAFOSTED", // Nafosted
    9: "OTHER_MINISTRIES", // Cấp Bộ khác
    12: "ENTERPRISE", // Doanh nghiệp
}

export const MANAGER_OPTIONS_LEVEL = {
    4: "Cấp quốc gia",// Cấp quốc gia
    2: "Cấp Bộ GDĐT",// Cấp Bộ GDĐT
    5: "Cấp cơ sở",// Cấp cơ sở
    6: "Địa phương",// Địa phương
    8: "Cấp Bộ BNN&PTNT", // Cấp Bộ BNN&PTNT
    11: "Nafosted", // Nafosted
    9: "Cấp Bộ khác", // Cấp Bộ khác
    12: "Doanh nghiệp", // Doanh nghiệp
}

export const PAPER_TYPE = {
    1: "ISI",        // Tạp chí KH quốc tế (ISI)
    2: "OTHER",     // Tạp chí KH quốc tế (khác)
    3: "SECTOR_LEVEL",      // Tạp chí KH cấp ngành
    6: "SCOPUS",       // Tạp chí KH quốc tế trong Scopus
    7: "ACADEMY",        // Tạp chí KHNNVN (Học viện)
    8: "SCHOOL_LEVEL",         // Tạp chí KH cấp trường
    9: "KHNNVN_ENGLISH"         // Tạp chí KHNNVN (Tiếng Anh)
}

export const PAPER_TYPE_OPTIONS = {
    1: "Tạp chí KH quốc tế (ISI)",
    2: "Tạp chí KH quốc tế (khác)",
    3: "Tạp chí KH cấp ngành",
    6: "Tạp chí KH quốc tế trong Scopus",
    7: "Tạp chí KHNNVN (Học viện)",
    8: "Tạp chí KH cấp trường",
    9: "Tạp chí KHNNVN (Tiếng Anh)"
}

export const SEMINAR_TYPE = {
    1: "COUNTRY",// Hội thảo KH quốc gia (trình bày tham luận)
    2: "INTERNATIONAL", // Hội thảo KH quốc tế (trình bày tham luận)
    3: "ACADEMY_SCHOOL",  // Hội thảo KH cấp Học viện, Trường (trình bày tham luận)
    4: "SPECIAL_SEMINAR",   // Hội thảo KH chuyên đề, Seminar
    6: "POSTER_SEMINAR",    // Poster Hội thảo
    7: "OVERVIEW",     // Bài tổng quan (đăng trên trang thông tin Khoa, Học viện)
    10: "OVERVIEW_SEMINAR",      // Bài tổng quan đăng trên tạp chí
    11: "INTERNATIONAL_YEARBOOK",// Hội thảo KH quốc tế (bài đăng kỷ yếu)
    12: "COUNTRY_YEARBOOK",  // Hội thảo KH quốc gia (bài đăng kỷ yếu)
    13: "ACADEMY_YEARBOOK", // Hội thảo KH cấp Học viện (bài đăng kỷ yếu)
}

export const SEMINAR_TYPE_OPTIONS = {
    1: "Hội thảo KH quốc gia (trình bày tham luận)",
    2: "Hội thảo KH quốc tế (trình bày tham luận)",
    3: "Hội thảo KH cấp Học viện, Trường (trình bày tham luận)",
    4: "Hội thảo KH chuyên đề, Seminar",
    6: "Poster Hội thảo",
    7: "Bài tổng quan (đăng trên trang thông tin Khoa, Học viện)",
    10: "Bài tổng quan đăng trên tạp chí",
    11: "Hội thảo KH quốc tế (bài đăng kỷ yếu)",
    12: "Hội thảo KH quốc gia (bài đăng kỷ yếu)",
    13: "Hội thảo KH cấp Học viện (bài đăng kỷ yếu)",
}


export const OPTIONS_SOURCE = [
    {
        value: "Nguồn Học viện",
        label: "Nguồn Học viện"
    },
    {
        value: "BGD & ĐT",
        label: "BGD & ĐT"
    },
    {
        value: "Bộ KHCN",
        label: "Bộ KHCN"
    },
    {
        value: "Bộ NN&PTNT",
        label: "Bộ NN&PTNT"
    },
    {
        value: "Dự án Việt-Bỉ",
        label: "Dự án Việt-Bỉ"
    },
    {
        value: "Địa phương",
        label: "Địa phương"
    },
    {
        value: "Nguồn khác",
        label: "Nguồn khác"
    },
    {
        value: "Hợp tác quốc tế",
        label: "Hợp tác quốc tế"
    },

]

export const changeObjToOptions = (obj: any) => {
    const arr: Array<any> = []
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            arr.push({
                value: Number(key),
                label: obj[key]
            })
        }
    }

    return arr;
}