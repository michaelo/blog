import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  render() {
    return (
      <div class="container">
        <header>
          <stencil-route-link url={"/"} exact={true}><img src="/assets/logo.png" alt="" /><br />Unlimited Edition</stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={1}>
              <stencil-route url='/' component='app-blog' exact={true} />
              <stencil-route url='/om' component='app-about' exact={true} />
              <stencil-route url='/blog/:id' component='app-blog' />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <footer>
          <p>
            &copy; michaelodden.com &mdash;
            <a target="_blank" href="https://twitter.com/miodden">Twitter</a> &mdash; <a target="_blank" href="https://www.linkedin.com/in/michaelodden">LinkedIn</a> &mdash; <a target="_blank" href="https://www.quora.com/profile/Michael-Odden">Quora</a>
          </p>
          <p>En plass for diverse notater, hovedsakelig relatert til programvareutvikling og beslektede temaer</p>
        </footer>
      </div>
    );
  }
}
