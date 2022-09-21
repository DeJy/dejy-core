
import { onAuthReady, initFirebase } from './database';
import { default as m } from "mithril"
import { defineCustomElements } from "@ionic/core/loader/index.cjs";

let _views = [];
let _loginView = '/login';
let _routeList = {};

function _checkAuth(page) {
  return new Promise(async (resolve, reject) => {
    // extract page view component
    let viewSrc = (await _views[page.split('/')[1]]()).default;
    // validate if a user is login or not
    onAuthReady(async user => {
      if (viewSrc.auth && !user) {
        // re-route to login view if no user and page is requiring auth
        m.route.set(_loginView);
        resolve;
      } else {
        resolve(viewSrc);
      }
    });
  });
}

const onMatch = { onmatch: (a, b, c) => _checkAuth(b) };

exports.initDeJy = async (dejyConfig, firebaseConfig) => {
  _views = dejyConfig.views;
  _loginView = dejyConfig.loginView;

  //loop views to build route list
  _routeList = {};
  for (var v in _views) {
    let linkName = "/" + v;
    let js = (await _views[v]()).default;
    // build arguement path
    if (js.arguments) {
      let argArray = js.arguments.trim().split(',');
      argArray.forEach(arg => {
        linkName += '/:' + arg.trim();
      })
    }
    _routeList[linkName] = onMatch
  };

  // load ionic custom elements
  await defineCustomElements(window);

  // init firebase if config is there
  firebaseConfig && initFirebase(firebaseConfig);

  m.route(document.getElementById(dejyConfig.rootElement), dejyConfig.defaultView, _routeList);

}

