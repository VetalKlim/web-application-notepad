import {Action} from '@ngrx/store';
import {InterfaceSubcategory} from '../interface/interfaceSubcategory';
import {InterfacePost} from '../interface/interfacePost';


export enum InfoUser {
  AddCategory = 'AddCategory',
  UpdateCategory = 'UpdateCategory',
  DeleteCategory = 'DeleteCategory',
  AddSubcategory = 'AddSubcategory',
  UpdateSubcategory = 'UpdateSubcategory',
  DeleteSubcategory = 'DeleteSubcategory',
  DeleteStore = 'DeleteStore',
  AddPost = 'AddPost',
  UpdatePost = 'UpdatePost',
  DeletePostOfCategory = 'DeletePostOfCategory',
  DeletePostOfSubcategory = 'DeletePostOfSubcategory',
  DeletePostEdit = 'DeletePostEdit',
  UpdatePostOfSubcategory = 'UpdatePostOfSubcategory',
  AddInfo = 'AdDInfo',
  UpdateUserName = 'UpdateUserName'
}

export enum AdminUser {
  DefaultTitle = 'DefaultTitle',
  SetTitle = 'SetTitle',
  UpdateTitle = 'UpdateTitle',
  DeleteStoreAdmin = 'DeleteStoreAdmin',
  DefaultDescription = 'DefaultDescription',
  SetDescription = 'SetDescription',
  UpdateDescription = 'UpdateDescription',
  DefaultPhoto = 'DefaultPhoto',
  UpdatePhoto = 'UpdatePhoto',
  DeletePhoto = 'DeletePhoto',
  DefaultShortInfo = 'DefaultShortInfo',
}


export class AddCategory implements Action {
  readonly type = InfoUser.AddCategory;

  constructor(public newCategory) {
  }
}

export class UpdateCategory implements Action {
  readonly type = InfoUser.UpdateCategory;

  constructor(public payload: { categoryId: string, nameCategory: string }) {
    console.log(payload);
  }
}

export class DeleteCategory {
  readonly type = InfoUser.DeleteCategory;

  constructor(public payload: { categoryId: string, nameCategory: string }) {
  }
}

export class AddSubcategory {
  readonly type = InfoUser.AddSubcategory;

  constructor(public newSubcategory) {
  }
}

export class UpdateSubcategory {
  readonly type = InfoUser.UpdateSubcategory;

  constructor(public payload: InterfaceSubcategory) {

  }
}

export class DeleteSubcategory {
  readonly type = InfoUser.DeleteSubcategory;

  constructor(public payload) {

  }

}

export class AddPost {
  readonly type = InfoUser.AddPost;

  constructor(public newPost: InterfacePost) {

  }
}

export class UpdatePost {
  readonly type = InfoUser.UpdatePost;

  constructor(public payload: InterfacePost) {

  }

}

export class DeletePostOfCategory {
  readonly type = InfoUser.DeletePostOfCategory;

  constructor(public payload) {

  }
}

export class DeletePostOfSubcategory {
  readonly type = InfoUser.DeletePostOfSubcategory;

  constructor(public payload) {

  }
}

export class DeletePostEdit {
  readonly type = InfoUser.DeletePostEdit;

  constructor(public payload) {

  }
}

export class UpdatePostOfSubcategory {
  readonly type = InfoUser.UpdatePostOfSubcategory;

  constructor(public payload) {

  }

}


export class DeleteStore implements Action {
  readonly type = InfoUser.DeleteStore;
}


export class AddInfo implements Action {
  readonly type = InfoUser.AddInfo;

  constructor(public infoUser) {
  }
}

export class UpdateUserName implements Action {
  readonly type = InfoUser.UpdateUserName;

  constructor(public userName) {

  }

}

export class DefaultTitle implements Action {
  readonly type = AdminUser.DefaultTitle;

  constructor(public info) {

  }
}

export class SetTitle implements Action {
  readonly type = AdminUser.SetTitle;

  constructor(public setTitle) {

  }
}

export class UpdateTitle implements Action {
  readonly type = AdminUser.UpdateTitle;

  constructor(public updateTitle) {
  }
}

export class DefaultDescription implements Action {
  readonly type = AdminUser.DefaultDescription;

  constructor(public description) {
    console.log(description);
  }
}

export class SetDescription implements Action {
  readonly type = AdminUser.SetDescription;

  constructor(public description) {

  }

}


export class UpdateDescription implements Action {
  readonly type = AdminUser.UpdateDescription;

  constructor(public updateDescription) {
  }
}

export class DefaultPhoto implements Action {
  readonly type = AdminUser.DefaultPhoto;

  constructor(public photo) {

  }
}

export class DeletePhoto implements Action {
  readonly type = AdminUser.DeletePhoto;

  constructor(public payload) {

  }
}

export class UpdatePhoto implements Action {
  readonly type = AdminUser.UpdatePhoto;

  constructor(public payload) {

  }
}

export class DefaultShortInfo implements Action {
  readonly type = AdminUser.DefaultShortInfo;

  constructor(public payload) {
  }
}



export class DeleteStoreAdmin implements Action {
  readonly type = AdminUser.DeleteStoreAdmin;
}


export type Category =
  AddCategory
  | DeleteCategory
  | UpdateCategory
  | AddSubcategory
  | UpdateSubcategory
  | DeleteSubcategory
  | AddPost
  | UpdatePost
  | UpdatePostOfSubcategory
  | DeletePostOfCategory
  | DeletePostOfSubcategory
  | DeletePostEdit
  | AddInfo
  | UpdateUserName
  | DeleteStore;


export type Admin =
  DefaultTitle
  | SetTitle
  | UpdateTitle
  | DeleteStoreAdmin
  | DefaultDescription
  | SetDescription
  | DefaultPhoto
  | DeletePhoto
  | UpdatePhoto
  | DefaultShortInfo
  | UpdateDescription;

