import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Showdown from 'showdown';
import latexjs from 'latex.js'
import { BlogIndexEntry } from '../../global/types';
import { MioEntries } from '../mio-entries/mio-entries';



@Component({
  tag: 'app-blog',
  // styleUrl: 'app-blog.css',
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
    return "<p>...</p>";
  }

  convertFromMdToRawHtml(data: string) {
    Showdown.setFlavor('github');
    const converter = new Showdown.Converter({
      ghCompatibleHeaderId: true,
      simplifiedAutoLink: true,
      backslashEscapesHTMLTags: true,
      splitAdjacentBlockquotes: false,
    });
    return converter.makeHtml(data);
  }

  convertFromLatexRawHtml(data: string) {
    let generator = new latexjs.HtmlGenerator({ hyphenate: false })
    let doc = latexjs.parse(data, { generator: generator }).htmlDocument()
    return doc.querySelector(".body").innerHTML;
  }

  async getBlog(blog_id: string) {
    const entry = this.posts.find((el) => el.id === blog_id);
    if (!entry) {
      return "404";
    }

    try {
      if (entry.path.endsWith(".md")) {
        return this.convertFromMdToRawHtml(await (await fetch("/assets/posts/" + entry.path)).text())
      } else if (entry.path.endsWith(".latex")) {
        return this.convertFromLatexRawHtml(await (await fetch("/assets/posts/" + entry.path)).text())
      } else if (entry.path.endsWith(".html")) {
        return await (await fetch("/assets/posts/" + entry.path)).text()
      } else {
        return "400";
      }
    } catch (e) {
      return "404";
    }
  }

  async componentWillRender() {
    // Prepare
    this.contents = (this.match && this.match.params.id) ? await this.getBlog(this.match.params.id) : this.getDefault();

  }

  async componentDidRender() {
    this.articleEl.innerHTML = this.contents;
  }
  // TODO: Refactor out entry-list as separate component
  render() {
    return [
      <div class="content-blog">
        <nav>
          <h2>Alle poster</h2>
          <MioEntries entries={this.posts} />
        </nav>
        <article ref={(el) => this.articleEl = el}>{/*this.contents */}</article>
      </div>
    ];
  }
}
