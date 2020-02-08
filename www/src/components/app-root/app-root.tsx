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
          <stencil-route-link url={"/"} exact={true}>Unlimited Edition</stencil-route-link>
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
          <p>&copy; michaelodden.com &mdash; <a target="_blank" href="https://twitter.com/miodden">Twitter</a> &mdash; <a target="_blank" href="https://www.linkedin.com/in/michaelodden">LinkedIn</a></p>
          <p>En plass for diverse skriblerier, hovedsakelig orientert rundt programvareutvikling og beslektede temaer</p>
          {/* <a href="https://twitter.com/miodden?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @miodden</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
        </footer>
      </div>
    );
  }
}
