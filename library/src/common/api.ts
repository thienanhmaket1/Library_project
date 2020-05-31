import { environment } from 'src/environments/environment'

const apiURL = `${environment.server}/api`

export const allAPI = {
    /** Authen */
    register: `${apiURL}/authen/register`,
    authen_login: `${apiURL}/authen/login`,
    authen_verify_token: `${apiURL}/authen/verify-token`,

    /** Admin */
    // admin_manage_users_list: `${apiURL}/users/manage-users/list`,
    // admin_manage_users_create_user: `${apiURL}/users/manage-users/create-user`,
    // admin_manage_users_delete_user: `${apiURL}/users/manage-users/delete-user`,
    // admin_manage_users_edit_user: `${apiURL}/users/manage-users/edit-user`,

}
