
export const permission = [
    { permission_code: '99', permission_title: 'Admin' }, // full permission
    { permission_code: '01', permission_title: 'Usernormal' }, // usernormal
]
export const defaultTopItems = [
    {
        title: 'Trang chủ',
        link: 'book/category',
        icon: 'home',
    },
]

export const defaultBottomItems = [
    {
        title: 'Đăng xuất',
        icon: 'log-out',
        id: 'log_out',
    },
]

export const defaultMessageConfig = {
    content: '',
    title: '',
    status: 'primary',
    position: 4,
    duration: 3000,
}


export const usernormalItems = [
    {
        title: 'Tìm kiếm tài liệu',
                expanded: true,
                children: [
                    {
                        title: 'Tài liệu',
                        link: 'book/search-document',
                        icon: 'search',
                    },
                ]
    },
    {
        title: 'Tìm kiếm sách',
                expanded: true,
                children: [
                    {
                        title: 'Sách',
                        link: 'bookstore/search-book',
                        icon: 'search',
                    },
                ]
    }

]

export const adminItems: any = [
            {
                title: 'Sách',
                expanded: true,
                children: [
                    {
                        title: 'Loại tài liệu',
                        link: 'book/category',
                        icon: 'calendar',
                    },
                    {
                        title: 'Tài liệu',
                        link: 'book/document',
                        icon: 'book',
                    },
                ],
            },
            {
                title: 'Cửa hàng sách',
                expanded: true,
                children: [
                    {
                        title: 'Chuyên ngành',
                        link: 'bookstore/specialized',
                        icon: 'calendar',
                    },
                    {
                        title: 'Sách chuyên ngành',
                        link: 'bookstore/specialized-book',
                        icon: 'book-open',
                    },
                ],
            },
            {
                title: 'Quản lý tài khoản',
                link: 'user',
                icon: 'person',
            },
]



