import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ArticlesService } from '../../services/articles.service';

export interface Article {
  id: number;
  title: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.view.html',
  styleUrl: './home.view.css',
})
export class HomeComponent {
  title = 'articles-example';

  articles: Article[] = [];

  filteredArticles: Article[] = this.articles;

  private searchTerms = new Subject<string>();

  articlesService: ArticlesService = inject(ArticlesService);

  ngOnInit() {
    this.articlesService
      .getAllArticles()
      .then((articles) => {
        this.articles = articles;
        this.filteredArticles = articles;
        console.log('Articles:', articles);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }

  constructor() {
    this.searchTerms
      .pipe(
        debounceTime(750),
        distinctUntilChanged(),
        switchMap((term) => this.searchArticles(term))
      )
      .subscribe((filteredArticles) => {
        this.filteredArticles = filteredArticles;
      });
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  searchArticles(term: string): Observable<Article[]> {
    term = term.trim().toLowerCase();
    if (!term) {
      return of(this.articles);
    }
    return of(
      this.articles.filter((article) =>
        article.title.toLowerCase().includes(term)
      )
    );
  }
}
