import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts:{
      ID      : number,
      title   : string,
      content : string,
      date    : string,
  }[] = [];
  
  constructor(
      public navCtrl: NavController,
      public http: HttpClient,
      public loadingCtrl: LoadingController,
      public platform: Platform
  ) {}

    // 最初のページ読み込み時
    ionViewDidLoad(){
        if(!this.platform.is('android')){
            ga('send', 'pageview', '/signin');
        }

        // 記事取得までのローダー表示
        let loading = this.loadingCtrl.create();
        loading.present();

        // APIで記事データ取得
        this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/')
            .subscribe(data => {
                this.posts = data['posts'];

                // ローダー終了
                loading.dismiss();
            });
    }
}
