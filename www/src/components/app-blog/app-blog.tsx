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
  @State() currentPost: BlogIndexEntry = null;
  @State() postsBasePath = "https://posts.michaelodden.com";
  @State() showDrafts = false;

  articleEl: HTMLElement;

  async componentWillLoad() {
    // Look up posts.json
    if (window.location.hostname.startsWith("local")) {
      this.postsBasePath = "http://localhost:3334"
    }

    let params = new URLSearchParams(location.search);

    if (params.get("draft") != null) {
      this.showDrafts = true;
    }

    const posts = (await (await fetch(this.postsBasePath + "/posts.json")).json()) as BlogIndexEntry[];
    this.posts = posts.sort((a, b) => b.time_published.localeCompare(a.time_published));
  }

  getDefault() {
    return "";
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
    this.currentPost = entry;
    if (!entry) {
      return "404";
    }

    const entrySubpath = entry.active ? "finished" : "drafts";

    try {
      if (entry.path.endsWith(".md")) {
        return this.convertFromMdToRawHtml(await (await fetch(this.postsBasePath + "/" + entrySubpath + "/" + entry.path)).text())
      } else if (entry.path.endsWith(".latex")) {
        return this.convertFromLatexRawHtml(await (await fetch(this.postsBasePath + "/" + entrySubpath + "/" + entry.path)).text())
      } else if (entry.path.endsWith(".html")) {
        return await (await fetch(this.postsBasePath + "/" + entrySubpath + "/" + entry.path)).text()
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

  render() {
    const now = new Date();
    return [
      <div class="content-blog">
        {this.posts && <nav class="entries">
          <h2>Alle poster</h2>
          <MioEntries entries={this.posts} filter={(entry) => (this.showDrafts || (entry.active && now.getTime() > new Date(entry.time_published).getTime()))} />
        </nav>}

        {this.currentPost?.crossposts && this.currentPost?.crossposts.length > 0 && <aside>
          <p>Denne posten er også publisert følgende steder:</p>
          <ul>
            {this.currentPost.crossposts.map((el) => <li>
              <a href={el.url}>{el.title}</a>
            </li>)}
          </ul>
        </aside>}

        <article ref={(el) => this.articleEl = el}>{/*this.contents */}</article>

        {this.currentPost && <aside class="social">
          <h2>Diskuter</h2>
          <a target="_blank" href={`http://twitter.com/share?text=${this.currentPost.title}%20av%20@miodden&url=${window.location.href}&hashtags=`} title="Diskuter på twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="twtr-icon  twtr-color-fill--blue-dark  has-hover">
              <path opacity="0" d="M0 0h24v24H0z"></path>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </svg>
          </a>
        </aside>}
      </div>
    ];
  }
}
