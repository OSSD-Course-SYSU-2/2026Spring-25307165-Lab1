import type { SocialModel } from '../model/SocialModel';
import SocialListModel from "@normalized:N&&&social/src/main/ets/model/SocialListModel&1.0.0";
@ObservedV2
export default class SocialListViewModel {
    @Trace
    public socials: SocialModel[] = [];
    loadSocials() {
        let socialList = new SocialListModel([]);
        socialList.loadSocials();
        for (let social of socialList.socials) {
            this.socials.push(social);
        }
    }
}
