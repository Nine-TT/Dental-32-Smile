export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },

            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                // { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                // { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },

            { //quản lý lịch khám

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',

            },




            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },

    { //quản lý cơ sở
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
            },

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },

    { //quản lý dịch vụ
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/doctor/manage-chedule',
            },

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },

    { //quản lý bài đăng
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //quản lý lịch khám
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
        ]
    }


];