```js
app.define('jquery', [], () => {
    return window.$;
});

app.define('underscore', [], () => {
    return window._;
});

app.define('backbone', ['jquery', 'underscore'], ($, _) => {
    return window.Backbone;
});

app.define('UserModel', ['backbone'], (Backbone) => {
    return Backbone.model.extend({
    
    });
});
```
