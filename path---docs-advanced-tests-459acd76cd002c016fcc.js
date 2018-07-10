webpackJsonp([85660065037950],{317:function(n,s){n.exports={data:{markdownRemark:{html:'<h2 id="unit-testing"><a href="#unit-testing" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Unit testing</h2>\n<p>You can write unit tests using standard testing frameworks like Mocha + Chai, Jest etc.</p>\n<p>There is nothing special about testing application logic so we won\'t address this topic.</p>\n<h3 id="testing-controllers-route-callbacks"><a href="#testing-controllers-route-callbacks" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Testing controllers (route callbacks)</h3>\n<p>Hadron makes it easy to unit test your controllers - your input request data is just a data structure, as well as the returned request specification (optionally wrapped in a promise). You can also easily stub your dependencies by providing fake dependencies as objects in the second argument of the controller.</p>\n<p><em>Note: For our examples we will use Mocha + Chai</em></p>\n<hr>\n<p>Let\'s start with a simple controller with no external dependencies and no request-specific data - for example request for a specific view i.e. <code class="language-text">/about</code>.</p>\n<p>Code under test:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getAboutPage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    view<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">"about"</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Test code:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"chai"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> getAboutPage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./staticViewHandlers"</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"getAboutPage request handler"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"returns response spec with proper view"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n      view<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        name<span class="token punctuation">:</span> <span class="token string">"about"</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> actual <span class="token operator">=</span> <span class="token function">getAboutPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">expect</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<hr>\n<p>In the next simple example we test a dumb handler that echos request parameters. To test it in isolation all we need to do is to pass a fake request structure and compare the result.</p>\n<p>Code under test:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">echo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> params<span class="token punctuation">,</span> query <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    body<span class="token punctuation">:</span> <span class="token punctuation">{</span> params<span class="token punctuation">,</span> query <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Test code:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"chai"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> echo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./dumbHandlers"</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"echo request handler"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"returns response spec provided params"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> requestStub <span class="token operator">=</span> <span class="token punctuation">{</span>\n      params<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        foo<span class="token punctuation">:</span> <span class="token string">"bar"</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      query<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        baz<span class="token punctuation">:</span> <span class="token string">"bat"</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n      body<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        params<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          foo<span class="token punctuation">:</span> <span class="token string">"bar"</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        query<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          baz<span class="token punctuation">:</span> <span class="token string">"bat"</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> actual <span class="token operator">=</span> <span class="token function">echo</span><span class="token punctuation">(</span>requestStub<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">expect</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<hr>\n<p>In another example we will request a callback that returns a specific entity selected by id provided by user in the request param. We will stub repository and test for the correct response spec. We will also cover the case when there is no entity with such an ID.</p>\n<p>Code under test:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> UserNotFoundError <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./errors"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> fetchUser <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> params <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> userRepository <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      body<span class="token punctuation">:</span> <span class="token keyword">await</span> userRepository<span class="token punctuation">.</span><span class="token function">byId</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>error <span class="token keyword">instanceof</span> <span class="token class-name">UserNotFoundError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        status<span class="token punctuation">:</span> <span class="token number">400</span><span class="token punctuation">,</span>\n        body<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          message<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`User with id </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> not found`</span></span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">throw</span> error<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Test code:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"chai"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fetchUser <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./userHandlers"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> UserNotFoundError <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./errors"</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"fetchUser request handler"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"returns response spec with user data"</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> requestStub <span class="token operator">=</span> <span class="token punctuation">{</span>\n      params<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        id<span class="token punctuation">:</span> <span class="token number">1</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> dependenciesStub <span class="token operator">=</span> <span class="token punctuation">{</span>\n      userRepository<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token function">byId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            id<span class="token punctuation">,</span>\n            name<span class="token punctuation">:</span> <span class="token string">"Stranger"</span>\n          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n      body<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n        name<span class="token punctuation">:</span> <span class="token string">"Stranger"</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> actual <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchUser</span><span class="token punctuation">(</span>requestStub<span class="token punctuation">,</span> dependenciesStub<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token function">expect</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"returns response spec with error when there is no user with provided ID"</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> requestStub <span class="token operator">=</span> <span class="token punctuation">{</span>\n      params<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        id<span class="token punctuation">:</span> <span class="token number">1</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> dependenciesStub <span class="token operator">=</span> <span class="token punctuation">{</span>\n      userRepository<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token function">byId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">UserNotFoundError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n      status<span class="token punctuation">:</span> <span class="token number">400</span><span class="token punctuation">,</span>\n      body<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        message<span class="token punctuation">:</span> <span class="token string">"User with id 1 not found"</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> actual <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchUser</span><span class="token punctuation">(</span>requestStub<span class="token punctuation">,</span> dependenciesStub<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token function">expect</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<hr>\n<p>In the last example in addition to returning the response spec we will perform a side effect and test that it was called. For that we will use spy. Instead of writing our own spy we will use the one included in Sinon.JS.</p>\n<p>Code under test:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">const</span> fetchUsers <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> <span class="token punctuation">{</span> userRepository<span class="token punctuation">,</span> logger <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token keyword">await</span> userRepository<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Fetched </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>users<span class="token punctuation">.</span>length<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> users`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    body<span class="token punctuation">:</span> users\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Test code:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"chai"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fetchUsers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./userHandlers"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> sinon <span class="token keyword">from</span> <span class="token string">"sinon"</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"fetchUsers request handler"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> dependenciesStub <span class="token operator">=</span> <span class="token punctuation">{</span>\n    userRepository<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      <span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n          <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Stranger1"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Stranger2"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Stranger3"</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    logger<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      info<span class="token punctuation">:</span> sinon<span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"returns response spec with users data"</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> expected <span class="token operator">=</span> <span class="token punctuation">{</span>\n      body<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Stranger1"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Stranger2"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Stranger3"</span> <span class="token punctuation">}</span>\n      <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> actual <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchUsers</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> dependenciesStub<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">expect</span><span class="token punctuation">(</span>actual<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"calls logger with result info"</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">await</span> <span class="token function">fetchUsers</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> dependenciesStub<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">expect</span><span class="token punctuation">(</span>dependenciesStub<span class="token punctuation">.</span>logger<span class="token punctuation">.</span>info<span class="token punctuation">.</span><span class="token function">calledWith</span><span class="token punctuation">(</span><span class="token string">\'Fetched 3 users\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>be<span class="token punctuation">.</span><span class="token boolean">true</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="integration-tests"><a href="#integration-tests" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Integration tests</h2>\n<h2 id="end-to-end-tests"><a href="#end-to-end-tests" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>End-to-end tests</h2>\n<p>To run end to end tests, use this command in terminal:</p>\n<div class="gatsby-highlight" data-language="sh">\n      <pre class="language-sh"><code class="language-sh">npm run test:e2e</code></pre>\n      </div>\n<h3 id="scenarios"><a href="#scenarios" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Scenarios</h3>\n<ul>\n<li><strong>Given</strong></li>\n</ul>\n<p>Setting header values</p>\n<div class="gatsby-highlight" data-language="feature">\n      <pre class="language-feature"><code class="language-feature">Given I set header &quot;header-name&quot; with value &quot;header-value&quot;\n\nex.\nGiven I set header &quot;content-type&quot; with value &quot;application/json&quot;</code></pre>\n      </div>\n<ul>\n<li><strong>When</strong></li>\n</ul>\n<p>Sending request</p>\n<div class="gatsby-highlight" data-language="feature">\n      <pre class="language-feature"><code class="language-feature">When I send a &quot;METHOD&quot; request to &quot;/path&quot;\n\nex.\nWhen I send a &quot;GET&quot; request to &quot;/&quot;\nWhen I send a &quot;post&quot; request to &quot;/post/&quot;</code></pre>\n      </div>\n<p>Sending request with body</p>\n<div class="gatsby-highlight" data-language="feature">\n      <pre class="language-feature"><code class="language-feature">When I send a &quot;METHOD&quot; request to &quot;/path&quot; with body:\n  &quot;&quot;&quot;\n  {\n    &quot;name&quot;: &quot;Wonderful coffee&quot;,\n    &quot;project&quot;: {\n      &quot;name&quot;: &quot;Coffee&quot;\n    }\n  }\n  &quot;&quot;&quot;\n\nex.\nWhen i send a &quot;PUT&quot; request to &quot;/users/add&quot;\n  &quot;&quot;&quot;\n  {\n    &quot;firstname&quot;: &quot;John&quot;,\n    &quot;lastname&quot;: &quot;Doe&quot;,\n    &quot;email&quot;: &quot;john.doe@example.com&quot;\n  }\n  &quot;&quot;&quot;</code></pre>\n      </div>\n<ul>\n<li><strong>Then</strong></li>\n</ul>\n<p>Checking response code</p>\n<div class="gatsby-highlight" data-language="feature">\n      <pre class="language-feature"><code class="language-feature">Then the response code should be 200</code></pre>\n      </div>\n<p>Checking response body</p>\n<div class="gatsby-highlight" data-language="feature">\n      <pre class="language-feature"><code class="language-feature">Then the JSON should match pattern\n  &quot;&quot;&quot;\n  {\n    &quot;name&quot;: &quot;Wonderful coffee&quot;,\n    &quot;project&quot;: {\n      &quot;name&quot;: &quot;Coffee&quot;\n    }\n  }\n  &quot;&quot;&quot;</code></pre>\n      </div>\n<p>Example e2e tests:</p>\n<div class="gatsby-highlight" data-language="feature">\n      <pre class="language-feature"><code class="language-feature">Feature: Feature name\n\n  Feature description\n\n  Scenario: Simple GET request\n    When I send a &quot;GET&quot; request to &quot;/&quot;\n    Then the response code should be 200</code></pre>\n      </div>'
}},pathContext:{relativePath:"GDK>../docs/advanced/tests.md"}}}});
//# sourceMappingURL=path---docs-advanced-tests-459acd76cd002c016fcc.js.map