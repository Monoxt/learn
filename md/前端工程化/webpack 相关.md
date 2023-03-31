## Webpack生命周期

webpack 生命周期是指 Webpack 在执行过程中所遵循的一系列钩子函数，每个钩子函数代表着一个特定的阶段，开发者可以通过注册回调函数的方式，在这些钩子函数中完成自定义的操作。Webpack 生命周期主要分为以下 11 个阶段：

1. beforeRun 在 Webpack 开始读取配置之前，该钩子将被调用
2. run 在 Webpack 开始编译时，该钩子将被调用
3. watchRun 在使用 webpack-dev-server 进行开发时，该钩子将被调用
4. beforeCompile 在 Webpack 开始编译之前，该钩子将被调用
5. compile 在 Webpack 开始编译时，该钩子将被调用
6. thisCompilation 在创建新的 Compilation 对象时，该钩子将被调用
7. compilation 在编译时，每当 Webpack 生成一个新的 Compilation 对象时，该钩子将被调用
8. emit 在生成资源之前，该钩子将被调用
9. afterEmit 在生成资源之后，该钩子将被调用
10. done 在 Webpack 编译完成时，该钩子将被调用
11. assetEmitted 生命周期钩子是在所有资源都已经生成到输出目录中后，即 Webpack 打包完毕后触发的

### webpack.config.js 和 shell 解析

webpack.config.js 文件大致结构如下：

```js
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    // 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。
    entry: {
        bundle: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, 'app/app.js')
        ],
    },
    // 文件路径指向(可加快打包过程)。
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    // 生成文件，是模块构建的终点，包括输出文件与输出路径。
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    // 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
        noParse: [pathToReact]
    },
    // webpack 各插件对象，在 webpack 的事件流中执行对应的方法。
    plugins: [
        new webpack.HotModuleReplacementPlugin();
    ]
};
```

流程的第一步就是对 config 文件和 shell 进行解析。

每次在命令行输入 webpack 后，操作系统都会区调用 ./node_modules/.bin/webpack 这个 shell 脚本。这个脚本会去调用 ./node_modules/webpack/bin/webpack.js 并追加输入的参数，如 -p, -w。

在 webpack.js 这个文件中 webpack 通过 optimist 将用户配置的 webpack.config.js 和 shell 脚本传过来的参数整合成 options 对象传到了下一个流程的控制对象中。

#### optimist

optimist 可以对 node 命令行进行解析，用于激活 webpack 的加载项和插件。

在获取到参数以后，optimist 分析参数并以键值对的形式把参数对象保存在 optimist.argv 中

假如在命令行输入：

```shell
webpack --hot -w
```

那么 optimist.argv 的内容就会是：

```json
{
    hot: true,
    profile: false,
    watch: true
}
```

#### config 的合并与插件加载

在 shell 解析完毕后，需要进行 config 的合并与插件加载。

webpack 将 webpack.config.js 中的各个配置项拷贝到 options 对象中，并加载用户配置在 webpack.config.js 的 plugins。接着 optimist.argv 会被传入 ./node_modules/webpack/bin/convert-argv.js 中，通过判断 argv 中参数的值决定是否去加载对应插件。

最后的 options 对象包含了构建阶段所需要的重要信息：

```json
{
    entry: {}, // 入口配置
    output: {}, // 输出配置
    plugins: [], // 插件集合（配置文件 + shell 指令）
    module: {
        loaders: [[Object]], // 模块配置
    },
    context: // 工程路径
    // 其他配置
}
```

插件对象初始化完毕，options 将被传入下一个流程。

### 编译与构建

在获取 options 对象后，webpack 将开始初始化。

这时候 Compiler 开始运作：

```js
function webpack(options) {
    var compiler = new Compiler();
    // ... 检查 options，若 watch 字段为 true，则开启 watch 线程
    return compiler;
}
```

`compiler.run` 方法将被执行，用来编译和构建流程，其中**主要的事件结点**如下：

- compile 开始编译
- make 从入口点分析模块及其依赖的模块，创建这些模块对象
- build-module 构建模块
- after-compile 完成构建
- seal 封装构建结果
- emit 把各个 chunk 输出到结果文件
- after-emit 完成输出

#### 构建 Compilation

