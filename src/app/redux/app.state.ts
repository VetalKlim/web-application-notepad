import {CreateTopic} from '../interface/interfaceTopic';
import {InterfaceInfoUser} from '../interface/interfaceInfoUser';
import {InterfacePost} from '../interface/interfacePost';
import {InterfaceSubcategory} from '../interface/interfaceSubcategory';

export interface AppState {
  category: {
    category: CreateTopic[],
    subcategory: InterfaceSubcategory,
    info: InterfaceInfoUser,
    posts: InterfacePost
  };
}

export interface AppAdmin {
  admin: {
    photo: [],
    startPage: {
      nameApplication: [],
      description: [],
      shortInfo: []
    }
  };
}
