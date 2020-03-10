import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-about',
  // styleUrl: 'app-home.css',
  shadow: false
})
export class AppAbout {

  render() {
    return <div class='app-home'>
        <h1>Om michaelodden.com</h1>
        <p>
          Michael Oddens personlige nettside hvor det skrives stort sett om diverse sider relatert til programvareutvikling.
        </p>
      </div>;
  }
}
