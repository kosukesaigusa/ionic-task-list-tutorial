import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.page.html',
  styleUrls: ['./github-repos.page.scss'],
})
export class GithubReposPage implements OnInit {
  readonly pageTitle = 'GitHub リポジトリ';

  gitHubRepos: GitHubRepo[] = [];

  constructor(
    public http: HttpClient,
    public loadingController: LoadingController
  ) {}

  /**
   * ページの表示が完了する際に発火するライフサイクルイベント。
   * ローディングを管理しつつ、GitHub の Search Repositories API をコールする。
   *  */
  async ionViewDidEnter(): Promise<void> {
    const loadingElement = await this.loadingController.create({
      message: 'Loading...',
    });
    await loadingElement.present();
    try {
      const response = await this.http
        .get<SearchGitHubReposResponse>(
          'https://api.github.com/search/repositories',
          {
            headers: {
              accept: 'application/vnd.github.v3+json',
            },
            params: {
              q: 'ionic',
              page: 1,
              perPage: 100,
            },
          }
        )
        .toPromise();
      this.gitHubRepos = response.items;
    } finally {
      loadingElement.dismiss();
    }
  }

  ngOnInit(): void {}
}
