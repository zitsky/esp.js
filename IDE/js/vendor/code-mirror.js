define(function(require) {
  return {

    load: function(name, req, onload, config) {

      /**
       * Check all needed config keys
       */
      if (!config.hasOwnProperty('cm')
          && config['cm'].hasOwnProperty('baseUrl')
          && config['cm'].hasOwnProperty('path')
          && config['cm'].hasOwnProperty('css')
          && config['cm'].hasOwnProperty('modes')
          && config['cm']['modes'].hasOwnProperty('path')) {

        throw new Error('cm, cm.baseUrl, cm.path, cm.css, cm.modes.path should be defined at RequireJS config');
      }

      var css = {
        load: function(id, url) {
          if (req.isBrowser && !document.getElementById(id)) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.id = id;
            document.getElementsByTagName("head")[0].appendChild(link);
          }
        },

        loadTheme: function(theme, url) {
          this.load('code-mirror-theme-' + theme, url);
        },

        loadCss: function(url) {
          this.load('code-mirror-css', url);
        }
      };

      /**
       * cm - config for codemirror loader from requirejs.config
       */
      var cm = config.cm;

      var scripts = [];

      /**
       * Add codemirror lib as first including script
       */
      scripts.push(cm.baseUrl + cm.path);

      var parsed = name.split(':');
      var name = parsed[0];
      var themes = parsed[1];

      if (name != '@') {
        var modes = name.split('|');

        for (var i = 0; i < modes.length; i++) {
          var mode = cm.baseUrl + cm.modes.path.replace(
                  new RegExp('{mode}', 'g'), modes[i]
              );
          scripts.push(mode);
        }
      }

      if (cm.hasOwnProperty('css')) {
        css.loadCss(cm.css);
      }

      if (themes) {
        if (!cm.hasOwnProperty('themes')) {
          throw new Error('Try to load theme but themes are not defined at config');
        }

        themes = themes.split('|');

        for (i = 0; i < themes.length; i++) {
          var theme = themes[i];

          if (!cm.themes.hasOwnProperty(theme)) {
            throw new Error('Try to load theme but theme is not defined at config: ' + theme);
          }

          css.loadTheme(theme, cm.themes[theme]);
        }
      }

      /**
       * Require all scripts and as return values always will be codemirror object
       */
      require(scripts, function(CodeMirror) {
        onload(CodeMirror);
      });

      /**
       * Fucking hard fix for r.js
       * https://github.com/jrburke/requirejs/pull/1064
       */
      if (!req.isBrowser) {
        onload();
      }
    }
  }
});

