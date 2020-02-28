import {Admin, AdminUser, Category, InfoUser} from './category.action';

const initialState = {
  info: [],
  category: [],
  subcategory: [],
  posts: []
};
const initialStateAdmin = {
  photo: [],
  startPage: {
    nameApplication: [],
    description: [],
    shortInfo: []

  }
};

export function adminReducer(state = initialStateAdmin, action: Admin) {
  switch (action.type) {
    case AdminUser.DefaultTitle:
      return {
        ...state,
        startPage: {
          nameApplication: {nameApplication: action.info}
        }
      };
    case AdminUser.SetTitle:
      return {
        ...state,
        startPage: {
          nameApplication: action.setTitle
        }
      };
    case AdminUser.UpdateTitle:
      const update = [];
      state.startPage.nameApplication.find(r => {
        if (r.id === action.updateTitle.id) {
          update.push({
            ...r,
            nameApplication: action.updateTitle.nameApplication,
          });
        }
      });
      return {
        ...state,
        startPage: {
          ...state.startPage,
          nameApplication: update
        }
      };
    case AdminUser.DefaultDescription:
      return {
        ...state,
        startPage: {
          ...state.startPage.nameApplication,
          description: action.description
        }
      };
    case AdminUser.SetDescription:
      return {
        ...state,
        startPage: {
          description: action.description
        }
      };
    case AdminUser.UpdateDescription:
      const updateDescription = [];
      state.startPage.description.find(d => {
        if (d.id === action.updateDescription.id) {
          updateDescription.push({
            ...d,
            description: action.updateDescription.description
          });
        }
      });
      return {
        ...state,
        startPage: {
          ...state.startPage,
          description: updateDescription
        }
      };
    case AdminUser.DefaultPhoto:
      return {
        ...state,
        photo: [
          ...state.photo,
          action.photo
        ]

      };
    case AdminUser.UpdatePhoto:
      const updatePhotoAll = [];
      state.photo.forEach(elem => {
        if (elem.id === action.payload.id) {
          updatePhotoAll.push({
            ...elem,
            text: action.payload.text
          });
        } else {
          updatePhotoAll.push(elem);
        }
      });
      return {
        ...state,
        photo: updatePhotoAll
      };
    case AdminUser.DeletePhoto:
      return {
        ...state,
        photo: [...state.photo.filter(p => p.id !== action.payload.id)]
      };
    case AdminUser.DefaultShortInfo:
      return {
        ...state,
        startPage: {
          ...state.startPage,
          shortInfo: action.payload
        }
      };
    case AdminUser.DeleteStoreAdmin:
      return {
        startPage: {
          nameApplication: [],
          description: [],
          photo: []
        }
      };
    default :
      return state;
  }
}


export function categoryReducer(state = initialState, action: Category) {
  switch (action.type) {
    case InfoUser.AddInfo:
      return {
        ...state,
        info: action.infoUser
      };
    case InfoUser.UpdateUserName:
      return {
        ...state,
        info: [
          action.userName
        ]
      };
    case InfoUser.AddCategory:
      return {
        ...state,
        category: [
          ...state.category,
          action.newCategory
        ]
      };
    case InfoUser.UpdateCategory:
      // обновление выбранной категории.
      const updateCategory = action.payload;
      const updateCategoryAll = [];
      state.category.forEach(elem => {
        if (elem.categoryId === updateCategory.categoryId) {
          updateCategoryAll.push({
            ...elem,
            nameCategory: updateCategory.nameCategory
          });
        } else {
          updateCategoryAll.push(elem);
        }
      });
      return {
        ...state,
        category: updateCategoryAll

      };
    case InfoUser.DeleteCategory:
      return {
        ...state,
        category: [...state.category.filter(r => r.categoryId !== action.payload.categoryId)]
      };
    case InfoUser.AddSubcategory:
      return {
        ...state,
        subcategory: [
          ...state.subcategory,
          action.newSubcategory
        ]
      };
    case InfoUser.UpdateSubcategory:
      const updateSubcategory = action.payload;
      const updateSubcategoryAll = [];
      state.subcategory.forEach(elem => {
        if (elem.subcategoryId === updateSubcategory.subcategoryId) {
          updateSubcategoryAll.push({
            ...elem,
            subcategory: updateSubcategory.subcategory
          });
        } else {
          updateSubcategoryAll.push(elem);
        }
      });
      return {
        ...state,
        subcategory: updateSubcategoryAll
      };
    case InfoUser.DeleteSubcategory:
      return {
        ...state,
        subcategory: [...state.subcategory.filter(r => r.subcategoryId !== action.payload.subcategoryId)]
      };
    case InfoUser.AddPost:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.newPost
        ]
      };
    case InfoUser.UpdatePost:
      const post = action.payload;
      const postAll = [];
      state.posts.forEach(elem => {
        if (elem.postId === action.payload.postId) {
          postAll.push(post);
        } else {
          postAll.push(elem);
        }
      });
      return {
        ...state,
        posts: postAll
      };
    case InfoUser.UpdatePostOfSubcategory:
      const updatePostOfSubcategory = action.payload;
      const updatePostOfSubcategoryAll = [];
      state.posts.forEach(elem => {
        if (elem.subcategoryId === updatePostOfSubcategory.subcategoryId) {
          updatePostOfSubcategoryAll.push({
            ...elem,
            subcategory: updatePostOfSubcategory.subcategory
          });
        } else {
          updatePostOfSubcategoryAll.push(elem);
        }
      });
      return {
        ...state,
        posts: updatePostOfSubcategoryAll
      };
    case InfoUser.DeletePostOfCategory:
      return {
        ...state,
        posts: [...state.posts.filter(p => p.categoryId !== action.payload.categoryId)]
      };
    case InfoUser.DeletePostOfSubcategory:
      return {
        ...state,
        posts: [...state.posts.filter(p => p.subcategoryId !== action.payload.subcategoryId)]
      };
    case InfoUser.DeletePostEdit:
      return {
        ...state,
        posts: [...state.posts.filter(p => p.postId !== action.payload.postId)]
      };
    case InfoUser.DeleteStore:
      return {
        category: [],
        subcategory: [],
        info: [],
        posts: [],
      };
    default :
      return state;
  }

}

