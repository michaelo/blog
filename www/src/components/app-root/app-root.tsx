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
          <stencil-route-link url={"/"} exact={true}>Unlimited Edition</stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={10}>
              <stencil-route url='/' component='app-blog' exact={true} />
              <stencil-route url='/om' component='app-about' exact={true} />
              <stencil-route url='/blog/:id' component='app-blog' />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <footer>
          &copy; michaelodden.com - En plass for diverse skriblerier, hovedsakelig orientert rundt programvareutvikling og beslektede temaer.
        </footer>
      </div>
    );
  }
}
