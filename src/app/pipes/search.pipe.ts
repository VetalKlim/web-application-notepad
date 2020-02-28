import {Pipe, PipeTransform} from '@angular/core';
import {InterfacePost} from '../interface/interfacePost';

@Pipe({
  name: 'searchPosts'
})

export class SearchPipe implements PipeTransform {
  transform(posts: InterfacePost[], search = '', filed: string = ''): InterfacePost[] {
    if (!search.trim()) {
      return posts;
    } else {
      return posts.filter(post => {
        return post[filed].toLowerCase().includes(search.toLowerCase());
      });
    }

  }


}
