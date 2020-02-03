import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (
      <div class="container">
        <header>
          Unlimited Edition
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-blog' exact={true} />
              <stencil-route url='/om' component='app-about' exact={true} />
              <stencil-route url='/blog/:id' component='app-blog' />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <footer>
          <a href="mailto:me@michaelodden.com">me@michaelodden.com</a>
        </footer>
      </div>
    );
  }
}
