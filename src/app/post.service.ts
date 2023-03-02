import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.mode';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}
  isLoading: boolean = false;
  loadedPosts: Post[];
  loadedPostsChanged = new Subject<Post[]>();
  errorHandling = new Subject<string>();

  createAndStorePosts(title: string) {
    const postData = { title: title };

    this.http
      .post(
        'https://angular-app-8c29b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData.body);
        },
        (error) => {
          this.errorHandling.next(error.message);
        }
      );
    console.log(postData);
  }
  onFetchPosts() {
    this.fetchPost();
  }
  fetchPost() {
    return this.http
      .get(
        'https://angular-app-8c29b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: new HttpParams().set('print', 'pretty'),
        }
      )
      .pipe(
        map((response: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postArray.push({ ...response[key], id: key });
            }
          }
          return postArray;
        })
      );
  }
  deletePosts() {
    return this.http
      .delete(
        'https://angular-app-8c29b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          observe: 'events',
          responseType: 'blob',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('response');
          }
          if (event.type === HttpEventType.Sent) {
            console.log('sent');
          }
        })
      );
  }
}
