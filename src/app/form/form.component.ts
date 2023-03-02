import { HttpClient } from '@angular/common/http';
import { BoundElementProperty } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../post.mode';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('f') formData: NgForm;
  @ViewChild('password') passwordd;
  basic: string = 'basic';
  checkP: boolean = false;
  loadedPosts: Post[];
  isLoading: boolean = false;
  error = null;
  constructor(private http: HttpClient, private postService: PostsService) {}
  subscription: Subscription;
  errorSub: Subscription;
  data = {
    email: '',
    password: '',
  };
  ngOnInit() {
    this.isLoading = true;
    this.postService.onFetchPosts();

    //errorHandling by Subject method
    this.errorSub = this.postService.errorHandling.subscribe((error) => {
      this.error = error;
    });

    this.subscription = this.postService.fetchPost().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.data.email = this.formData.value.userData.email;
    this.data.password = this.formData.value.userData.password;
    if (this.passwordd.nativeElement.value.length <= 1) this.checkP = true;

    console.log(this.checkP);
  }
  onCreatePost(title: string) {
    this.postService.createAndStorePosts(title);
    this.isLoading = true;

    this.postService.fetchPost().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
  onClearPost() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
      console.log(this.loadedPosts);
    });
  }
  onErrorHandle() {
    this.error = null;
  }
}
