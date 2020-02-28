export interface InterfacePost {
  nameCategory: string;
  categoryId: string;
  topic: string;
  subcategory: string;
  subcategoryId?: string;
  contentPost: string;
  postId?: string;
  date: Date;
  bookmark: boolean;
}
