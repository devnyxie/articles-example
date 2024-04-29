import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../interfaces/Article';

@Component({
  selector: 'app-article-view',
  templateUrl: './article.view.html',
  styleUrls: ['./article.view.css'],
})
export class ArticleViewComponent implements OnInit {
  article!: Article;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.params['id'];
    console.log('Article ID:', articleId);
    if (articleId) {
      this.articlesService.getArticleById(articleId).then(
        (response: any) => {
          this.article = response;
          console.log('Article:', this.article);
        },
        (error: any) => {
          console.error('Failed to get article:', error);
        }
      );
    }
  }
}