`compiler.run` 方法会构建出 `Compilation` 对象。

Compilation 的作用如下：

- 负责组织整个打包过程，包含每个构建环节及输出环节所对应的方法
- 存放着所有 module，chunk，生成的 asset 以及用来生成最后打包文件的 template 的信息

##### Compiler 和 Compilation

Compiler 模块是 webpack 的主要引擎，它扩展自 Tapable 类。在执行 webpack 构建的准备阶段，会创建一个 Compiler 实例，然后配置项传递的实例化插件以及 webpack 内置插件都会在该 Compiler 对象上注册。具体就是依次调用插件的 apply 方法，并将 compiler 对象（包含 webpack 的各种配置信息）传进去供 plugin 使用。compiler 包含整个构建流程的全部狗子，通过它可以把控整个 webpack 构建周期。在运行期间 compiler 会根据 webpack 不同阶段触发的各种事件钩子，执行插件附加/绑定在 hook 上的函数。compiler 只是负责维持生命周期运行的功能，所有的加载、打包和写入工作，都被委托到注册过的插件上了。webpack 使用 WebpackOptionsDefaulter 和 WebpackOptionsApply 来配置 compiler 实例以及所有内置插件。

Compiler 类实例化并注册 plugins 后，若 webpack 函数接收了回调 callback，会执行 compiler.run() 方法，webpack 即刻开启编译之旅。如果未指定 callback 回调，则需要用户自己调用 run 方法来启动编译。

代码如下：

```js
// /lib/webpack.js
const webpack = (options, callback) => {
// 创建 Compiler 类的实例
  const compiler = new Compiler(options.context);
  compiler.options = options;
  // 注册所有自定义插件
  if (Array.isArray(options.plugins)) {
    // 遍历传入的 webpack 配置中的实例化插件数组
    for (const plugin of options.plugins) {
      if (typeof plugin === "function") {
        // 在compiler对象的作用域下调用plugin构造函数，即this指向compiler；同时把compiler对象当作参数传过去。并且compiler对象会继承plugin的所有属性、方法
        plugin.call(compiler, compiler);
      } else {
        // 如果 plugin 是其他类型，就执行plugin对象的apply方法。
        // plugins 数组的内容一般都是一个个插件实例化对象，也就是 object。
        // 
        plugin.apply(compiler);
      }
     }
  }
  applyWebpackOptionsDefaults(options);
  // 触发 compiler 的 两个 hook: environment，afterEnvironment
  compiler.hooks.environment.call();
  compiler.hooks.afterEnvironment.call();
  // 根据 options 的配置不同，注册激活一些默认自带的插件和 resolverFactory.hooks
  // 大部分插件的作用是往 compiler.hooks:compilation,thisCompilation 里注册一些事件
  new WebpackOptionsApply().process(options, compiler);
  compiler.hooks.initialize.call();
  // 获取是否以watch监听模式启动的 webpack 以及 监听相关配置
  let watch = options.watch || false;
  let watchOptions = options.watchOptions || {};
  if (callback) { // 如果传递了回调
    if (watch) { // 配置传了 watch 则调用监听模式启动 webpack
      compiler.watch(watchOptions, callback);
    } else { // 启动 compiler.run，即开启编译工作， webpack 的核心构建流程
      compiler.run((err, stats) => { 
      // stats 对象是编译过程中的有用信息， 包括：
      //*   错误和警告(如果有的话)
      //*   计时信息
      //*   module 和 chunk 信息
      // webpack CLI 正是基于这些信息在控制台 展示友好的格式输出。
        compiler.close(err2 => {
          callback(err || err2, stats);
        });
      });
    }
    return compiler;
  } else {
    if (watch) {
      util.deprecate(() => {}, "watch模式必须提供callback回调函数！", "DEP_WEBPACK_WATCH_WITHOUT_CALLBACK")();
    }
    return compiler;
  }
}

module.exports = webpack;
```

