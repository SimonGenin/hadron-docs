webpackJsonp([7742378928488],{292:function(n,a){n.exports={data:{markdownRemark:{html:'<h2 id="installation"><a href="#installation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Installation</h2>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> @brainhubeu/hadron-events --save</code></pre>\n      </div>\n<p><a href="/docs/basics/core/#installation">More info about installation</a></p>\n<h2 id="overview"><a href="#overview" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Overview</h2>\n<p>Event Manager is a tool which allows for manipulating Hadron\'s default behavior without the need to change the code base. It can be achieved via custom listeners defined by the developer. There are a bunch of extension points spread all over the Hadron framework where listeners can be hooked up.</p>\n<h2 id="initializing"><a href="#initializing" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Initializing</h2>\n<p>Pass the package as an argument for Hadron bootstrapping function:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> hadronEvents <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'@brainhubeu/hadron-events\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// ... importing and initializing other components</span>\n\n<span class="token function">hadron</span><span class="token punctuation">(</span>expressApp<span class="token punctuation">,</span> <span class="token punctuation">[</span>hadronEvents<span class="token punctuation">]</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Hadron with eventManager initialized\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>After initialization you can retrieve the event manager from the DI container - it is registered under the key <code class="language-text">eventManager</code>.</p>\n<h2 id="event-manager-methods"><a href="#event-manager-methods" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Event Manager methods</h2>\n<h3 id="registering-listeners-for-events"><a href="#registering-listeners-for-events" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Registering listeners for events</h3>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript">eventManager<span class="token punctuation">.</span><span class="token function">registerEvents</span><span class="token punctuation">(</span>listeners<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<ul>\n<li><code class="language-text">listeners</code> - an array of objects which have to follow the convention shown below:</li>\n</ul>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'string\'</span><span class="token punctuation">,</span>  <span class="token comment">// listener name</span>\n  event<span class="token punctuation">:</span> <span class="token string">\'string\'</span><span class="token punctuation">,</span> <span class="token comment">// event to register to</span>\n  handler<span class="token punctuation">:</span> <span class="token string">\'function\'</span> <span class="token comment">// function to handle the event</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Example:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n  events<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    listeners<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'Listener1\'</span><span class="token punctuation">,</span>\n        event<span class="token punctuation">:</span> <span class="token string">\'createRoutesEvent\'</span><span class="token punctuation">,</span>\n        handler<span class="token punctuation">:</span> <span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token keyword">const</span> <span class="token function-variable function">myCustomCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hey! I\'ve changed the original hadron function!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> <span class="token function">myCustomCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        name<span class="token punctuation">:</span> <span class="token string">\'Listener2\'</span><span class="token punctuation">,</span>\n        event<span class="token punctuation">:</span> <span class="token string">\'myCustomEvent\'</span><span class="token punctuation">,</span>\n        handler<span class="token punctuation">:</span> <span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token keyword">const</span> <span class="token function-variable function">myCustomCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'My custom event!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> <span class="token function">myCustomCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">hadron</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> <span class="token punctuation">[</span>hadronEvents<span class="token punctuation">]</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  container<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token string">\'eventManager\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">(</span><span class="token string">\'myCustomEvent\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "My custom event!"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h3 id="emitting-events"><a href="#emitting-events" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Emitting events</h3>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript">eventEmitter<span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">(</span>eventName<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Calls all listener handlers registered for the event with event name passed to it.</p>\n<ul>\n<li><code class="language-text">eventName</code> - name of the event which will be fired</li>\n</ul>\n<h2 id="listeners"><a href="#listeners" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Listeners</h2>\n<p>You can create your listeners in the main config file.</p>\n<p>As the first argument listener\'s handler method will receive a callback function originally called by hadron, so you can change/override it however you want and then return a call of a newly created function or a call of an existing callback if you don\'t want to change it.</p>\n<p>To be able to receive the callback mentioned above, the first argument should be named exactly <code class="language-text">callback</code>, otherwise, you will not receive the callback.</p>\n<p>You can also define your listener\'s handler without <code class="language-text">callback</code> argument or even without any arguments, which is also a valid way to create listeners, you just won\'t be able to access the callback.</p>\n<p>The second argument of the listener\'s handler method is <code class="language-text">...args</code>, which can be used as arguments for the callback function.</p>\n<p>An example of a listener:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'Listener\'</span><span class="token punctuation">,</span>\n  event<span class="token punctuation">:</span> <span class="token string">\'createRoutesEvent\'</span><span class="token punctuation">,</span>\n  handler<span class="token punctuation">:</span> <span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token function-variable function">myCustomCallback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hey! I\'ve changed the original hadron function!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token function">myCustomCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="extension-points-in-hadron"><a href="#extension-points-in-hadron" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Extension points in Hadron</h2>\n<p>As said before, there are a couple of extension points in the Hadron framework to which you can hook up your listeners.\nThe extension depends on the packages that you are using and are listed below:</p>\n<p>--- hadron-express</p>\n<p><code class="language-text">HANDLE_REQUEST_CALLBACK_EVENT</code></p>\n<p>Event fires before a route callback function is called. Passes the route callback to the listener.</p>\n<p>Example:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> ExpressEvent <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'@brainhubeu/hadron-express\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Event<span class="token punctuation">;</span>\n<span class="token keyword">const</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'Listener\'</span><span class="token punctuation">,</span>\n    event<span class="token punctuation">:</span> ExpressEvent<span class="token punctuation">.</span><span class="token constant">HANDLE_REQUEST_CALLBACK_EVENT</span><span class="token punctuation">,</span> <span class="token comment">// or simply event: \'HANDLE_REQUEST_CALLBACK_EVENT\'</span>\n    handler<span class="token punctuation">:</span> <span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request Handled!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<hr>\n<p><code class="language-text">HANDLE_TERMINATE_APPLICATION_EVENT</code></p>\n<p>Event fires when the application is terminated with <kbd>CTRL</kbd> + <kbd>C</kbd>, passes the default Hadron callback to the listener.</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> Event <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'@brainhubeu/hadron-events\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Event<span class="token punctuation">;</span>\n<span class="token keyword">const</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'Listener\'</span><span class="token punctuation">,</span>\n    event<span class="token punctuation">:</span> Event<span class="token punctuation">.</span><span class="token constant">HANDLE_TERMINATE_APPLICATION_EVENT</span><span class="token punctuation">,</span> <span class="token comment">// or simply event: \'HANDLE_TERMINATE_APPLICATION_EVENT\'</span>\n    handler<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Application is going to close\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>\n      </div>'}},pathContext:{relativePath:"GDK>../docs/packages/events.md"}}}});
//# sourceMappingURL=path---docs-packages-events-fbb4b7e586ef2e3e8816.js.map