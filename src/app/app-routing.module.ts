import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // パスが空の場合は /home にリダイレクトする
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./task-list/task-list.module').then((m) => m.TaskListPageModule),
  },
  {
    path: 'github-repos',
    loadChildren: () =>
      import('./github-repos/github-repos.module').then(
        (m) => m.GithubReposPageModule
      ),
  },
  {
    path: 'github-repo',
    loadChildren: () => import('./github-repo/github-repo.module').then( m => m.GithubRepoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
