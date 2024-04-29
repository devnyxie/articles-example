import { Injectable } from '@angular/core';
import { Article } from '../interfaces/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  url = 'http://localhost:3000/articles';

  async getAllArticles() {
    try {
      const response = await fetch(this.url + '?_embed=author');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
