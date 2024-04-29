import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../interfaces/Article';

@Component({
  selector: 'app-article-li',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-li.component.html',
  styleUrl: './article-li.component.css',
})
export class ArticleLiComponent {
  @Input() article!: Article;
}
