## 默认tsconfig

    {
      "compilerOptions": {
        //在类的外部使用this关键字时，它会默认获得any类型
        //不允许 没有明确指定类型（或通过类型推断）的 this被使用
        "noImplicitThis": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true,
        //以上为默认
        "outDir": "./built",
        "allowJs": true,
        "target": "es5",
        //防止你忘记在函数末尾返回值
        "noImplicitReturns": true,
        //防止在switch代码块里的两个case之间忘记添加break语句
        "noFallthroughCasesInSwitch": true,
        //发现那些执行不到的代码
        "allowUnreachableCode": true,
        //发现那些执行不到的标签
        "allowUnusedLabels": true,
        //不想在发生错误的时候，TypeScript还会被编译成JavaScript
        "noEmitOnError": true,
        //不想让TypeScript将没有明确指定的类型默默地推断为 any类型
        //"noImplicitAny": true,
        //启用一些模块系统
        "module": "umd",
        //严格的null与undefined检查 依赖也需要相应地启用strictNullChecks
        "strictNullChecks": true
        //默认所有可见的"@types"包会在编译过程中被包含进来
        //只有typeRoots下面的包才会被包含进来
        //"typeRoots" : ["./typings"],
        //如果指定了types，只有被列出来的包才会被包含进来
        //指定"types": []来禁用自动引入@types包
        //"types" : ["node", "lodash", "express"]
      },
      //从另一个配置文件里继承配置
      //"extends": "./configs/base",
      //指定一个包含相对或绝对文件路径的列表
      //可以让IDE在保存文件的时候根据tsconfig.json重新生成文件
      //"compileOnSave": true,
      //一个对象的数组，指明要引用的工程
      //  "references": [
      //    { "path": "../src" }
      //  ],
      // "files": [],
      //指定一个文件glob匹配模式列表
      "include": [
        // * 匹配0或多个字符（不包括目录分隔符）
        // ? 匹配一个任意字符（不包括目录分隔符）
        // **/ 递归匹配任意子目录
        "./src/**/*"
      ],
      "exclude": [
        "node_modules",
        "**/*.spec.ts"
      ]
    }