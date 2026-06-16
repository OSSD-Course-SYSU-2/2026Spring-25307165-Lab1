import type { UserModel } from 'commonmultidevicecommunication/src/main/ets/model/UserModel';
import { UserListModel } from "@normalized:N&&&user/src/main/ets/model/UserListModel&1.0.0";
@ObservedV2
export class UserListViewModel {
    @Trace
    public users: UserModel[] = [];
    loadUsers() {
        let userList = new UserListModel([]);
        userList.loadUsers();
        for (let user of userList.users) {
            this.users.push(user);
        }
    }
}
