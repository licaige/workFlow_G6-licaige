## [3.4.21](https://github.com/vuejs/core/compare/v3.4.20...v3.4.21) (2024-02-28)


### Bug Fixes

* **runtime-dom:** avoid unset option's value ([#10416](https://github.com/vuejs/core/issues/10416)) ([b3f8b5a](https://github.com/vuejs/core/commit/b3f8b5a4e700d4c47a146b6040882287d180f6cb)), closes [#10412](https://github.com/vuejs/core/issues/10412) [#10396](https://github.com/vuejs/core/issues/10396)
* **suspense:** ensure nested suspense patching if in fallback state ([#10417](https://github.com/vuejs/core/issues/10417)) ([7c97778](https://github.com/vuejs/core/commit/7c97778aec1e3513035e5df265e1b8a7801f6106)), closes [#10415](https://github.com/vuejs/core/issues/10415)
* **warning:** stringify args in warn handler ([#10414](https://github.com/vuejs/core/issues/10414)) ([bc37258](https://github.com/vuejs/core/commit/bc37258caa2f6f67f4554ab8587aca3798d92124)), closes [#10409](https://github.com/vuejs/core/issues/10409)



## [3.4.20](https://github.com/vuejs/core/compare/v3.4.19...v3.4.20) (2024-02-26)


### Bug Fixes

* **parser:** should not treat uppercase components as special tags ([e0e0253](https://github.com/vuejs/core/commit/e0e02535cdea1aeb1cfaff0d61d4b2555e555c36)), closes [#10395](https://github.com/vuejs/core/issues/10395)
* **runtime-dom:** avoid always resetting nullish option value ([ff130c4](https://github.com/vuejs/core/commit/ff130c470204086edaa093fb8fdc1247c69cba69)), closes [#10396](https://github.com/vuejs/core/issues/10396)
* **runtime-dom:** fix nested v-show priority regression ([364f890](https://github.com/vuejs/core/commit/364f8902c8657faec7c3a4d70a5b2c856567e92d)), closes [#10338](https://github.com/vuejs/core/issues/10338)
* **runtime-dom:** v-bind style should clear previous css string value ([#10373](https://github.com/vuejs/core/issues/10373)) ([e2d3235](https://github.com/vuejs/core/commit/e2d323538e71d404e729148fd19a08bbc2e3da9b)), closes [#10352](https://github.com/vuejs/core/issues/10352)
* **suspense:** handle suspense switching with nested suspense  ([#10184](https://github.com/vuejs/core/issues/10184)) ([0f3da05](https://github.com/vuejs/core/commit/0f3da05ea201761529bb95594df1e2cee20b7107)), closes [#10098](https://github.com/vuejs/core/issues/10098)
* **types:** better typing for direct setup signature of defineComponent ([#10357](https://github.com/vuejs/core/issues/10357)) ([eadce5b](https://github.com/vuejs/core/commit/eadce5b75356656fd2209ebdb406d34823c961b7)), closes [#8604](https://github.com/vuejs/core/issues/8604) [#8855](https://github.com/vuejs/core/issues/8855)



## [3.4.19](https://github.com/vuejs/core/compare/v3.4.18...v3.4.19) (2024-02-13)


### Bug Fixes

* **deps:** pin lru-cache to avoid hashing error ([b8be990](https://github.com/vuejs/core/commit/b8be99018ceae92d1732dfb414df12b36b90b31f)), closes [#10300](https://github.com/vuejs/core/issues/10300)
* **hydration:** fix css vars hydration mismatch false positive on non-root nodes ([995d2fd](https://github.com/vuejs/core/commit/995d2fdcca485c24849c99f498c1edc163722e04)), closes [#10317](https://github.com/vuejs/core/issues/10317) [#10325](https://github.com/vuejs/core/issues/10325)
* **runtime-dom:** should not trigger transition when v-show value is falsy ([#10311](https://github.com/vuejs/core/issues/10311)) ([e509639](https://github.com/vuejs/core/commit/e50963903d93a7f24003b6e2c03647fdf7454b1e))


### Features

> Note: this warning is categorized as a feature but released in a patch because it does not affect public APIs.

* **dx:** warn users when computed is self-triggering ([#10299](https://github.com/vuejs/core/issues/10299)) ([f7ba97f](https://github.com/vuejs/core/commit/f7ba97f9754a9882c1f6b1c07ca1a4040479dd13))


### Performance Improvements

* **runtime:** improve `getType()` GC and speed ([#10327](https://github.com/vuejs/core/issues/10327)) ([603a1e1](https://github.com/vuejs/core/commit/603a1e1f5ad587c077f0d974c1bbe856be22ebe9))



## [3.4.18](https://github.com/vuejs/core/compare/v3.4.17...v3.4.18) (2024-02-09)


### Bug Fixes

* **dx:** warn against reserved keys as prop name ([77a804b](https://github.com/vuejs/core/commit/77a804b1d0d6a3f12fb3674cdceb85ebd6481e02)), closes [#10281](https://github.com/vuejs/core/issues/10281)
* **runtime-dom:**  ensure v-show respects display value set via v-bind ([#10297](https://github.com/vuejs/core/issues/10297)) ([c224897](https://github.com/vuejs/core/commit/c224897dd4e189a10ec601a97fe08cb638ebee19)), closes [#10151](https://github.com/vuejs/core/issues/10151)



## [3.4.17](https://github.com/vuejs/core/compare/v3.4.16...v3.4.17) (2024-02-09)


### Reverts

* fix(runtime-dom): ensure v-show respects display value set via v-bind ([#10161](https://github.com/vuejs/core/issues/10161)) ([2cd5b05](https://github.com/vuejs/core/commit/2cd5b05c3bf171be5c0b473c084c01704a058ffa)), closes [#10294](https://github.com/vuejs/core/issues/10294) [#10151](https://github.com/vuejs/core/issues/10151)



## [3.4.16](https://github.com/vuejs/core/compare/v3.4.15...v3.4.16) (2024-02-08)


### Bug Fixes

* **compiler-core:** handle same-name shorthand edge case for in-DOM templates ([cb87b62](https://github.com/vuejs/core/commit/cb87b6213d7b003fa7280712c285c7c9d9f291ca)), closes [#10280](https://github.com/vuejs/core/issues/10280)
* **compiler-core:** support v-bind shorthand syntax for dynamic slot name ([#10218](https://github.com/vuejs/core/issues/10218)) ([91f058a](https://github.com/vuejs/core/commit/91f058a90cd603492649633d153b120977c4df6b)), closes [#10213](https://github.com/vuejs/core/issues/10213)
* **deps:** update compiler ([#10269](https://github.com/vuejs/core/issues/10269)) ([336bb65](https://github.com/vuejs/core/commit/336bb65820243006efdf990e6ea3610696467508))
* **hydration:** fix SFC style v-bind hydration mismatch warnings ([#10250](https://github.com/vuejs/core/issues/10250)) ([f0b5f7e](https://github.com/vuejs/core/commit/f0b5f7ed8ddf74f9f5ba47cb65e8300370875291)), closes [#10215](https://github.com/vuejs/core/issues/10215)
* **reactivity:** avoid infinite recursion from side effects in computed getter ([#10232](https://github.com/vuejs/core/issues/10232)) ([0bced13](https://github.com/vuejs/core/commit/0bced13ee5c53a02d5f10e5db76fe38b6e131440)), closes [#10214](https://github.com/vuejs/core/issues/10214)
* **reactivity:** handle `MaybeDirty` recurse ([#10187](https://github.com/vuejs/core/issues/10187)) ([6c7e0bd](https://github.com/vuejs/core/commit/6c7e0bd88f021b0b6365370e97b0c7e243d7d70b)), closes [#10185](https://github.com/vuejs/core/issues/10185)
* **reactivity:** skip non-extensible objects when using `markRaw` ([#10289](https://github.com/vuejs/core/issues/10289)) ([2312184](https://github.com/vuejs/core/commit/2312184bc335e0d32aa4c0c0b49190b6334849b4)), closes [#10288](https://github.com/vuejs/core/issues/10288)
* **runtime-core:** avoid inlining isShallow ([#10238](https://github.com/vuejs/core/issues/10238)) ([53eee72](https://github.com/vuejs/core/commit/53eee72c3a96420db35236b5e8e4d9308a56e1b4))
* **runtime-core:** support for nested calls to runWithContext ([#10261](https://github.com/vuejs/core/issues/10261)) ([75e02b5](https://github.com/vuejs/core/commit/75e02b5099a08166bdf407127916734c48209ee9)), closes [#10260](https://github.com/vuejs/core/issues/10260)
* **runtime-dom:** ensure v-show respects display value set via v-bind ([#10161](https://github.com/vuejs/core/issues/10161)) ([9b19f09](https://github.com/vuejs/core/commit/9b19f0912104bfccb10c8cf5beab02b21a648935)), closes [#10151](https://github.com/vuejs/core/issues/10151)
* **runtime-dom:** fix option selected update failed ([#10200](https://github.com/vuejs/core/issues/10200)) ([f31d782](https://github.com/vuejs/core/commit/f31d782e4668050a188ac0f11ba8d5b861b913ca)), closes [#10194](https://github.com/vuejs/core/issues/10194) [#10267](https://github.com/vuejs/core/issues/10267)


### Reverts

* perf(templateRef): avoid double render when using template ref on v-for ([eb1b911](https://github.com/vuejs/core/commit/eb1b9116d7cd4a5747e8dadcdc5ba921df011f64)), closes [#9908](https://github.com/vuejs/core/issues/9908) [#10210](https://github.com/vuejs/core/issues/10210) [#10234](https://github.com/vuejs/core/issues/10234)



## [3.4.15](https://github.com/vuejs/core/compare/v3.4.14...v3.4.15) (2024-01-18)


### Bug Fixes

* **compiler-sfc:** fix type resolution for symlinked node_modules structure w/ pnpm ([75e866b](https://github.com/vuejs/core/commit/75e866bd4ef368b4e037a4933dbaf188920dc683)), closes [#10121](https://github.com/vuejs/core/issues/10121)
* correct url for production error reference links ([c3087ff](https://github.com/vuejs/core/commit/c3087ff2cce7d96c60a870f8233441311ab4dfb4))
* **hydration:** fix incorect mismatch warning for option with non-string value and inner text ([d16a213](https://github.com/vuejs/core/commit/d16a2138a33b106b9e1499bbb9e1c67790370c97))
* **reactivity:** re-fix [#10114](https://github.com/vuejs/core/issues/10114) ([#10123](https://github.com/vuejs/core/issues/10123)) ([c2b274a](https://github.com/vuejs/core/commit/c2b274a887f61deb7e0185d1bef3b77d31e991cc))
* **runtime-core:** should not warn out-of-render slot fn usage when mounting another app in setup ([#10125](https://github.com/vuejs/core/issues/10125)) ([6fa33e6](https://github.com/vuejs/core/commit/6fa33e67ec42af140a86fbdb86939032c3a1f345)), closes [#10124](https://github.com/vuejs/core/issues/10124)


### Performance Improvements

* **templateRef:** avoid double render when using template ref on v-for ([de4d2e2](https://github.com/vuejs/core/commit/de4d2e2143ea8397cebeb1c7a57a60007b283c9f)), closes [#9908](https://github.com/vuejs/core/issues/9908)
* **v-model:** optimize v-model multiple select w/ large lists ([2ffb956](https://github.com/vuejs/core/commit/2ffb956efe692da059f4895669084c5278871351)), closes [#10014](https://github.com/vuejs/core/issues/10014)



## [3.4.14](https://github.com/vuejs/core/compare/v3.4.13...v3.4.14) (2024-01-15)


### Bug Fixes

* **compiler-sfc:** enable prefixIdentifiers by default when reparsing on consumed AST ([#10105](https://github.com/vuejs/core/issues/10105)) ([48bf8e4](https://github.com/vuejs/core/commit/48bf8e4c708ec620e4852d71c8713394457108ee))
* **deps:** update dependency postcss to ^8.4.33 ([#10110](https://github.com/vuejs/core/issues/10110)) ([a557006](https://github.com/vuejs/core/commit/a557006f8e7f110c6f322de38931dceaab8e9cbb))
* **reactivity:** fix regression for computed with mutation ([#10119](https://github.com/vuejs/core/issues/10119)) ([20f62af](https://github.com/vuejs/core/commit/20f62afaafd422e42b99dde9c16f9a4ebfb9c5f7)), closes [#10114](https://github.com/vuejs/core/issues/10114)



## [3.4.13](https://github.com/vuejs/core/compare/v3.4.12...v3.4.13) (2024-01-13)


### Bug Fixes

* **reactivity:** fix dirtyLevel checks for recursive effects ([#10101](https://github.com/vuejs/core/issues/10101)) ([e45a8d2](https://github.com/vuejs/core/commit/e45a8d24b46c174deb46ed952bdaf54c81ad5a85)), closes [#10082](https://github.com/vuejs/core/issues/10082)



## [3.4.12](https://github.com/vuejs/core/compare/v3.4.11...v3.4.12) (2024-01-13)


### Reverts

* fix(reactivity): correct dirty assign in render function ([#10091](https://github.com/vuejs/core/issues/10091)) ([8b18481](https://github.com/vuejs/core/commit/8b1848173b0bc8fd84ce1da1af8d373c044bf073)), closes [#10098](https://github.com/vuejs/core/issues/10098) [#10100](https://github.com/vuejs/core/issues/10100)



## [3.4.11](https://github.com/vuejs/core/compare/v3.4.10...v3.4.11) (2024-01-12)


### Bug Fixes

* **hydration:** improve mismatch when client value is null or undefined ([#10086](https://github.com/vuejs/core/issues/10086)) ([08b60f5](https://github.com/vuejs/core/commit/08b60f5d0d5b57fcf3347ef66cbeab472c475a88))
* **reactivity:** correct dirty assign in render function ([#10091](https://github.com/vuejs/core/issues/10091)) ([8d04205](https://github.com/vuejs/core/commit/8d042050411fdf04d9d1d6c153287164b12e0255)), closes [#10082](https://github.com/vuejs/core/issues/10082)
* **runtime-core:** filter single root for nested DEV_ROOT_FRAGMENT ([#8593](https://github.com/vuejs/core/issues/8593)) ([d35b877](https://github.com/vuejs/core/commit/d35b87725ab3e2bdc86fb5781ab34939f7ec1029)), closes [#5203](https://github.com/vuejs/core/issues/5203) [#8581](https://github.com/vuejs/core/issues/8581) [#10087](https://github.com/vuejs/core/issues/10087)



## [3.4.10](https://github.com/vuejs/core/compare/v3.4.9...v3.4.10) (2024-01-11)


### Bug Fixes

* **hydration:** should not warn on falsy bindings of non-property keys ([3907c87](https://github.com/vuejs/core/commit/3907c87ce23cc6ef4a739b5a66ddb553e8723114))



## [3.4.9](https://github.com/vuejs/core/compare/v3.4.8...v3.4.9) (2024-01-11)


### Bug Fixes

* **build:** avoid accessing __FEATURE_PROD_DEVTOOLS__ flag in root scope ([dfd9654](https://github.com/vuejs/core/commit/dfd9654665890d1bc7129f6e3c2faaa5b1f28f72))
* **hydration:** do not warn against bindings w/ object values ([dcc68ef](https://github.com/vuejs/core/commit/dcc68ef7d48973abd8dd3178b46e50e3b0785ea4))
* **runtime-dom:** unify behavior for v-show + style display binding ([#10075](https://github.com/vuejs/core/issues/10075)) ([cd419ae](https://github.com/vuejs/core/commit/cd419aec3cb615eaea8b2324356f38f4c0ff1fcc)), closes [#10074](https://github.com/vuejs/core/issues/10074)
* **suspense:** avoid double-patching nested suspense when parent suspense is not resolved ([#10055](https://github.com/vuejs/core/issues/10055)) ([bcda96b](https://github.com/vuejs/core/commit/bcda96b525801eb7a1d397300fb3f2f9b827ddfb)), closes [#8678](https://github.com/vuejs/core/issues/8678)



## [3.4.8](https://github.com/vuejs/core/compare/v3.4.7...v3.4.8) (2024-01-10)


### Bug Fixes

* **hydration:** fix class and style hydration mismatch message ([5af3987](https://github.com/vuejs/core/commit/5af398729168481c3bee741b4f36fa4f375e0f4a)), closes [#10067](https://github.com/vuejs/core/issues/10067)
* **hydration:** improve attr hydration mismatch check for boolean attrs ([972face](https://github.com/vuejs/core/commit/972facee0d892a1b6d9d4ad1da5da9306ed45c3f)), closes [#10057](https://github.com/vuejs/core/issues/10057) [#10060](https://github.com/vuejs/core/issues/10060)
* **suspense:** fix more suspense patch before resolve edge cases ([70ad4ca](https://github.com/vuejs/core/commit/70ad4caad7d19938f8ccf1ede3228a81254dd4bf)), closes [#10017](https://github.com/vuejs/core/issues/10017)



## [3.4.7](https://github.com/vuejs/core/compare/v3.4.6...v3.4.7) (2024-01-09)


### Bug Fixes

* **parser:** skip compat mode check for SFC root `<template>` tags ([#10034](https://github.com/vuejs/core/issues/10034)) ([923d560](https://github.com/vuejs/core/commit/923d560d0b6713144671809b6dfeb1e2da503b1f))
* **types:** fix functional component for `h` ([#9991](https://github.com/vuejs/core/issues/9991)) ([438a74a](https://github.com/vuejs/core/commit/438a74aad840183286fbdb488178510f37218a73))


### Reverts

* "dx(computed): warn incorrect use of getCurrentInstance inside computed" ([2fd3905](https://github.com/vuejs/core/commit/2fd39057386644c8bfee426c60a51f2b07a79b09))



## [3.4.6](https://github.com/vuejs/core/compare/v3.4.5...v3.4.6) (2024-01-08)


### Bug Fixes

* **build:** revert "build: add production/development export conditions ([#9977](https://github.com/vuejs/core/issues/9977))" ([7bd4e90](https://github.com/vuejs/core/commit/7bd4e90506547c42234165776b01793abd37b148)), closes [#10012](https://github.com/vuejs/core/issues/10012) [#10020](https://github.com/vuejs/core/issues/10020)
* fix post watcher fire timing on nested app mounts ([3c3561e](https://github.com/vuejs/core/commit/3c3561e7203091f49d57f1da6d822c91e462bc46)), closes [#10005](https://github.com/vuejs/core/issues/10005)
* **hydration:** avoid hydration mismatch warning for styles with different order ([#10011](https://github.com/vuejs/core/issues/10011)) ([2701355](https://github.com/vuejs/core/commit/2701355e8eb07ab664e398d9fc05d6c4e2e9b20e)), closes [#10000](https://github.com/vuejs/core/issues/10000) [#10006](https://github.com/vuejs/core/issues/10006)
* **runtime-core:** handle fragment with null children ([#10010](https://github.com/vuejs/core/issues/10010)) ([3bf34b7](https://github.com/vuejs/core/commit/3bf34b767e4dd3cf6a974301ecf0363ae4dda4ec)), closes [#10007](https://github.com/vuejs/core/issues/10007)
* **scheduler:** sort nested postFlushCbs ([d9162df](https://github.com/vuejs/core/commit/d9162dfc2ee0c3a369fb9bf32ff413e74761bee6)), closes [#10003](https://github.com/vuejs/core/issues/10003)
* **suspense:** fix anchor for suspense with transition out-in ([#9999](https://github.com/vuejs/core/issues/9999)) ([a3fbf21](https://github.com/vuejs/core/commit/a3fbf2132b0cd3655e969e290548c8fabc08fd33)), closes [#9996](https://github.com/vuejs/core/issues/9996)
* **types:** allow `null` type for textarea value ([#9997](https://github.com/vuejs/core/issues/9997)) ([c379bc2](https://github.com/vuejs/core/commit/c379bc29efc70d6ac5840de10c357ee3dad998c0)), closes [#9904](https://github.com/vuejs/core/issues/9904)



## [3.4.5](https://github.com/vuejs/core/compare/v3.4.4...v3.4.5) (2024-01-04)


### Bug Fixes

* **compiler-sfc:** fix co-usage of defineModel transform options and props destructure ([b20350d](https://github.com/vuejs/core/commit/b20350ded562d27e5901f308d0bc13344f840c4a)), closes [#9972](https://github.com/vuejs/core/issues/9972)
* **compiler-sfc:** fix sfc template unref rewrite for class instantiation ([ae60a91](https://github.com/vuejs/core/commit/ae60a91cc23424493071ad9088782763eb1e8ff7)), closes [#6483](https://github.com/vuejs/core/issues/6483) [#6491](https://github.com/vuejs/core/issues/6491)
* **compiler-ssr:** fix node clone edge case caused by AST reuse ([#9983](https://github.com/vuejs/core/issues/9983)) ([7dbdb3e](https://github.com/vuejs/core/commit/7dbdb3edf0ab648965331ca42f069387c97a1c8a)), closes [#9981](https://github.com/vuejs/core/issues/9981)
* **watch:** cleanup watcher effect from scope when manually stopped ([#9978](https://github.com/vuejs/core/issues/9978)) ([d2d8955](https://github.com/vuejs/core/commit/d2d89551bb06dc05cb7ae0496b8f345ae0de78ed))



## [3.4.4](https://github.com/vuejs/core/compare/v3.4.3...v3.4.4) (2024-01-03)


### Bug Fixes

* **compiler-sfc:** fix scss source map regression ([71d3121](https://github.com/vuejs/core/commit/71d3121b72c449351e718ee1539bdfa35b68bb32)), closes [#9970](https://github.com/vuejs/core/issues/9970) [#9969](https://github.com/vuejs/core/issues/9969)
* **compiler-sfc:** use compilerOptions when re-parsing consumed AST ([d94d8d4](https://github.com/vuejs/core/commit/d94d8d4bffd1daf171a655b292745ffc3e63052d))
* **defineModel:** support kebab-case/camelCase mismatches ([#9950](https://github.com/vuejs/core/issues/9950)) ([10ccb9b](https://github.com/vuejs/core/commit/10ccb9bfa0f5f3016207fc32b9611bab98e6f090))
* **runtime-core:** correctly assign suspenseId to avoid conflicts with the default id ([#9966](https://github.com/vuejs/core/issues/9966)) ([0648804](https://github.com/vuejs/core/commit/06488047c184dae3070d0008379716690edceb46)), closes [#9944](https://github.com/vuejs/core/issues/9944)
* **ssr:** avoid rendering transition-group slot content as a fragment ([#9961](https://github.com/vuejs/core/issues/9961)) ([0160264](https://github.com/vuejs/core/commit/0160264d677478ee928e8e851f39a9e94f97e337)), closes [#9933](https://github.com/vuejs/core/issues/9933)
* **watch:** remove instance unmounted short circuit in getter of `watchEffect` ([#9948](https://github.com/vuejs/core/issues/9948)) ([f300a40](https://github.com/vuejs/core/commit/f300a4001ec40cadef2520267eb5841ab48cf005))
* **watch:** revert watch behavior when watching shallow reactive objects ([a9f781a](https://github.com/vuejs/core/commit/a9f781a92cbc7de7b25c9e3d5b1295ca99eb6d86)), closes [#9965](https://github.com/vuejs/core/issues/9965)


### Performance Improvements

* **watch:** avoid double traverse for reactive source ([24d77c2](https://github.com/vuejs/core/commit/24d77c25ce5d5356adb5367beef1d23e6e340b35))



## [3.4.3](https://github.com/vuejs/core/compare/v3.4.2...v3.4.3) (2023-12-30)


### Bug Fixes

* **compiler-sfc:** respect sfc parse options in cache key ([b8d58ec](https://github.com/vuejs/core/commit/b8d58ec4f42cbeb9443bf06138add46158db9af0))



## [3.4.2](https://github.com/vuejs/core/compare/v3.4.1...v3.4.2) (2023-12-30)


### Bug Fixes

* **compiler-sfc:** fix dev regression for dot / namespace component usage ([dce99c1](https://github.com/vuejs/core/commit/dce99c12df981ca45a4d848c37ba8b16496025f0)), closes [#9947](https://github.com/vuejs/core/issues/9947)
* **runtime-core:** support deep: false when watch reactive ([#9928](https://github.com/vuejs/core/issues/9928)) ([4f703d1](https://github.com/vuejs/core/commit/4f703d120d76d711084346f73ea295c73e6ef6b6)), closes [#9916](https://github.com/vuejs/core/issues/9916)
* **ssr:** fix hydration error for slot outlet inside transition-group ([#9937](https://github.com/vuejs/core/issues/9937)) ([6cb00ed](https://github.com/vuejs/core/commit/6cb00ed0f9b64428ec18fada0f68467d6a813fde)), closes [#9933](https://github.com/vuejs/core/issues/9933)



## [3.4.1](https://github.com/vuejs/core/compare/v3.4.0...v3.4.1) (2023-12-30)


### Bug Fixes

* **compat:** correct enum value for COMPILER_FILTERS feature ([#9875](https://github.com/vuejs/core/issues/9875)) ([77d33e2](https://github.com/vuejs/core/commit/77d33e263cf19983caf4e5c53a0eb0bee374843c))
* **defineModel:** always default modifiers to empty object ([9bc3c7e](https://github.com/vuejs/core/commit/9bc3c7e29cf15f5ca96703542d10cfd786a3fc55)), closes [#9945](https://github.com/vuejs/core/issues/9945)
* **defineModel:** support local mutation when only prop but no listener is passed ([97ce041](https://github.com/vuejs/core/commit/97ce041910b6ca4bef10f939493d6b5a06ea5b07))
* **types:** fix defineModel watch type error ([#9942](https://github.com/vuejs/core/issues/9942)) ([4af8583](https://github.com/vuejs/core/commit/4af85835f7e593a7dffa7dc7e99f14877eb70fd1)), closes [#9939](https://github.com/vuejs/core/issues/9939)


### Features

* **compiler-sfc:** support passing template parsing options when parsing sfc ([6fab855](https://github.com/vuejs/core/commit/6fab8551e4aeef4610987640de8b435b1ae321bb)) (necessary to fix https://github.com/vitejs/vite-plugin-vue/issues/322)



# [3.4.0 Slam Dunk](https://github.com/vuejs/core/compare/v3.4.0-rc.3...v3.4.0) (2023-12-29)

> Read [this blog post](https://blog.vuejs.org/posts/vue-3-4) for an overview of the release highlights.

### Potential Actions Needed

1. To fully leverage new features in 3.4, it is recommended to also update the following dependencies when upgrading to 3.4:

   - Volar / vue-tsc@^1.8.27 (**required**)
   - @vitejs/plugin-vue@^5.0.0 (if using Vite)
   - nuxt@^3.9.0 (if using Nuxt)
   - vue-loader@^17.4.0 (if using webpack or vue-cli)

2. If using TSX with Vue, check actions needed in [Removed: Global JSX Namespace](https://blog.vuejs.org/posts/vue-3-4#global-jsx-namespace).

3. Make sure you are no longer using any deprecated features (if you are, you should have warnings in the console telling you so). They may have been [removed in 3.4](https://blog.vuejs.org/posts/vue-3-4#other-removed-features).

### Features

* **general:** MathML support ([#7836](https://github.com/vuejs/core/issues/7836)) ([d42b6ba](https://github.com/vuejs/core/commit/d42b6ba3f530746eb1221eb7a4be0f44eb56f7d3)), closes [#7820](https://github.com/vuejs/core/issues/7820)
* **reactivity:** more efficient reactivity system ([#5912](https://github.com/vuejs/core/issues/5912)) ([16e06ca](https://github.com/vuejs/core/commit/16e06ca08f5a1e2af3fc7fb35de153dbe0c3087d)), closes [#311](https://github.com/vuejs/core/issues/311) [#1811](https://github.com/vuejs/core/issues/1811) [#6018](https://github.com/vuejs/core/issues/6018) [#7160](https://github.com/vuejs/core/issues/7160) [#8714](https://github.com/vuejs/core/issues/8714) [#9149](https://github.com/vuejs/core/issues/9149) [#9419](https://github.com/vuejs/core/issues/9419) [#9464](https://github.com/vuejs/core/issues/9464)
* **reactivity:** expose last result for computed getter ([#9497](https://github.com/vuejs/core/issues/9497)) ([48b47a1](https://github.com/vuejs/core/commit/48b47a1ab63577e2dbd91947eea544e3ef185b85))
* **runtime-core / dx:** link errors to docs in prod build ([#9165](https://github.com/vuejs/core/issues/9165)) ([9f8ba98](https://github.com/vuejs/core/commit/9f8ba9821fe166f77e63fa940e9e7e13ec3344fa))
* **runtime-core:** add `once` option to watch ([#9034](https://github.com/vuejs/core/issues/9034)) ([a645e7a](https://github.com/vuejs/core/commit/a645e7aa51006516ba668b3a4365d296eb92ee7d))
* **runtime-core:** provide full props to props validator functions ([#3258](https://github.com/vuejs/core/issues/3258)) ([8e27692](https://github.com/vuejs/core/commit/8e27692029a4645cd54287f776c0420f2b82740b))
* **compiler-core:** export error message ([#8729](https://github.com/vuejs/core/issues/8729)) ([f7e80ee](https://github.com/vuejs/core/commit/f7e80ee4a065a9eaba98720abf415d9e87756cbd))
* **compiler-core:** support specifying root namespace when parsing ([40f72d5](https://github.com/vuejs/core/commit/40f72d5e50b389cb11b7ca13461aa2a75ddacdb4))
* **compiler-core:** support v-bind shorthand for key and value with the same name ([#9451](https://github.com/vuejs/core/issues/9451)) ([26399aa](https://github.com/vuejs/core/commit/26399aa6fac1596b294ffeba06bb498d86f5508c))
* **compiler-core:** improve parsing tolerance for language-tools ([41ff68e](https://github.com/vuejs/core/commit/41ff68ea579d933333392146625560359acb728a))
* **compiler-core:** support accessing Error as global in template expressions ([#7018](https://github.com/vuejs/core/issues/7018)) ([bcca475](https://github.com/vuejs/core/commit/bcca475dbc58d76434cd8120b94929758cee2825))
* **compiler-core:** lift vnode hooks deprecation warning to error ([8abc754](https://github.com/vuejs/core/commit/8abc754d5d86d9dfd5a7927b846f1a743f352364))
* **compiler-core:** export runtime error strings ([#9301](https://github.com/vuejs/core/issues/9301)) ([feb2f2e](https://github.com/vuejs/core/commit/feb2f2edce2d91218a5e9a52c81e322e4033296b))
* **compiler-core:** add current filename to TransformContext ([#8950](https://github.com/vuejs/core/issues/8950)) ([638f1ab](https://github.com/vuejs/core/commit/638f1abbb632000553e2b7d75e87c95d8ca192d6))
* **compiler-sfc:** analyze import usage in template via AST ([#9729](https://github.com/vuejs/core/issues/9729)) ([e8bbc94](https://github.com/vuejs/core/commit/e8bbc946cba6bf74c9da56f938b67d2a04c340ba)), closes [#8897](https://github.com/vuejs/core/issues/8897) [nuxt/nuxt#22416](https://github.com/nuxt/nuxt/issues/22416)
* **compiler-sfc:** expose resolve type-based props and emits ([#8874](https://github.com/vuejs/core/issues/8874)) ([9e77580](https://github.com/vuejs/core/commit/9e77580c0c2f0d977bd0031a1d43cc334769d433))
* **compiler-sfc:** bump postcss-modules to v6 ([2a507e3](https://github.com/vuejs/core/commit/2a507e32f0e2ef73813705a568b8633f68bda7a9))
* **compiler-sfc:** promote defineModel stable ([#9598](https://github.com/vuejs/core/issues/9598)) ([ef688ba](https://github.com/vuejs/core/commit/ef688ba92bfccbc8b7ea3997eb297665d13e5249))
* **compiler-sfc:** support import attributes and `using` syntax ([#8786](https://github.com/vuejs/core/issues/8786)) ([5b2bd1d](https://github.com/vuejs/core/commit/5b2bd1df78e8ff524c3a184adaa284681aba6574))
* **compiler-sfc:** `defineModel` support local mutation by default, remove local option ([f74785b](https://github.com/vuejs/core/commit/f74785bc4ad351102dde17fdfd2c7276b823111f)), closes [/github.com/vuejs/rfcs/discussions/503#discussioncomment-7566278](https://github.com//github.com/vuejs/rfcs/discussions/503/issues/discussioncomment-7566278)
* **ssr:** add `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` feature flag ([#9550](https://github.com/vuejs/core/issues/9550)) ([bc7698d](https://github.com/vuejs/core/commit/bc7698dbfed9b5327a93565f9df336ae5a94d605))
* **ssr:** improve ssr hydration mismatch checks ([#5953](https://github.com/vuejs/core/issues/5953)) ([2ffc1e8](https://github.com/vuejs/core/commit/2ffc1e8cfdc6ec9c45c4a4dd8e3081b2aa138f1e)), closes [#5063](https://github.com/vuejs/core/issues/5063)
* **types:** use enum to replace const enum ([#9261](https://github.com/vuejs/core/issues/9261)) ([fff7b86](https://github.com/vuejs/core/commit/fff7b864f4292d0430ba2bda7098ad43876b0210)), closes [#1228](https://github.com/vuejs/core/issues/1228)
* **types:** add emits and slots type to `FunctionalComponent` ([#8644](https://github.com/vuejs/core/issues/8644)) ([927ab17](https://github.com/vuejs/core/commit/927ab17cfc645e82d061fdf227c34689491268e1))
* **types:** export `AriaAttributes` type ([#8909](https://github.com/vuejs/core/issues/8909)) ([fd0b6ba](https://github.com/vuejs/core/commit/fd0b6ba01660499fa07b0cf360eefaac8cca8287))
* **types:** export `ObjectPlugin` and `FunctionPlugin` types ([#8946](https://github.com/vuejs/core/issues/8946)) ([fa4969e](https://github.com/vuejs/core/commit/fa4969e7a3aefa6863203f9294fc5e769ddf6d8f)), closes [#8577](https://github.com/vuejs/core/issues/8577)
* **types:** expose `DefineProps` type ([096ba81](https://github.com/vuejs/core/commit/096ba81817b7da15f61bc55fc1a93f72ac9586e0))
* **types:** expose `PublicProps` type ([#2403](https://github.com/vuejs/core/issues/2403)) ([44135dc](https://github.com/vuejs/core/commit/44135dc95fb8fea26b84d1433839d28b8c21f708))
* **types:** improve event type inference when using `h` with native elements  ([#9756](https://github.com/vuejs/core/issues/9756)) ([a625376](https://github.com/vuejs/core/commit/a625376ac8901eea81bf3c66cb531f2157f073ef))
* **types:** provide `ComponentInstance` type ([#5408](https://github.com/vuejs/core/issues/5408)) ([bfb8565](https://github.com/vuejs/core/commit/bfb856565d3105db4b18991ae9e404e7cc989b25))
* **types:** support passing generics when registering global directives ([#9660](https://github.com/vuejs/core/issues/9660)) ([a41409e](https://github.com/vuejs/core/commit/a41409ed02a8c7220e637f56caf6813edeb077f8))


### Performance Improvements

* **compiler-sfc:** avoid sfc source map unnecessary serialization and parsing ([f15d2f6](https://github.com/vuejs/core/commit/f15d2f6cf69c0c39f8dfb5c33122790c68bf92e2))
* **compiler-sfc:** remove magic-string trim on script ([e8e3ec6](https://github.com/vuejs/core/commit/e8e3ec6ca7392e43975c75b56eaaa711d5ea9410))
* **compiler-sfc:** use faster source map addMapping ([50cde7c](https://github.com/vuejs/core/commit/50cde7cfbcc49022ba88f5f69fa9b930b483c282))
* **compiler-core:** optimize away isBuiltInType ([66c0ed0](https://github.com/vuejs/core/commit/66c0ed0a3c1c6f37dafc6b1c52b75c6bf60e3136))
* **compiler-core:** optimize position cloning ([2073236](https://github.com/vuejs/core/commit/20732366b9b3530d33b842cf1fc985919afb9317))
* **codegen:** optimize line / column calculation during codegen ([3be53d9](https://github.com/vuejs/core/commit/3be53d9b974dae1a10eb795cade71ae765e17574))
* **codegen:** optimize source map generation ([c11002f](https://github.com/vuejs/core/commit/c11002f16afd243a2b15b546816e73882eea9e4d))
* **shared:** optimize makeMap ([ae6fba9](https://github.com/vuejs/core/commit/ae6fba94954bac6430902f77b0d1113a98a75b18))


### BREAKING CHANGES

#### Global JSX Registration Removed

Starting in 3.4, Vue no longer registers the global `JSX` namespace by default. This is necessary to avoid global namespace collision with React so that TSX of both libs can co-exist in the same project. This should not affect SFC-only users with latest version of Volar.

If you are using TSX, there are two options:

1. Explicitly set [jsxImportSource](https://www.typescriptlang.org/tsconfig#jsxImportSource) to `'vue'` in `tsconfig.json` before upgrading to 3.4. You can also opt-in per file by adding a `/* @jsxImportSource vue */` comment at the top of the file.

2. If you have code that depends on the presence of the global `JSX` namespace, e.g. usage of types like `JSX.Element` etc., you can retain the exact pre-3.4 global behavior by explicitly referencing `vue/jsx`, which registers the global `JSX` namespace.

Note that this is a type-only breaking change in a minor release, which adheres to our [release policy](https://vuejs.org/about/releases.html#semantic-versioning-edge-cases).

#### Deprecated Features Removed

- [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) was marked deprecated in 3.3 and is now removed in 3.4. This change does not require a major due to the feature being experimental. Users who wish to continue using the feature can do so via the [Vue Macros plugin](https://vue-macros.dev/features/reactivity-transform.html).
- `app.config.unwrapInjectedRef` has been removed. It was deprecated and enabled by default in 3.3. In 3.4 it is no longer possible to disable this behavior.
- `@vnodeXXX` event listeners in templates are now a compiler error instead of a deprecation warning. Use `@vue:XXX` listeners instead.
- `v-is` directive has been removed. It was deprecated in 3.3. Use the [`is` attribute with `vue:` prefix](https://vuejs.org/api/built-in-special-attributes.html#is) instead.

# [3.4.0-rc.3](https://github.com/vuejs/core/compare/v3.4.0-rc.2...v3.4.0-rc.3) (2023-12-27)


### Bug Fixes

* also export runtime error strings in all cjs builds ([38706e4](https://github.com/vuejs/core/commit/38706e4a1e5e5380e7df910b2a784d0a9bc9db29))


### Features

* **defineModel:** support modifiers and transformers ([a772031](https://github.com/vuejs/core/commit/a772031ea8431bd732ffeaeaac09bd76a0daec9b))



# [3.4.0-rc.2](https://github.com/vuejs/core/compare/v3.4.0-rc.1...v3.4.0-rc.2) (2023-12-26)


### Bug Fixes

* **deps:** update dependency @vue/repl to ^3.1.0 ([#9911](https://github.com/vuejs/core/issues/9911)) ([f96c413](https://github.com/vuejs/core/commit/f96c413e8ef2f24cacda5bb499492922f62c6e8b))
* **types:** fix distribution of union types when unwrapping setup bindings ([#9909](https://github.com/vuejs/core/issues/9909)) ([0695c69](https://github.com/vuejs/core/commit/0695c69e0dfaf99882a623fe75b433c9618ea648)), closes [#9903](https://github.com/vuejs/core/issues/9903)
* **warning:** ensure prod hydration warnings actually work ([b4ebe7a](https://github.com/vuejs/core/commit/b4ebe7ae8b904f28cdda33caf87bc05718d3a08a))


### Features

* **compiler-sfc:** export aggregated error messages for compiler-core and compiler-dom ([25c726e](https://github.com/vuejs/core/commit/25c726eca81fc384b41fafbeba5e8dfcda1f030f))



# [3.4.0-rc.1](https://github.com/vuejs/core/compare/v3.4.0-beta.4...v3.4.0-rc.1) (2023-12-25)


### Bug Fixes

* **compiler-core:** fix parsing `<script setup>` generics with > ([7aa3f25](https://github.com/vuejs/core/commit/7aa3f250f26d58ee2db82af907de8b9105e6e418)), closes [#9890](https://github.com/vuejs/core/issues/9890)
* **compiler-sfc:** fix type resolution for shared type w/ different generic parameters ([a8d0b1b](https://github.com/vuejs/core/commit/a8d0b1b38b092ec2d10b32bedcee2eea33b77657)), closes [#9871](https://github.com/vuejs/core/issues/9871)
* **ssr:** avoid hydration mismatch warning for classes with different order ([e585b0d](https://github.com/vuejs/core/commit/e585b0db43150c8b8b3d78f71e12efccc018a38d))



# [3.4.0-beta.4](https://github.com/vuejs/core/compare/v3.3.13...v3.4.0-beta.4) (2023-12-19)


### Bug Fixes

* **compile-sfc:** fix identifier prefixing edge case caused by reused AST ([#9867](https://github.com/vuejs/core/issues/9867)) ([eb51b23](https://github.com/vuejs/core/commit/eb51b23d8512f15665d6f8bcdfd51582e0cd8ce8)), closes [#9853](https://github.com/vuejs/core/issues/9853) [#9863](https://github.com/vuejs/core/issues/9863)
* **ssr:** fix hydration prop mismatch check for class on SVG elements ([e8448b0](https://github.com/vuejs/core/commit/e8448b018d9f837c08eace90cab404a27f68e31a))


### Features

* **runtime-core:** throw real error when scheduler detects infinite loop during dev ([#7447](https://github.com/vuejs/core/issues/7447)) ([1d79b64](https://github.com/vuejs/core/commit/1d79b64ebce884d97136d71aa722347470b13e35)), closes [#7437](https://github.com/vuejs/core/issues/7437)



## [3.3.13](https://github.com/vuejs/core/compare/v3.3.12...v3.3.13) (2023-12-19)


### Bug Fixes

* **compiler-core:** fix v-on with modifiers on inline expression of undefined ([#9866](https://github.com/vuejs/core/issues/9866)) ([bae79dd](https://github.com/vuejs/core/commit/bae79ddf8564a2da4a5365cfeb8d811990f42335)), closes [#9865](https://github.com/vuejs/core/issues/9865)
* **runtime-dom:** cache event handlers by key/modifiers ([#9851](https://github.com/vuejs/core/issues/9851)) ([04d2c05](https://github.com/vuejs/core/commit/04d2c05054c26b02fbc1d84839b0ed5cd36455b6)), closes [#9849](https://github.com/vuejs/core/issues/9849)
* **types:** extract properties from extended collections ([#9854](https://github.com/vuejs/core/issues/9854)) ([24b1c1d](https://github.com/vuejs/core/commit/24b1c1dd57fd55d998aa231a147500e010b10219)), closes [#9852](https://github.com/vuejs/core/issues/9852)



# [3.4.0-beta.3](https://github.com/vuejs/core/compare/v3.3.12...v3.4.0-beta.3) (2023-12-16)


### Bug Fixes

* **compiler-core:** vnode hooks error message ([#9842](https://github.com/vuejs/core/issues/9842)) ([7bc3c9e](https://github.com/vuejs/core/commit/7bc3c9e205c5158230772d9fcd25bf300809342e))
* **defineModel:** ensure trigger effect when prop changed ([#9841](https://github.com/vuejs/core/issues/9841)) ([eb12f21](https://github.com/vuejs/core/commit/eb12f211b8e312fd64d91ef1a58b2c2db618bdee)), closes [#9838](https://github.com/vuejs/core/issues/9838)
* **mathml:** update known mathML tags ([#9829](https://github.com/vuejs/core/issues/9829)) ([ebd78d2](https://github.com/vuejs/core/commit/ebd78d2c99d9587307e444e6b7baa7bc920d42e7))
* **Suspense:** fix edge case of Suspense being patched during async HOC child remount ([f0f6f7c](https://github.com/vuejs/core/commit/f0f6f7cea6e16650181e71dcfccbee405a1db503))



## [3.3.12](https://github.com/vuejs/core/compare/v3.3.11...v3.3.12) (2023-12-16)

### Bug Fixes

* **hydration:** handle appear transition before patch props ([#9837](https://github.com/vuejs/core/issues/9837)) ([e70f4c4](https://github.com/vuejs/core/commit/e70f4c47c553b6e16d8fad70743271ca23802fe7)), closes [#9832](https://github.com/vuejs/core/issues/9832)
* **sfc/cssVars:** fix loss of CSS v-bind variables when setting inline style with string value ([#9824](https://github.com/vuejs/core/issues/9824)) ([0a387df](https://github.com/vuejs/core/commit/0a387dfb1d04afb6eae4296b6da76dfdaca77af4)), closes [#9821](https://github.com/vuejs/core/issues/9821)
* **ssr:** fix suspense hydration of fallback content ([#7188](https://github.com/vuejs/core/issues/7188)) ([60415b5](https://github.com/vuejs/core/commit/60415b5d67df55f1fd6b176615299c08640fa142))
* **types:** add `xmlns:xlink` to `SVGAttributes` ([#9300](https://github.com/vuejs/core/issues/9300)) ([0d61b42](https://github.com/vuejs/core/commit/0d61b429ecf63591d31e09702058fa4c7132e1a7)), closes [#9299](https://github.com/vuejs/core/issues/9299)
* **types:** fix `shallowRef` type error ([#9839](https://github.com/vuejs/core/issues/9839)) ([9a57158](https://github.com/vuejs/core/commit/9a571582b53220270e498d8712ea59312c0bef3a))
* **types:** support for generic keyof slots ([#8374](https://github.com/vuejs/core/issues/8374)) ([213eba4](https://github.com/vuejs/core/commit/213eba479ce080efc1053fe636f6be4a4c889b44))



# [3.4.0-beta.2](https://github.com/vuejs/core/compare/v3.4.0-beta.1...v3.4.0-beta.2) (2023-12-14)


### Features

* **types:** remove default jsx global registration ([92b8d9c](https://github.com/vuejs/core/commit/92b8d9cef69146540db2bf7f2a5632ab5d38f672))


### BREAKING CHANGES

* **types:** Vue no longer registers the global `JSX` namespace by
default.



# [3.4.0-beta.1](https://github.com/vuejs/core/compare/v3.3.11...v3.4.0-beta.1) (2023-12-13)


### Bug Fixes

* **compiler-core:** use the same resolved options for all compile stages ([#9760](https://github.com/vuejs/core/issues/9760)) ([0dc875d](https://github.com/vuejs/core/commit/0dc875d53e5d869b44d0c1a70736ec859337b58f))
* **hydration:** should not warn mismatch for nullish prop ([33159a5](https://github.com/vuejs/core/commit/33159a5916bf7686fe53517befa59b450b34e974))
* **hydration:** swap client/server labels for hydration mismatch warnings ([f41fd86](https://github.com/vuejs/core/commit/f41fd86d5f26bd0009b4ca285ddc3cefaafa9f7c)), closes [#9098](https://github.com/vuejs/core/issues/9098) [#5953](https://github.com/vuejs/core/issues/5953)
* **runtime-core:** fix suspense crash when patching non-resolved async setup component ([#7290](https://github.com/vuejs/core/issues/7290)) ([bb0c889](https://github.com/vuejs/core/commit/bb0c8899cadd03af22e23c0383aaab363635c5b4)), closes [#5993](https://github.com/vuejs/core/issues/5993) [#6463](https://github.com/vuejs/core/issues/6463) [#6949](https://github.com/vuejs/core/issues/6949) [#6095](https://github.com/vuejs/core/issues/6095) [#8121](https://github.com/vuejs/core/issues/8121)
* **runtime-core:** properly pop warning context when mounting components with async setup ([69a2acc](https://github.com/vuejs/core/commit/69a2acc6ea159da8300a68ecc8953f19932c251b))
* **ssr:** fix suspense hydration of fallback content ([#7188](https://github.com/vuejs/core/issues/7188)) ([60415b5](https://github.com/vuejs/core/commit/60415b5d67df55f1fd6b176615299c08640fa142))
* **ssr:** make isInSSRComponentSetup state sharable across copies of Vue ([e04d821](https://github.com/vuejs/core/commit/e04d821422102446704e223c03e50d26cbb1fe69))
* **Suspense:** handle switching away from kept-alive component before resolve ([aa0c13f](https://github.com/vuejs/core/commit/aa0c13f637df7eb27faa2545ee731f543c0813ec)), closes [#6416](https://github.com/vuejs/core/issues/6416) [#6467](https://github.com/vuejs/core/issues/6467)
* **Suspense:** properly fix [#6416](https://github.com/vuejs/core/issues/6416) ([0db336f](https://github.com/vuejs/core/commit/0db336ff6c640fb9d3e48943c69f4c1737412be4))
* **types:** add `xmlns:xlink` to `SVGAttributes` ([#9300](https://github.com/vuejs/core/issues/9300)) ([0d61b42](https://github.com/vuejs/core/commit/0d61b429ecf63591d31e09702058fa4c7132e1a7)), closes [#9299](https://github.com/vuejs/core/issues/9299)
* **types:** support for generic keyof slots ([#8374](https://github.com/vuejs/core/issues/8374)) ([213eba4](https://github.com/vuejs/core/commit/213eba479ce080efc1053fe636f6be4a4c889b44))


### Features

* **compiler-core:** add current filename to TransformContext ([#8950](https://github.com/vuejs/core/issues/8950)) ([638f1ab](https://github.com/vuejs/core/commit/638f1abbb632000553e2b7d75e87c95d8ca192d6))
* **compiler-sfc:** promote defineModel stable ([#9598](https://github.com/vuejs/core/issues/9598)) ([ef688ba](https://github.com/vuejs/core/commit/ef688ba92bfccbc8b7ea3997eb297665d13e5249))
* **compiler-sfc:** support import attributes and `using` syntax ([#8786](https://github.com/vuejs/core/issues/8786)) ([5b2bd1d](https://github.com/vuejs/core/commit/5b2bd1df78e8ff524c3a184adaa284681aba6574))
* **defineModel:** support local mutation by default, remove local option ([f74785b](https://github.com/vuejs/core/commit/f74785bc4ad351102dde17fdfd2c7276b823111f)), closes [/github.com/vuejs/rfcs/discussions/503#discussioncomment-7566278](https://github.com//github.com/vuejs/rfcs/discussions/503/issues/discussioncomment-7566278)
* MathML support ([#7836](https://github.com/vuejs/core/issues/7836)) ([d42b6ba](https://github.com/vuejs/core/commit/d42b6ba3f530746eb1221eb7a4be0f44eb56f7d3)), closes [#7820](https://github.com/vuejs/core/issues/7820)
* **runtime-core:** provide full props to props validator functions ([#3258](https://github.com/vuejs/core/issues/3258)) ([8e27692](https://github.com/vuejs/core/commit/8e27692029a4645cd54287f776c0420f2b82740b))
* **ssr:** add `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` feature flag ([#9550](https://github.com/vuejs/core/issues/9550)) ([bc7698d](https://github.com/vuejs/core/commit/bc7698dbfed9b5327a93565f9df336ae5a94d605))
* **ssr:** improve ssr hydration mismatch checks ([#5953](https://github.com/vuejs/core/issues/5953)) ([2ffc1e8](https://github.com/vuejs/core/commit/2ffc1e8cfdc6ec9c45c4a4dd8e3081b2aa138f1e)), closes [#5063](https://github.com/vuejs/core/issues/5063)
* **types:** add emits and slots type to `FunctionalComponent` ([#8644](https://github.com/vuejs/core/issues/8644)) ([927ab17](https://github.com/vuejs/core/commit/927ab17cfc645e82d061fdf227c34689491268e1))
* **types:** export AriaAttributes type ([#8909](https://github.com/vuejs/core/issues/8909)) ([fd0b6ba](https://github.com/vuejs/core/commit/fd0b6ba01660499fa07b0cf360eefaac8cca8287))
* **types:** export ObjectPlugin and FunctionPlugin types ([#8946](https://github.com/vuejs/core/issues/8946)) ([fa4969e](https://github.com/vuejs/core/commit/fa4969e7a3aefa6863203f9294fc5e769ddf6d8f)), closes [#8577](https://github.com/vuejs/core/issues/8577)
* **types:** expose `DefineProps` type ([096ba81](https://github.com/vuejs/core/commit/096ba81817b7da15f61bc55fc1a93f72ac9586e0))
* **types:** expose `PublicProps` type ([#2403](https://github.com/vuejs/core/issues/2403)) ([44135dc](https://github.com/vuejs/core/commit/44135dc95fb8fea26b84d1433839d28b8c21f708))
* **types:** improve event type inference when using `h` with native elements  ([#9756](https://github.com/vuejs/core/issues/9756)) ([a625376](https://github.com/vuejs/core/commit/a625376ac8901eea81bf3c66cb531f2157f073ef))
* **types:** provide ComponentInstance type ([#5408](https://github.com/vuejs/core/issues/5408)) ([bfb8565](https://github.com/vuejs/core/commit/bfb856565d3105db4b18991ae9e404e7cc989b25))
* **types:** support passing generics when registering global directives ([#9660](https://github.com/vuejs/core/issues/9660)) ([a41409e](https://github.com/vuejs/core/commit/a41409ed02a8c7220e637f56caf6813edeb077f8))


### Performance Improvements

* use sync watcher for defineModel local mode ([7e60d10](https://github.com/vuejs/core/commit/7e60d1058ff06e3d37c8608f3449453321220edc)), closes [/github.com/vuejs/rfcs/discussions/503#discussioncomment-7566278](https://github.com//github.com/vuejs/rfcs/discussions/503/issues/discussioncomment-7566278)



## [3.3.11](https://github.com/vuejs/core/compare/v3.3.10...v3.3.11) (2023-12-08)


### Bug Fixes

* **custom-element:** correctly handle number type props in prod ([#8989](https://github.com/vuejs/core/issues/8989)) ([d74d364](https://github.com/vuejs/core/commit/d74d364d62db8e48881af6b5a75ce4fb5f36cc35))
* **reactivity:** fix mutation on user proxy of reactive Array ([6ecbd5c](https://github.com/vuejs/core/commit/6ecbd5ce2a7f59314a8326a1d193874b87f4d8c8)), closes [#9742](https://github.com/vuejs/core/issues/9742) [#9751](https://github.com/vuejs/core/issues/9751) [#9750](https://github.com/vuejs/core/issues/9750)
* **runtime-dom:** fix width and height prop check condition ([5b00286](https://github.com/vuejs/core/commit/5b002869c533220706f9788b496b8ca8d8e98609)), closes [#9762](https://github.com/vuejs/core/issues/9762)
* **shared:** handle Map with symbol keys in toDisplayString ([#9731](https://github.com/vuejs/core/issues/9731)) ([364821d](https://github.com/vuejs/core/commit/364821d6bdb1775e2f55a69bcfb9f40f7acf1506)), closes [#9727](https://github.com/vuejs/core/issues/9727)
* **shared:** handle more Symbol cases in toDisplayString ([983d45d](https://github.com/vuejs/core/commit/983d45d4f8eb766b5a16b7ea93b86d3c51618fa6))
* **Suspense:** properly get anchor when mount fallback vnode ([#9770](https://github.com/vuejs/core/issues/9770)) ([b700328](https://github.com/vuejs/core/commit/b700328342e17dc16b19316c2e134a26107139d2)), closes [#9769](https://github.com/vuejs/core/issues/9769)
* **types:** ref() return type should not be any when initial value is any ([#9768](https://github.com/vuejs/core/issues/9768)) ([cdac121](https://github.com/vuejs/core/commit/cdac12161ec27b45ded48854c3d749664b6d4a6d))
* **watch:** should not fire pre watcher on child component unmount ([#7181](https://github.com/vuejs/core/issues/7181)) ([6784f0b](https://github.com/vuejs/core/commit/6784f0b1f8501746ea70d87d18ed63a62cf6b76d)), closes [#7030](https://github.com/vuejs/core/issues/7030)



# [3.4.0-alpha.4](https://github.com/vuejs/core/compare/v3.3.10...v3.4.0-alpha.4) (2023-12-04)


### Bug Fixes

* **compiler-core:** fix referencing typo ([#9708](https://github.com/vuejs/core/issues/9708)) ([3071de4](https://github.com/vuejs/core/commit/3071de44bc4bf669ab6b48fd8db8d728c30fdb0c))
* **parser:** fix interpolation parsing in v-pre ([53aaa1e](https://github.com/vuejs/core/commit/53aaa1eb2876baf9de16b2f2c77b2c5fd5173900))
* **parser:** properly set initial inXML state based on root ns ([47ea285](https://github.com/vuejs/core/commit/47ea285be3dcb66a83a593346995b5900d6c5478))
* **parser:** should reset inRCDATA state ([ef97e8b](https://github.com/vuejs/core/commit/ef97e8b07d8350106c940f23679444b698832067))


### Features

* **compiler-core:** support accessing Error as global in template expressions ([#7018](https://github.com/vuejs/core/issues/7018)) ([bcca475](https://github.com/vuejs/core/commit/bcca475dbc58d76434cd8120b94929758cee2825))
* **compiler-sfc:** analyze import usage in template via AST ([#9729](https://github.com/vuejs/core/issues/9729)) ([e8bbc94](https://github.com/vuejs/core/commit/e8bbc946cba6bf74c9da56f938b67d2a04c340ba)), closes [#8897](https://github.com/vuejs/core/issues/8897) [nuxt/nuxt#22416](https://github.com/nuxt/nuxt/issues/22416)
* **compiler-sfc:** bump postcss-modules to v6 ([2a507e3](https://github.com/vuejs/core/commit/2a507e32f0e2ef73813705a568b8633f68bda7a9))
* **compiler:** lift vnode hooks deprecation warning to error ([8abc754](https://github.com/vuejs/core/commit/8abc754d5d86d9dfd5a7927b846f1a743f352364))
* use enum to replace const enum ([#9261](https://github.com/vuejs/core/issues/9261)) ([fff7b86](https://github.com/vuejs/core/commit/fff7b864f4292d0430ba2bda7098ad43876b0210)), closes [#1228](https://github.com/vuejs/core/issues/1228)



## [3.3.10](https://github.com/vuejs/core/compare/v3.3.9...v3.3.10) (2023-12-04)


### Bug Fixes

* **app:** prevent template from being cached between apps with different options ([#9724](https://github.com/vuejs/core/issues/9724)) ([ec71585](https://github.com/vuejs/core/commit/ec715854ca12520b2afc9e9b3981cbae05ae5206)), closes [#9618](https://github.com/vuejs/core/issues/9618)
* **compiler-sfc:** avoid passing forEach index to genMap ([f12db7f](https://github.com/vuejs/core/commit/f12db7fb564a534cef2e5805cc9f54afe5d72fbf))
* **compiler-sfc:** deindent pug/jade templates ([6345197](https://github.com/vuejs/core/commit/634519720a21fb5a6871454e1cadad7053a568b8)), closes [#3231](https://github.com/vuejs/core/issues/3231) [#3842](https://github.com/vuejs/core/issues/3842) [#7723](https://github.com/vuejs/core/issues/7723)
* **compiler-sfc:** fix :where and :is selector in scoped mode with multiple selectors ([#9735](https://github.com/vuejs/core/issues/9735)) ([c3e2c55](https://github.com/vuejs/core/commit/c3e2c556b532656b50b8ab5cd2d9eabc26622d63)), closes [#9707](https://github.com/vuejs/core/issues/9707)
* **compiler-sfc:** generate more treeshaking friendly code ([#9507](https://github.com/vuejs/core/issues/9507)) ([8d74ca0](https://github.com/vuejs/core/commit/8d74ca0e6fa2738ca6854b7e879ff59419f948c7)), closes [#9500](https://github.com/vuejs/core/issues/9500)
* **compiler-sfc:** support inferring generic types ([#8511](https://github.com/vuejs/core/issues/8511)) ([eb5e307](https://github.com/vuejs/core/commit/eb5e307c0be62002e62c4c800d0dfacb39b0d4ca)), closes [#8482](https://github.com/vuejs/core/issues/8482)
* **compiler-sfc:** support resolving components from props ([#8785](https://github.com/vuejs/core/issues/8785)) ([7cbcee3](https://github.com/vuejs/core/commit/7cbcee3d831241a8bd3588ae92d3f27e3641e25f))
* **compiler-sfc:** throw error when failing to load TS during type resolution ([#8883](https://github.com/vuejs/core/issues/8883)) ([4936d2e](https://github.com/vuejs/core/commit/4936d2e11a8d0ca3704bfe408548cb26bb3fd5e9))
* **cssVars:** cssVar names should be double-escaped when generating code for ssr ([#8824](https://github.com/vuejs/core/issues/8824)) ([5199a12](https://github.com/vuejs/core/commit/5199a12f8855cd06f24bf355708b5a2134f63176)), closes [#7823](https://github.com/vuejs/core/issues/7823)
* **deps:** update compiler to ^7.23.4 ([#9681](https://github.com/vuejs/core/issues/9681)) ([31f6ebc](https://github.com/vuejs/core/commit/31f6ebc4df84490ed29fb75e7bf4259200eb51f0))
* **runtime-core:** Suspense get anchor properly in Transition ([#9309](https://github.com/vuejs/core/issues/9309)) ([65f3fe2](https://github.com/vuejs/core/commit/65f3fe273127a8b68e1222fbb306d28d85f01757)), closes [#8105](https://github.com/vuejs/core/issues/8105)
* **runtime-dom:** set width/height with units as attribute ([#8781](https://github.com/vuejs/core/issues/8781)) ([bfc1838](https://github.com/vuejs/core/commit/bfc1838f31199de3f189198a3c234fa7bae91386))
* **ssr:** avoid computed being accidentally cached before server render ([#9688](https://github.com/vuejs/core/issues/9688)) ([30d5d93](https://github.com/vuejs/core/commit/30d5d93a92b2154406ec04f8aca6b217fa01177c)), closes [#5300](https://github.com/vuejs/core/issues/5300)
* **types:** expose emits as props in functional components ([#9234](https://github.com/vuejs/core/issues/9234)) ([887e54c](https://github.com/vuejs/core/commit/887e54c347ea9eac4c721b5e2288f054873d1d30))
* **types:** fix reactive collection types ([#8960](https://github.com/vuejs/core/issues/8960)) ([ad27473](https://github.com/vuejs/core/commit/ad274737015c36906d76f3189203093fa3a2e4e7)), closes [#8904](https://github.com/vuejs/core/issues/8904)
* **types:** improve return type withKeys and withModifiers ([#9734](https://github.com/vuejs/core/issues/9734)) ([43c3cfd](https://github.com/vuejs/core/commit/43c3cfdec5ae5d70fa2a21e857abc2d73f1a0d07))


### Performance Improvements

* optimize on* prop check ([38aaa8c](https://github.com/vuejs/core/commit/38aaa8c88648c54fe2616ad9c0961288092fcb44))
* **runtime-dom:** cache modifier wrapper functions ([da4a4fb](https://github.com/vuejs/core/commit/da4a4fb5e8eee3c6d31f24ebd79a9d0feca56cb2)), closes [#8882](https://github.com/vuejs/core/issues/8882)
* **v-on:** constant handlers with modifiers should not be treated as dynamic ([4d94ebf](https://github.com/vuejs/core/commit/4d94ebfe75174b340d2b794e699cad1add3600a9))



# [3.4.0-alpha.3](https://github.com/vuejs/core/compare/v3.4.0-alpha.2...v3.4.0-alpha.3) (2023-11-28)


### Bug Fixes

* **deps:** update compiler to ^7.23.4 ([#9681](https://github.com/vuejs/core/issues/9681)) ([31f6ebc](https://github.com/vuejs/core/commit/31f6ebc4df84490ed29fb75e7bf4259200eb51f0))
* **parser:** directive arg should be undefined on shorthands with no arg ([e49dffc](https://github.com/vuejs/core/commit/e49dffc9ece86bddf094b9ad4ad15eb4856d6277))


### Features

* **dx:** link errors to docs in prod build ([#9165](https://github.com/vuejs/core/issues/9165)) ([9f8ba98](https://github.com/vuejs/core/commit/9f8ba9821fe166f77e63fa940e9e7e13ec3344fa))



# [3.4.0-alpha.2](https://github.com/vuejs/core/compare/v3.3.9...v3.4.0-alpha.2) (2023-11-27)


### Bug Fixes

* avoid confusing breakage in @vitejs/plugin-vue ([ceec69c](https://github.com/vuejs/core/commit/ceec69c8ccb96c433a4a506ad2e85e276998bade))
* **compiler-core:** fix line/column tracking when fast forwarding ([2e65ea4](https://github.com/vuejs/core/commit/2e65ea481f74db8649df8110a031cbdc98f98c84))
* **compiler-sfc:** fix ast reuse for ssr ([fb619cf](https://github.com/vuejs/core/commit/fb619cf9a440239f0ba88e327d10001a6a3c8171))
* **compiler-sfc:** support `:is` and `:where` selector in scoped css rewrite ([#8929](https://github.com/vuejs/core/issues/8929)) ([c6083dc](https://github.com/vuejs/core/commit/c6083dcad31f3e9292c687fada9e32f287e2317f))
* **compiler-sfc:** use correct compiler when re-parsing in ssr mode ([678378a](https://github.com/vuejs/core/commit/678378afd559481badb486b243722b6287862e09))


* feat!: remove reactivity transform (#9321) ([79b8a09](https://github.com/vuejs/core/commit/79b8a0905bf363bf82edd2096fef10c3db6d9c3c)), closes [#9321](https://github.com/vuejs/core/issues/9321)


### Features

* **compiler-core:** support specifying root namespace when parsing ([40f72d5](https://github.com/vuejs/core/commit/40f72d5e50b389cb11b7ca13461aa2a75ddacdb4))
* **compiler-core:** support v-bind shorthand for key and value with the same name ([#9451](https://github.com/vuejs/core/issues/9451)) ([26399aa](https://github.com/vuejs/core/commit/26399aa6fac1596b294ffeba06bb498d86f5508c))
* **compiler:** improve parsing tolerance for language-tools ([41ff68e](https://github.com/vuejs/core/commit/41ff68ea579d933333392146625560359acb728a))
* **reactivity:** expose last result for computed getter ([#9497](https://github.com/vuejs/core/issues/9497)) ([48b47a1](https://github.com/vuejs/core/commit/48b47a1ab63577e2dbd91947eea544e3ef185b85))


### Performance Improvements

* avoid sfc source map unnecessary serialization and parsing ([f15d2f6](https://github.com/vuejs/core/commit/f15d2f6cf69c0c39f8dfb5c33122790c68bf92e2))
* **codegen:** optimize line / column calculation during codegen ([3be53d9](https://github.com/vuejs/core/commit/3be53d9b974dae1a10eb795cade71ae765e17574))
* **codegen:** optimize source map generation ([c11002f](https://github.com/vuejs/core/commit/c11002f16afd243a2b15b546816e73882eea9e4d))
* **compiler-sfc:** remove magic-string trim on script ([e8e3ec6](https://github.com/vuejs/core/commit/e8e3ec6ca7392e43975c75b56eaaa711d5ea9410))
* **compiler-sfc:** use faster source map addMapping ([50cde7c](https://github.com/vuejs/core/commit/50cde7cfbcc49022ba88f5f69fa9b930b483c282))
* optimize away isBuiltInType ([66c0ed0](https://github.com/vuejs/core/commit/66c0ed0a3c1c6f37dafc6b1c52b75c6bf60e3136))
* optimize makeMap ([ae6fba9](https://github.com/vuejs/core/commit/ae6fba94954bac6430902f77b0d1113a98a75b18))
* optimize position cloning ([2073236](https://github.com/vuejs/core/commit/20732366b9b3530d33b842cf1fc985919afb9317))


### BREAKING CHANGES

* Reactivity Transform was marked deprecated in 3.3 and is now removed in 3.4. This change does not require a major due to the feature being experimental. Users who wish to continue using the feature can do so via the external plugin at https://vue-macros.dev/features/reactivity-transform.html



## [3.3.9](https://github.com/vuejs/core/compare/v3.3.8...v3.3.9) (2023-11-25)


### Bug Fixes

* **compiler-core:** avoid rewriting scope variables in inline for loops ([#7245](https://github.com/vuejs/core/issues/7245)) ([a2d810e](https://github.com/vuejs/core/commit/a2d810eb40cef631f61991ca68b426ee9546aba0)), closes [#7238](https://github.com/vuejs/core/issues/7238)
* **compiler-core:** fix `resolveParserPlugins` decorators check ([#9566](https://github.com/vuejs/core/issues/9566)) ([9d0eba9](https://github.com/vuejs/core/commit/9d0eba916f3bf6fb5c03222400edae1a2db7444f)), closes [#9560](https://github.com/vuejs/core/issues/9560)
* **compiler-sfc:** consistently escape type-only prop names ([#8654](https://github.com/vuejs/core/issues/8654)) ([3e08d24](https://github.com/vuejs/core/commit/3e08d246dfd8523c54fb8e7a4a6fd5506ffb1bcc)), closes [#8635](https://github.com/vuejs/core/issues/8635) [#8910](https://github.com/vuejs/core/issues/8910) [vitejs/vite-plugin-vue#184](https://github.com/vitejs/vite-plugin-vue/issues/184)
* **compiler-sfc:** malformed filename on windows using path.posix.join() ([#9478](https://github.com/vuejs/core/issues/9478)) ([f18a174](https://github.com/vuejs/core/commit/f18a174979626b3429db93c5d5b7ae5448917c70)), closes [#8671](https://github.com/vuejs/core/issues/8671) [#9583](https://github.com/vuejs/core/issues/9583) [#9446](https://github.com/vuejs/core/issues/9446) [#9473](https://github.com/vuejs/core/issues/9473)
* **compiler-sfc:** support `:is` and `:where` selector in scoped css rewrite ([#8929](https://github.com/vuejs/core/issues/8929)) ([3227e50](https://github.com/vuejs/core/commit/3227e50b32105f8893f7dff2f29278c5b3a9f621))
* **compiler-sfc:** support resolve extends interface for defineEmits ([#8470](https://github.com/vuejs/core/issues/8470)) ([9e1b74b](https://github.com/vuejs/core/commit/9e1b74bcd5fa4151f5d1bc02c69fbbfa4762f577)), closes [#8465](https://github.com/vuejs/core/issues/8465)
* **hmr/transition:** fix kept-alive component inside transition disappearing after hmr ([#7126](https://github.com/vuejs/core/issues/7126)) ([d11e978](https://github.com/vuejs/core/commit/d11e978fc98dcc83526c167e603b8308f317f786)), closes [#7121](https://github.com/vuejs/core/issues/7121)
* **hydration:** force hydration for v-bind with .prop modifier ([364f319](https://github.com/vuejs/core/commit/364f319d214226770d97c98d8fcada80c9e8dde3)), closes [#7490](https://github.com/vuejs/core/issues/7490)
* **hydration:** properly hydrate indeterminate prop ([34b5a5d](https://github.com/vuejs/core/commit/34b5a5da4ae9c9faccac237acd7acc8e7e017571)), closes [#7476](https://github.com/vuejs/core/issues/7476)
* **reactivity:** clear method on readonly collections should return undefined ([#7316](https://github.com/vuejs/core/issues/7316)) ([657476d](https://github.com/vuejs/core/commit/657476dcdb964be4fbb1277c215c073f3275728e))
* **reactivity:** onCleanup also needs to be cleaned ([#8655](https://github.com/vuejs/core/issues/8655)) ([73fd810](https://github.com/vuejs/core/commit/73fd810eebdd383a2b4629f67736c4db1f428abd)), closes [#5151](https://github.com/vuejs/core/issues/5151) [#7695](https://github.com/vuejs/core/issues/7695)
* **ssr:** hydration `__vnode` missing for devtools ([#9328](https://github.com/vuejs/core/issues/9328)) ([5156ac5](https://github.com/vuejs/core/commit/5156ac5b38cfa80d3db26f2c9bf40cb22a7521cb))
* **types:** allow falsy value types in `StyleValue` ([#7954](https://github.com/vuejs/core/issues/7954)) ([17aa92b](https://github.com/vuejs/core/commit/17aa92b79b31d8bb8b5873ddc599420cb9806db8)), closes [#7955](https://github.com/vuejs/core/issues/7955)
* **types:** defineCustomElement using defineComponent return type with emits ([#7937](https://github.com/vuejs/core/issues/7937)) ([5d932a8](https://github.com/vuejs/core/commit/5d932a8e6d14343c9d7fc7c2ecb58ac618b2f938)), closes [#7782](https://github.com/vuejs/core/issues/7782)
* **types:** fix `unref` and `toValue` when input union type contains ComputedRef ([#8748](https://github.com/vuejs/core/issues/8748)) ([176d476](https://github.com/vuejs/core/commit/176d47671271b1abc21b1508e9a493c7efca6451)), closes [#8747](https://github.com/vuejs/core/issues/8747) [#8857](https://github.com/vuejs/core/issues/8857)
* **types:** fix instance type when props type is incompatible with setup returned type ([#7338](https://github.com/vuejs/core/issues/7338)) ([0e1e8f9](https://github.com/vuejs/core/commit/0e1e8f919e5a74cdaadf9c80ee135088b25e7fa3)), closes [#5885](https://github.com/vuejs/core/issues/5885)
* **types:** fix shallowRef return type with union value type ([#7853](https://github.com/vuejs/core/issues/7853)) ([7c44800](https://github.com/vuejs/core/commit/7c448000b0def910c2cfabfdf7ff20a3d6bc844f)), closes [#7852](https://github.com/vuejs/core/issues/7852)
* **types:** more precise types for class bindings ([#8012](https://github.com/vuejs/core/issues/8012)) ([46e3374](https://github.com/vuejs/core/commit/46e33744c890bd49482c5e5c5cdea44e00ec84d5))
* **types:** remove optional properties from defineProps return type ([#6421](https://github.com/vuejs/core/issues/6421)) ([94c049d](https://github.com/vuejs/core/commit/94c049d930d922069e38ea8700d7ff0970f71e61)), closes [#6420](https://github.com/vuejs/core/issues/6420)
* **types:** return type of withDefaults should be readonly ([#8601](https://github.com/vuejs/core/issues/8601)) ([f15debc](https://github.com/vuejs/core/commit/f15debc01acb22d23f5acee97e6f02db88cef11a))
* **types:** revert class type restrictions ([5d077c8](https://github.com/vuejs/core/commit/5d077c8754cc14f85d2d6d386df70cf8c0d93842)), closes [#8012](https://github.com/vuejs/core/issues/8012)
* **types:** update jsx type definitions ([#8607](https://github.com/vuejs/core/issues/8607)) ([58e2a94](https://github.com/vuejs/core/commit/58e2a94871ae06a909c5f8bad07fb401193e6a38))
* **types:** widen ClassValue type ([2424013](https://github.com/vuejs/core/commit/242401305944422d0c361b16101a4d18908927af))
* **v-model:** avoid overwriting number input with same value ([#7004](https://github.com/vuejs/core/issues/7004)) ([40f4b77](https://github.com/vuejs/core/commit/40f4b77bb570868cb6e47791078767797e465989)), closes [#7003](https://github.com/vuejs/core/issues/7003)
* **v-model:** unnecessary value binding error should apply to dynamic instead of static binding ([2859b65](https://github.com/vuejs/core/commit/2859b653c9a22460e60233cac10fe139e359b046)), closes [#3596](https://github.com/vuejs/core/issues/3596)



## [3.3.8](https://github.com/vuejs/core/compare/v3.3.7...v3.3.8) (2023-11-06)


### Bug Fixes

* **compile-sfc:** support `Error` type in `defineProps` ([#5955](https://github.com/vuejs/core/issues/5955)) ([a989345](https://github.com/vuejs/core/commit/a9893458ec519aae442e1b99e64e6d74685cd22c))
* **compiler-core:** known global should be shadowed by local variables in expression rewrite ([#9492](https://github.com/vuejs/core/issues/9492)) ([a75d1c5](https://github.com/vuejs/core/commit/a75d1c5c6242e91a73cc5ba01e6da620dea0b3d9)), closes [#9482](https://github.com/vuejs/core/issues/9482)
* **compiler-sfc:** fix dynamic directive arguments usage check for slots ([#9495](https://github.com/vuejs/core/issues/9495)) ([b39fa1f](https://github.com/vuejs/core/commit/b39fa1f8157647859331ce439c42ae016a49b415)), closes [#9493](https://github.com/vuejs/core/issues/9493)
* **deps:** update dependency @vue/repl to ^2.6.2 ([#9536](https://github.com/vuejs/core/issues/9536)) ([5cef325](https://github.com/vuejs/core/commit/5cef325f41e3b38657c72fa1a38dedeee1c7a60a))
* **deps:** update dependency @vue/repl to ^2.6.3 ([#9540](https://github.com/vuejs/core/issues/9540)) ([176d590](https://github.com/vuejs/core/commit/176d59058c9aecffe9da4d4311e98496684f06d4))
* **hydration:** fix tagName access error on comment/text node hydration mismatch ([dd8a0cf](https://github.com/vuejs/core/commit/dd8a0cf5dcde13d2cbd899262a0e07f16e14e489)), closes [#9531](https://github.com/vuejs/core/issues/9531)
* **types:** avoid exposing lru-cache types in generated dts ([462aeb3](https://github.com/vuejs/core/commit/462aeb3b600765e219ded2ee9a0ed1e74df61de0)), closes [#9521](https://github.com/vuejs/core/issues/9521)
* **warn:** avoid warning on empty children with Suspense ([#3962](https://github.com/vuejs/core/issues/3962)) ([405f345](https://github.com/vuejs/core/commit/405f34587a63a5f1e3d147b9848219ea98acc22d))



# [3.4.0-alpha.1](https://github.com/vuejs/core/compare/v3.3.7...v3.4.0-alpha.1) (2023-10-28)


### Features

* **compiler-core:** export error message ([#8729](https://github.com/vuejs/core/issues/8729)) ([f7e80ee](https://github.com/vuejs/core/commit/f7e80ee4a065a9eaba98720abf415d9e87756cbd))
* **compiler-sfc:** expose resolve type-based props and emits ([#8874](https://github.com/vuejs/core/issues/8874)) ([9e77580](https://github.com/vuejs/core/commit/9e77580c0c2f0d977bd0031a1d43cc334769d433))
* export runtime error strings ([#9301](https://github.com/vuejs/core/issues/9301)) ([feb2f2e](https://github.com/vuejs/core/commit/feb2f2edce2d91218a5e9a52c81e322e4033296b))
* **reactivity:** more efficient reactivity system ([#5912](https://github.com/vuejs/core/issues/5912)) ([16e06ca](https://github.com/vuejs/core/commit/16e06ca08f5a1e2af3fc7fb35de153dbe0c3087d)), closes [#311](https://github.com/vuejs/core/issues/311) [#1811](https://github.com/vuejs/core/issues/1811) [#6018](https://github.com/vuejs/core/issues/6018) [#7160](https://github.com/vuejs/core/issues/7160) [#8714](https://github.com/vuejs/core/issues/8714) [#9149](https://github.com/vuejs/core/issues/9149) [#9419](https://github.com/vuejs/core/issues/9419) [#9464](https://github.com/vuejs/core/issues/9464)
* **runtime-core:** add `once` option to watch ([#9034](https://github.com/vuejs/core/issues/9034)) ([a645e7a](https://github.com/vuejs/core/commit/a645e7aa51006516ba668b3a4365d296eb92ee7d))


## Previous Changelogs

### 3.3.x (2023-02-05 - 2023-12-29)

See [3.3 changelog](./changelogs/CHANGELOG-3.3.md)

### 3.2.x (2021-07-16 - 2023-02-02)

See [3.2 changelog](./changelogs/CHANGELOG-3.2.md)

### 3.1.x (2021-05-08 - 2021-07-16)

See [3.1 changelog](./changelogs/CHANGELOG-3.1.md)

### 3.0.x (2019-12-20 - 2021-04-01)

See [3.0 changelog](./changelogs/CHANGELOG-3.0.md)
