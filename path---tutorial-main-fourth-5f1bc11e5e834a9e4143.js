webpackJsonp([0xd81c105fa49d],{332:function(n,s){n.exports={data:{markdownRemark:{html:'<h2 id="authorization-with-hadron-auth"><a href="#authorization-with-hadron-auth" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Authorization with hadron-auth</h2>\n<p>Installation:</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save @brainhubeu/hadron-auth</code></pre>\n      </div>\n<p>To use hadron-auth, all we need to do is to add hadronAuth to hadron core in <code class="language-text">src/index.js</code>:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// src/index.js</span>\n<span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">\'express\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> hadron <span class="token keyword">from</span> <span class="token string">\'@brainhubeu/hadron-core\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> jsonProvider <span class="token keyword">from</span> <span class="token string">\'@brainhubeu/hadron-json-provider\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> hadronExpress <span class="token keyword">from</span> <span class="token string">\'@brainhubeu/hadron-express\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> hadronAuth <span class="token keyword">from</span> <span class="token string">\'@brainhubeu/hadron-auth\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> hadronTypeOrm <span class="token keyword">from</span> <span class="token string">\'@brainhubeu/hadron-typeorm\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> db <span class="token keyword">from</span> <span class="token string">\'./config/db\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> cors <span class="token keyword">from</span> <span class="token string">\'cors\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> bodyParser <span class="token keyword">from</span> <span class="token string">\'body-parser\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> http <span class="token keyword">from</span> <span class="token string">\'http\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> port <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PORT</span> <span class="token operator">||</span> <span class="token number">4000</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> expressApp <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nexpressApp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nexpressApp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>bodyParser<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span>expressApp<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> hadronInit <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">jsonProvider</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>__dirname<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/routes/*`</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'js\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token operator">...</span>db<span class="token punctuation">,</span>\n        routes<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> container <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">hadron</span><span class="token punctuation">(</span>expressApp<span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>hadronAuth<span class="token punctuation">,</span> hadronTypeOrm<span class="token punctuation">,</span> hadronExpress<span class="token punctuation">]</span><span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    expressApp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            error<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n                message<span class="token punctuation">:</span> <span class="token string">\'Not Found.\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        expressApp<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">\'appStarted\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Listening on http://localhost:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">hadronInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<hr>\n<p>WARNING, don\'t forget to add <code class="language-text">hadronAuth</code> first in the package array.</p>\n<hr>\n<p>To secure routes, we need to add the <code class="language-text">securedRoutes</code> key in the config, which is an array of objects, for example:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token operator">...</span>db<span class="token punctuation">,</span>\n        routes<span class="token punctuation">,</span>\n        securedRoutes<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n                path<span class="token punctuation">:</span> <span class="token string">\'/api/role/**\'</span><span class="token punctuation">,</span>\n                roles<span class="token punctuation">:</span> <span class="token string">\'Admin\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n                path<span class="token punctuation">:</span> <span class="token string">\'/api/task/**\'</span><span class="token punctuation">,</span>\n                methods<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'GET\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n                roles<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'Admin\'</span><span class="token punctuation">,</span> <span class="token string">\'User\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span>\n                path<span class="token punctuation">:</span> <span class="token string">\'/api/task/**\'</span><span class="token punctuation">,</span>\n                methods<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'POST\'</span><span class="token punctuation">,</span> <span class="token string">\'PUT\'</span><span class="token punctuation">,</span> <span class="token string">\'DELETE\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n                roles<span class="token punctuation">:</span> <span class="token string">\'Admin\'</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>If we don\'t specify <code class="language-text">methods</code> then all HTTP methods will be secured.</p>\n<p>Now let\'s write a simple middleware for login:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> unauthorized <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'../services/responses\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> validate <span class="token keyword">from</span> <span class="token string">\'../validation/validate\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> bcrypt <span class="token keyword">from</span> <span class="token string">\'bcrypt\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> jwt <span class="token keyword">from</span> <span class="token string">\'jsonwebtoken\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> secret <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">JWT_SECRET</span> <span class="token operator">||</span> <span class="token template-string"><span class="token string">`H4DR0N_S3CUR17Y`</span></span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> loginMiddleware <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> <span class="token punctuation">{</span> userRepository <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">validate</span><span class="token punctuation">(</span><span class="token string">\'login\'</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> userRepository<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> where<span class="token punctuation">:</span> <span class="token punctuation">{</span> username<span class="token punctuation">:</span> data<span class="token punctuation">.</span>username <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">unauthorized</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Unauthorized`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">const</span> validPassword <span class="token operator">=</span> <span class="token keyword">await</span> bcrypt<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>password<span class="token punctuation">,</span> user<span class="token punctuation">.</span>passwordHash<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>validPassword<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                id<span class="token punctuation">:</span> user<span class="token punctuation">.</span>id<span class="token punctuation">,</span>\n                username<span class="token punctuation">:</span> user<span class="token punctuation">.</span>username<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span> secret<span class="token punctuation">,</span> <span class="token punctuation">{</span> expiresIn<span class="token punctuation">:</span> <span class="token string">\'2h\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token keyword">return</span> <span class="token punctuation">{</span>\n                status<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n                body<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n                    token<span class="token punctuation">,</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token keyword">return</span> <span class="token function">unauthorized</span><span class="token punctuation">(</span><span class="token string">\'Unauthorized\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">unauthorized</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Unauthorized`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> loginMiddleware<span class="token punctuation">;</span></code></pre>\n      </div>'}},pathContext:{relativePath:"GDK>../docs/tutorial/main/Fourth.md"}}}});
//# sourceMappingURL=path---tutorial-main-fourth-5f1bc11e5e834a9e4143.js.map