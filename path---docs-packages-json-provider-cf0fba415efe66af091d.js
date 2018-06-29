webpackJsonp([0xa6e323719c9b],{318:function(a,n){a.exports={data:{markdownRemark:{html:'<h2 id="installation"><a href="#installation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Installation</h2>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> @brainhubeu/hadron-json-provider --save</code></pre>\n      </div>\n<p><a href="/docs/basics/core/#installation">More info about installation</a></p>\n<h2 id="overview"><a href="#overview" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Overview</h2>\n<p>JSON Provider allows you to automatically load multiple files as a JSON object, with file names as object keys, and file contents as object values.</p>\n<p>Currently it supports the following extensions:</p>\n<ul>\n<li><code class="language-text">.js</code></li>\n<li><code class="language-text">.json</code></li>\n<li><code class="language-text">.xml</code></li>\n</ul>\n<h2 id="usage"><a href="#usage" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Usage</h2>\n<h3 id="basic-provider"><a href="#basic-provider" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Basic provider</h3>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token function">jsonProvider</span><span class="token punctuation">(</span>paths<span class="token punctuation">,</span> extensions<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<ul>\n<li><code class="language-text">paths</code> - array of strings which contains paths to files</li>\n<li><code class="language-text">extensions</code> - array of strings which contains extensions of files out of which which you want to build a JSON object</li>\n</ul>\n<p>For example, consider a directory with the following structure:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/routing-4b1b8c332ec9610e30a93eea25855363-037ef.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 600px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 23.214285714285715%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAq0lEQVQY043QSw6CMACEYU8iFGhxJwkqQqEPpRGNj52Jife/xi9xgTvDYjK7L5NZZGnGuijww41dpemPPVq3CJFMyTKJlGrqf1lIKUnSFU7nPK8SYwPee5pGY637tlL5LGwCo1hh90vejyW1PowLNcZYhmGg68zsdT9Q5Ng65nWLsP40LjM45zifL1RVRTreMgebwFgomq3gHmLqxtG27ffHEAJluSFJ0tngByrImBL8tAaxAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Directory structure"\n        title=""\n        src="/static/routing-4b1b8c332ec9610e30a93eea25855363-7a630.png"\n        srcset="/static/routing-4b1b8c332ec9610e30a93eea25855363-46d37.png 150w,\n/static/routing-4b1b8c332ec9610e30a93eea25855363-c218a.png 300w,\n/static/routing-4b1b8c332ec9610e30a93eea25855363-7a630.png 600w,\n/static/routing-4b1b8c332ec9610e30a93eea25855363-037ef.png 784w"\n        sizes="(max-width: 600px) 100vw, 600px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>To find all files in <code class="language-text">./routing</code> and its sub-directories with the extension <code class="language-text">config.js</code> you can use the following code:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token function">jsonProvider</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'./routing/**/*\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'config.js\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h3 id="configuration-provider"><a href="#configuration-provider" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Configuration provider</h3>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token function">configJsonProvider</span><span class="token punctuation">(</span>paths<span class="token punctuation">,</span> configFile<span class="token punctuation">,</span> projectType<span class="token punctuation">,</span> extensions<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<ul>\n<li><code class="language-text">paths</code> - array of strings which contains paths to files</li>\n<li><code class="language-text">configFile</code> - name of the main configuration file</li>\n<li><code class="language-text">projectType</code> - project type</li>\n<li><code class="language-text">extensions</code> - array of strings which contains extensions of files out of which you want to build a JSON object</li>\n</ul>\n<p>For example, consider a directory with the following structure:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/routingType-f84f04adeea45e0aa4ba78cc06046b0d-edd43.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 600px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 46.373056994818654%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABLklEQVQoz42S2W7CMBBF8yMtxLGdKmyCBrI6dhYSukltX6o+9f+/4tY2SgMIlD6MZF+Nj+7cscMYB6UMTFeUCRSyQqUkqNY9j4JzH6bnsuybK7pz2rCcz8GfP/GoDmibBuv1BpPJFIR4cF1iy5x72DWoM4hMO+JYhTN8v1MURYmyrBBFMfJcIMtypGmGOE7g+w/W/TWoM4hH4MwnaMUUqQY0zR51XaOqarRtp8+N1ZIkve1wuByB84DitXK1I2FBSpUWYlyG4Rbb7Q67XWSzHQW6hGOz8vDzcYdcKO2qhZTKjhsEM52n+5fnrRzPgMRkuPDw9XKv8xI4HJ4srF/E5cZHHVLKdeAMcchsTiYzM7YZtV/CWDmnF48wBEsf8m0BWSh0XYf9vrXfx7j8D/AXA8MQyrpz8e0AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Directory structure"\n        title=""\n        src="/static/routingType-f84f04adeea45e0aa4ba78cc06046b0d-7a630.png"\n        srcset="/static/routingType-f84f04adeea45e0aa4ba78cc06046b0d-46d37.png 150w,\n/static/routingType-f84f04adeea45e0aa4ba78cc06046b0d-c218a.png 300w,\n/static/routingType-f84f04adeea45e0aa4ba78cc06046b0d-7a630.png 600w,\n/static/routingType-f84f04adeea45e0aa4ba78cc06046b0d-edd43.png 772w"\n        sizes="(max-width: 600px) 100vw, 600px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>If you want to build a configuration object which depends on the project type, for example <code class="language-text">development</code>, you can use the following code:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token function">configJsonProvider</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'./app/config/*\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">\'config\'</span><span class="token punctuation">,</span> <span class="token string">\'development\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'xml\'</span><span class="token punctuation">,</span> <span class="token string">\'js\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>'}},pathContext:{relativePath:"GDK>../docs/packages/json-provider.md"}}}});
//# sourceMappingURL=path---docs-packages-json-provider-cf0fba415efe66af091d.js.map