import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

interface BlogIndexEntry {
  id: string;
  title: string;
  byline: string;
  time_created: string;
  time_updated: string;
  active: boolean;
}

@Component({
  tag: 'app-blog',
  // styleUrl: 'app-profile.css',
  shadow: false
})
export class AppBlog {
  @Prop() match: MatchResults;
  @State() posts: BlogIndexEntry[];
  @State() contents: string;
  articleEl: HTMLElement;

  async componentWillLoad() {
    // Look up posts.json
    this.posts = await (await fetch("/assets/posts.json")).json();
  }

  getDefault() {
    return <p>Velg post fra meny til venstre</p>;
  }

  async getBlog(blog_id: string) {
    const blogdata = await (await fetch("/assets/posts/" + blog_id + ".md")).text();
    // console.log(blogdata);
    // Look up file from blog_id
    // Convert from markdown to HTML
    // Render
    return blogdata;
  }

  async componentWillRender() {
    // Prepare
    this.contents = (this.match && this.match.params.id) ? await this.getBlog(this.match.params.id) : this.getDefault();

  }

  async componentDidRender() {
    this.articleEl.innerHTML = this.contents;
  }

  render() {
    return [
      <nav>
        <ul>
          {this.posts && this.posts.map((entry) => <li><stencil-route-link url={"/blog/" + entry.id} exact={true}>{entry.title}</stencil-route-link></li>)}
        </ul>
      </nav>,
      <article ref={(el) => this.articleEl = el }>{/*this.contents */}</article>
    ];
  }
}