Compilation 类扩展自 Tapable，也提供了很多关键点回调供插件做自定义处理时选择使用扩展。一个 compilation 对象代表了以此单一的版本构建和生成资源，它存储了当前的模块资源、编译生成的资源、变化的文件、以及被跟踪以来的状态信息。简单来说，Compilation 的职责就是对所有 require 图中对象的字面上的编译、构建 module 和 chunk，并利用插件优化构建过程，同时把本次打包编译的内容全部存到内存里。compilation 编译可以多次执行，如在 watch 模式下启动 webpack，每次监听到的源文件发生变化，都会重新实例化一个 compilation 对象，从而生成一组新的编译资源。这个对象可以访问所有的模块和它们的依赖（大部分是循环依赖）。

##### compiler 和 compilation 的区别

compiler 对象代表的是构建过程中不变的 webpack 环境，整个 webpack 从启动到关闭的生命周期，针对的是 webpack。

compilation 对象只代表一次新的编译，只要项目文件有改动，compilation 就会被重新创建，针对的是随时可变的项目文件。

#### 编译与构建流程

在构建模块之前，make 先被触发，并调用 Compilation.addEntry 方法，通过 options 对象中的 entry 字段找到入口 js 文件。

找到后会在 addEntry 中调用私有方法 _addModuleChain，作用是根据模块的类型获取对应的模块工厂并创建模块，二是构建模块。

其中，构建模块分为三步：

- 调用各 loader 处理模块之间的依赖

  - webpack 调用 doBuild()，对每一个 require 用对应的 loader(url-loader, css-loader 等) 进行加工，最后生成一个 js module

  - 调用 acorn 解析经 loader 处理后的源文件生成抽象语法树 AST

  - 遍历 AST，构建该模块所依赖的模块

    - 对于当前模块，或许存在着多个依赖模块。当前模块会开辟一个依赖模块的数组，在遍历 AST 时，将 require() 中的模块通过 addDependency() 添加到数组中
    - 当前模块构建完成后，webpack 调用 processModuleDependencies 开始递归处理依赖的 module，接着就会重复之前的构建步骤

#### module 处理

module 是 webpack 构建的核心实体，也是所有 module 的父类。

无论是哪种 module，都要调用 build() 方法构建：

```js
// 初始化module信息，如context,id,chunks,dependencies等。
NormalModule.prototype.build = function build(options, compilation, resolver, fs, callback) {
  this.buildTimestamp = new Date().getTime() // 构建计时
  this.built = true
  return this.doBuild(
    options,
    compilation,
    resolver,
    fs,
    function (err) {
      // 指定模块引用，不经acorn解析
      if (options.module && options.module.noParse) {
        if (Array.isArray(options.module.noParse)) {
          if (
            options.module.noParse.some(function (regExp) {
              return typeof regExp === 'string' ? this.request.indexOf(regExp) === 0 : regExp.test(this.request)
            }, this)
          )
            return callback()
        } else if (
          typeof options.module.noParse === 'string'
            ? this.request.indexOf(options.module.noParse) === 0
            : options.module.noParse.test(this.request)
        ) {
          return callback()
        }
      }
      // 由acorn解析生成ast
      try {
        this.parser.parse(this._source.source(), {
          current: this,
          module: this,
          compilation: compilation,
          options: options,
        })
      } catch (e) {
        var source = this._source.source()
        this._source = null
        return callback(new ModuleParseError(this, source, e))
      }
      return callback()
    }.bind(this)
  )
}
```

除了 build 外，每种 module 还包括构建到输出一系列有关 module 生命周期的函数。

#### 打包输出

webpack 会调用 Compilation 中的 createChunkAssets 方法进行打包后代码的生成。

首先 createChunkAssets 会判断文件是入口 js 还是异步加载 js，然后采取不同的模板对象进行封装。

入口 js 会采取 render 事件触发 Template 类中的 renderChunkModules。

异步加载的 js 会调用 chunkTemplate 中的 render 方法

##### 模块封装

模块在封装的时候和它在构建时一样，都是调用各模块类中的方法。封装通过调用 module.source() 来进行各操作。

##### 生成 assets

各模块进行 doBlock 后，把 module 的最终代码循环添加到 source 中。一个 source 对应着一个 asset 对象，该对象保存了单个文件的文件名（name）和最终代码（value)。

### 总结

webpack 本质上就是一个插件的集合，由 tapable 控制各插件在 webpack 事件流上运行。

整体流程如下所示：

![](./assets/DHi8YULbw1fzcMW.jpg)

​     







































