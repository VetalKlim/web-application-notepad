import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CreateTopic} from '../interface/interfaceTopic';
import {InterfaceSubcategory} from '../interface/interfaceSubcategory';
import {InterfacePost} from '../interface/interfacePost';


@Injectable({providedIn: 'root'})
export class ServerDataUserService {
  uIdUser;

  constructor(private http: HttpClient) {
  }


  serverData(): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    return this.http.get(`${environment.fbUrl}/user/${this.uIdUser}.json`);
  }

  updateUserName(name): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    const newName = {
      name: name.name
    };
    return this.http.patch(`${environment.fbUrl}/user/${this.uIdUser}/info/${name.idUser}.json`, newName);
  }

  createCategory(name: CreateTopic): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    return this.http.post(`${environment.fbUrl}/user/${this.uIdUser}/categorises.json`, name);
  }

  editCategory(category: CreateTopic): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    const name = {
      nameCategory: category.nameCategory
    };
    return this.http.patch(`${environment.fbUrl}/user/${this.uIdUser}/categorises/${category.categoryId}.json`, name);
  }

  deleteCategory(category): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    return this.http.delete(`${environment.fbUrl}/user/${this.uIdUser}/categorises/${category.categoryId}.json`);
  }

  AddSubcategory(name: InterfaceSubcategory): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    return this.http.post(`${environment.fbUrl}/user/${this.uIdUser}/subcategory.json`, name);
  }

  editSubcategory(subcategory: InterfaceSubcategory): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    const name = {
      subcategory: subcategory.subcategory
    };
    return this.http.patch(`${environment.fbUrl}/user/${this.uIdUser}/subcategory/${subcategory.subcategoryId}.json`, name);
  }

  deleteSubcategory(subcategory: InterfaceSubcategory): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    return this.http.delete(`${environment.fbUrl}/user/${this.uIdUser}/subcategory/${subcategory.subcategoryId}.json`);
  }

  addPost(post: InterfacePost): Observable<any> {
    this.uIdUser = localStorage.getItem('uid');
    return this.http.post(`${environment.fbUrl}/user/${this.uIdUser}/posts.json`, post);
  }

  editPost(post: InterfacePost): Observable<any> {
    console.log(post);
    this.uIdUser = localStorage.getItem('uid');
    return this.http.patch(`${environment.fbUrl}/user/${this.uIdUser}/posts/${post.postId}.json`, post);
  }

  deletePostOfCategory(post): Observable<any> {
    console.log(post);
    this.uIdUser = localStorage.getItem('uid');
    return this.http.delete(`${environment.fbUrl}/user/${this.uIdUser}/posts/${post.postId}.json`);
  }

}

