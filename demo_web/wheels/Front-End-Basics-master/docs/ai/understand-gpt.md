# 了解 GPT

## 前置知识

### NLP（Natural Language Processing）

NLP 全称自然语言处理技术，它是一种人工智能技术，旨在解决计算机与人类语言之间的交互问题。

NLP 技术的目标是让计算机能够理解、分析、处理、生成和对话自然语言。

#### NLP 的难点

让机器理解人类语言的难点在于：

- 同一个意思可以有多种不同的表达形式，可以用一个词，也可以用一段描述
- 同一个表达在不同语境中又有不同含义

### 深度学习

深度学习是一种机器学习算法，其基于人工神经网络和深度神经网络的思想，可以有效地解决图像和语音识别、自然语言处理、机器翻译和预测等任务。

### GPT（Generative Pre-trained Transformer）

GPT 全称：生成式预训练 Transformer

#### Generative（生成式）

GPT 是一种单向的语言模型，也叫自回归模型，即通过前面的文本预测后面的词，训练时以预测能力为主，只根据前文的信息生成后文。

延伸：还有一种语言模型代表 Bert，是双向语言模型，进行文本预测时会结合前文后文信息，以“完形填空”的方式进行文本预测。

#### Pre-trained（预训练）

预训练让模型学习到一些通用的特征和知识

#### Transformer

Transformer 是一种基于编码器和解码器结构的神经网络模型。

最初由 Google 在 2017 年提出，用于自然语言处理（NLP）领域。Transformer 是一种基于自注意力机制（self-attention mechanism）的模型，可以在输入序列中进行全局信息的交互和计算，从而获得比传统循环神经网络更好的长距离依赖建模能力。

## GPT 发展

- GPT1：2018 年发布，1.17 亿参数，5GB 训练数据
  - 架构：采用了 Transfomer 架构中 decoder 部分，无监督学习以及有监督训练，下游可针对不同任务进行微调
- GPT2：2019 年发布，15 亿参数，40GB 训练数据，
- 架构：用了 Transfomer 架构中 decoder 部分，强化无监督学习能力，提出了 FewShot 少样本学习思想，希望模型自己能够理解输入的任务并执行
- GPT3：2020 年发布，沿用 GPT 2 的架构，区别在于超大规模训练量（钞能力），1750 亿参数，45TB 训练数据
- GPT3.5（ChatGPT）：基于 GPT3 同样的参数和训练数据，引入更多的对话，代码训练数据，引入强化学习机制和奖励模型机制，使得模型有能力根据人类的提示生成符合人类偏好的文本

### 零样本，单样本，少样本学习

传统语言模型中，通常的做法是在一个预训练模型通过微调来适应不同的下游任务。在 GPT 中提出了「少样本学习（Few-Shot）」概念。

少样本学习的工作方式是给出 K 个上下文和完成结果的示例，然后给出一个上下文的最终示例，模型需要提供完成结果。单样本只给出一个示例，模型即可以完成任务。而零样本则是不需要给出示例，直接让语言模型执行相应任务。

零样本，单样本，少样本之间区别，区别在于给出示例的多少。零样本是不给出示例直接让模型执行任务

## 底层原理

ChatGPT 可以类比为学说话的鹦鹉，它没有意识、没有欲望、没有情绪，甚至都不理解自己说了什么。

它的实质功能（原理）是“单字接龙”。给他任意长度的**上文**，它会用自己的**模型**生成下一个字。然后再用这个字跟之前的上文组成**新的上文**，再生成下一个字，不断重复，就可以生成任意长的下文了，这种方式称为自回归生成。这就是 ChatGPT 回答问题的方式。

从上面的描述可以看出，ChatGPT 的核心是**上文**和**模型**，模型的核心是**参数**。模型的参数是通过**训练**得到的，训练的核心是**数据**。

通俗解释：ChatGPT 从根本上始终要做的是，针对它得到的任何文本产生“合理的延续”。这里所说的“合理”是指，“人们在看到诸如数十亿个网页上的内容后，可能期待别人会这样写”。

### GPT 的训练过程概述

- 收集数据：收集大量的文本数据（GPT3 是 45TB），例如维基百科、小说、新闻文章等。
- 分词和编码：对文本数据进行分词和编码，将其转换成数字形式，以便于计算机进行处理。
- 预训练：使用 Transfomer 架构中 decoder 部分对分词后的数据进行预训练，预训练的目标是让 GPT 能够根据给定的上文预测出下一个单词。在这个过程中，GPT 能够**学习**到语言的结构和规律，从而提高其语言的理解和生成能力。
  - 训练的目的是学习，而不是记忆。是为了应对没有记忆过的内容（记忆过的内容可以理解为数据库已经存储过的内容）时使用学习到的通用规律生成合理的内容。这种举一反三的目的也叫做泛化。
- 微调：对预训练好的 GPT 进行微调，使其能够更好地适应特定任务。例如：在对话生成任务中，使用对话数据集对 GPT 进行微调，能使其更高的生成自然流畅的对话内容
- 验证和评估：使用验证集和评估指标来测试 GPT 的性能，如果性能不足，可以重新调整模型参数或者增加更多的训练数据，以提高模型性能。

GPT 的训练过程就是一个迭代的过程，需要不断地收集数据、预处理数据、预训练模型、微调模型、并对模型进行验证和评估，以不断提高模型性能。

通俗解释：ChatGPT（或者说它基于的 GPT-3 网络）到底是在做什么呢？它的总体目标是，根据所接受的训练（查看来自互联网的数十亿页文本，等等），以“合理”的方式续写文本。所以在任意给定时刻，它都有一定量的文本，而目标是为要添加的下一个标记做出适当的选择。

## 预测的实质

GPT 根据上文预测下一个词时会列出随后可能出现的词及其出现的“概率”（按“概率”从高到低排列），比如写一篇文章时，它实质上只是在一遍又一遍地询问“根据目前的文本，下一个词应该是什么”，并且每次都添加一个词。

每一步都会得到一个带概率的词列表。但它应该选择将哪一个词添加到正在写作的文章中呢？有人可能认为应该选择“排名最高”的词，即分配了最高“概率”的词。然而，这里出现了一点儿玄学的意味。如果我们总是选择排名最高的词，通常会得到一篇非常“平淡”的文章，完全显示不出任何“创造力”（有时甚至会一字不差地重复前文，为什么会这样暂时没有科学解释）。但是，如果有时（随机）选择排名较低的词，就会得到一篇“更有趣”的文章。

这里存在随机性意味着，如果我们多次使用相同的提示(prompt)，每次都有可能得到不同的文章。而且，符合玄学思想的是，有一个所谓的“温度”（Temperature）参数来确定低排名词的使用频率。

## chatGPT 的三步训练

### 第一步-预训练-无监督学习（开卷有益）

#### NLP 的难点

让机器理解人类语言的难点在于：

- 同一个意思可以有多种不同的表达形式，可以用一个词，也可以用一段描述
- 同一个表达在不同语境中又有不同含义

想解决这个问题，需要让机器学会各种“语义关系”和“语法规律”，以便能明白“哪些表达实际上是同一个意思”

对此，GPT 的办法是：让模型看到尽可能多、尽可能丰富的「语言范例（学习材料）」，使其有更多机会建构出能举一反三的语言规律，来应对无数「从未见过的语言」。这一阶段称为“开卷有益”。GPT 中的“G”代表“生成（Generative）”，“T”代表“Transformer”一种模型结构，而“P”（Pre-training）代表的就是“开卷有益”这一步，专业名称叫“预训练”，也成为无监督学习

#### 预训练产生的问题

“开卷有益”却存在一个问题：尽管 GPT 拥有了海量的知识，但回答形式和内容却不受约束。因为它知道的太多了，见到了一个人几辈子都读不完的资料，会随意联想，它有能力回答我们的问题，但我们却很难指挥它。

要如何解决这个问题，使 GPT 能够跟我们合理的对话？

### 第二步-有监督学习（模版规范）

用「对话模板」去矫正它在“开卷有益”时所学到的「不规范“习惯”」。具体做法是：不再用随便的互联网文本，而把人工专门写好的「优质对话范例」给「“开卷有益”后的 GPT-3」，让它再去做单字接龙，从而学习「如何组织符合人类规范的回答」。这一阶段称为“模板规范”。

例如：对没联网的 GPT，问最新新闻，要回答不知道；用户的提问有错误时，应该指出错误，而不是顺着瞎编；不回答有害内容，也就是什么该说什么不该说等。

#### 涌现的能力

- “理解”指令要求的能力：指「能按照用户的抽象描述，给出处理结果」，例如“翻译”这个指令，GPT 就已经掌握了。
- “理解”例子要求的能力：指「能按照用户给的若干具体例子，来处理新内容」，意味着，如果你以后不明白怎么给它描述指令，就可以「通过给它举几个例子，来让它明确你想干什么」。这项能力十分神奇，因为看起来 ChatGPT 仿佛掌握了「如何通过例子来学习」的能力，而这个能力又是我们通过模板范文（例子）让它学会的。产生了一种“它学会了如何学习”的套娃感。大家把这种现象称为“语境内学习（In-context Learning）”，目前对这种能力的产生原因还没有定论。

#### 分治效应

在超大模型的使用中，大家还发现了一种「分治效应」：当 ChatGPT 无法答对一个综合问题时，若要求它分步思考，它就可以一步步连续推理，且最终答对的可能性大幅提升，该能力也叫“思维链”。

ChatGPT 的思维链能力，可能是在训练做代码的单字接龙后所产生的。因为人类在面对复杂任务时，直接思考答案也会没头绪，用分而治之往往可以解决。因此大家猜测，ChatGPT 可能是通过对代码的单字接龙，学到了代码中所蕴含的「人类分治思想」。不过目前对该现象的产生原因也没有定论。

#### 规模效应

可以切实地感受到，单字接龙的结构虽然简单，但被扩展到超大规模后，所能展现出的能力有多出乎意料。

在小单字接龙模型中，并没有察觉出「“理解”指令」「“理解”例子」「思维链」的能力，但在超大模型中，却突然展现。因此人们也用“涌现”这个词来描述「这些能力的出现」。

### 第三步-强化学习（创意引导）

经过“开卷有益”和“模版规范”这两个训练阶段后，超大单字接龙模型已经变得极其强大了。但“模板规范”的训练阶段也存在不足，那就是：可能导致 ChatGPT 的回答过于模板化，限制其创造力。

强化学习不再要求它按照我们提供的对话范例做单字接龙，而是直接向它提问，再让它自由回答。如果回答得妙，就给予奖励，如果回答不佳，就降低奖励。然后利用这些「人类评分」去调整 ChatGPT 的模型。

在这种训练中，既不会用现有的模板来限制它的表现，又可以引导它创造出符合人类认可的回答。这一阶段称为“创意引导”。

总结一下，本章讲了 ChatGPT 的三个训练阶段：

- “开卷有益”阶段：让 ChatGPT 对「海量互联网文本」做单字接龙，以扩充模型的词汇量、语言知识、世界的信息与知识。使 ChatGPT 从“哑巴鹦鹉”变成“脑容量超级大的懂王鹦鹉”。

- “模板规范”阶段：让 ChatGPT 对「优质对话范例」做单字接龙，以规范回答的对话模式和对话内容。使 ChatGPT 变成“懂规矩的博学鹦鹉”。

- “创意引导”阶段：让 ChatGPT 根据「人类对它生成答案的好坏评分」来调节模型，以引导它生成人类认可的创意回答。使 ChatGPT 变成“既懂规矩又会试探的博学鹦鹉”。

## ChatGPT 的缺点

### 胡编混淆

为了能应对「未被记忆的情况」，它会学习语言单位（如单词、短语、句子等）之间的规律，用「学到的规律」来成回答，然而，这也意味着如果出现了「实际不同但碰巧符合同一个规律」的内容，模型就可能混淆它。

最直接的结果是：若「现实中不存在内容」刚好符合「它从训练材料中学到的规律」，那 ChatGPT 就有可能对「不存在内容」进行「合乎规律的混合捏造」。

### 无法直接增删改查

不论是 ChatGPT 「所记住的信息」，还是「所学到的规律」，都是以同一个模型的形式来表达的，因此我们无法像操作数据库那样，对这些内容直接进行增删改查。

这会导致两个具体问题：

第一：由于我们很难理解它所建构的规律，又无法直接查看它记住了什么、学到了什么，只能通过多次提问来评估和猜测它的所记所学，其决策缺乏可解释性，这难免会在使用时带来安全风险。

第二：由于只能通过再次调整模型（即再次训练）来增加、删除或修改它的所记所学，这难免在更新时会降低效率。

## ChatGPT的里程碑意义

从产品形态和技术创新上来看，ChatGPT 确实不够完善。

其核心模型结构最早来自于2017年的论文，而“创意引导”的方法则来源于2020年的论文，其他技术更是离不开所有AI 科研人员的长期积累。

但 ChatGPT 却是有里程碑意义的，它的意义并不在于产品和创新，而在于完成了一次验证，让全球看到了「大语言模型的可行性」。

面对太阳危机，人类有多种方案。在实施“流浪地球计划”之前，先进行了“试点火实验”以验证计划的可行性。成功之后，人类才统一方向，迅速在地球上建造了万座行星发动机。

ChatGPT 就相当于这样的“试点火实验”。它所展现的一些能力已经吸引全球大力开发和改进大语言模型。大语言模型将因此变得更好用、更快速、更便宜，相关产品也会如雨后春笋般普及。

所以真正对人类社会带来冲击的，不是 ChatGPT，而是它身后的万座“行星发动机”。这些“行星发动机”才是改变社会发展方向的推力。全球的大公司和股民坐不住了，也是因为担心自己拿不到进入“地下城的门票”。


## 未来影响

### 语言处理需求

语言的发明，允许人类将个体所获得的认识存储在体外，进而打通了整个物种的过去与未来，即使一些个体死亡，该个体的认识，也能依附语言被其他个体继承和发展下去。作为现代人的我们，并没有在生理上比前人更优越，拥有更强能力的原因，只是因为语言中积累的知识比过去更多了。

当人类步入文明社会后，尽管已不必在野外求生，但仍然需要群体协作地「创造知识」「继承知识」和「应用知识」，满足社会的需求，来维持自己的生计，而这三个环节全都是依靠语言来实现的。

可随着知识的爆炸式增长，语言处理的成本也相应地飙升。越大的机构，消耗在语言处理上的成本就越高。无论是医院、学校、法院、银行、出版社、研究所，都有繁重的信息分类、会议总结、格式排版、进程报告等工作。需要阅读和书写的内容数量和复杂度，不断超出人们的处理能力，这些成本早已成为了机构亟需解决的难题。


既然是语言模型，那它自然精通语言，可以校对拼写、检查语法、转换句式、翻译外语，对语言组织规则的遵守已经超越了绝大多数人。

精通语言只是大语言模型的一个方面，它真正有价值的地方在于：在精通语言的基础上，还能存储人类从古至今积累的「世界知识」。

现在大语言模型展现了人们未曾想过的“理解”能力，这使得我们极有希望真正实现“让机器‘理解’自然语言”这一目标。

>不过需要说明的是，「人类的理解」和「语言模型的“理解”」并不相同。
>
>语言模型的“理解”是指：能够「明确」接收到了「哪些语言符号」，并能处理「不同语言符号之间的关系」，但却不能将「语言符号」和「指代对象」进行关联，没有与现实对应。
>
>人类的理解则比「语言模型的“理解”」多了一个环节，能够将「语言符号」和「指代对象」关联起来，与现实对应起来。

不过，语言模型不理解符号的指代，其实不影响我们使用它，毕竟我们是把它当成工具，又不是把它作为独立改造世界的个体。因此只需要得到语言模型的回答，然后由人类来解读和实践即可。合理地使用大语言模型，就可以让一个普通人，快捷准确地触及各行各业的平均知识。

我们可以将语言模型看作是一本能直接回答的魔法百科全书，需要由人来实践才有作用；也可以将语言模型类比为《天龙八部》中的王语嫣，精通武学却不会武功，需要与会武功的人配合才能发挥其才能。

### 社会影响

由于大语言模型所能改善的是：群体协作过程中「创造、继承、应用知识」时的「语言处理效率」。所以随着技术的发展，大语言模型对社会的影响范围将和当初「电脑的影响范围」一样，即「全社会」。

大语言模型相结合的场景：

* 跟「搜索引擎」结合：帮助用户精准寻找和筛选信息，比如，微软的 new bing。

* 跟「笔记工具」结合，辅助阅读和写作，比如，notion，Flow us，wolai。

* 跟「办公软件」结合，辅助文字处理、数据分析和演示制作，比如，office的下一步动作。

* 跟「教育培训」结合，定制个人的学习计划和学习材料，全天家教。

* 跟「开发工具」结合，辅助编写业务代码、调试纠错。

* 跟「动画小说」结合，辅助小说配图、配乐。

* 跟「客服系统」结合，7x24小时随便问，没有任何情绪。

* 跟「视频会议」结合，多语翻译、会议记录与总结、谈话查找。

* 跟「评论审核」结合，筛选评论、统计舆论、给出提醒。

* 跟「行业顾问」结合，提供法律、医疗、健身等指导。

* 跟「社交媒体」结合，帮助找到兴趣相投的用户和话题 。

* 跟「视频娱乐」结合，个性化推荐音乐、电影、小说、动漫。

* 跟「游戏剧情」结合，让 NPC 给玩家带来更灵活的对话体验。

稍微留意一下就会发现ChatGPT 的报道主要分布于新闻界、学术界、教育界、商业界和内容生产行业。商业界有动作很好理解，毕竟商人对市场的感知敏锐。前三个领域动作频繁正是因为它们与「语言中的知识」密切相关。学术界专注于「创造知识」，教育界专注于「传承知识」，而新闻界专注于「传播信息」，因此受到的影响最大。

大型语言模型对教育界的影响更加强烈，主要不是因为学生可以用它来写作业，而是因为它对我们现有的「人才培养模式」提出了新的挑战。真正令人担心的是，按照现有模式培养出来的学生，在未来 5-10 年后，还能不能找到好工作？适应未来的就业市场？

* 大语言模型对社会的未来影响，相当于口语、文字、电脑、互联网对社会的影响

* 对教育界、学术界、新闻界、内容生产行业的影响颇深

* 它将方便人类对既有知识的继承，推进教育去培养高层次人才

* 也将带来网络安全和社会安全的新挑战

## 如何应对

人类的一大优势就在于「善于利用工具」：会先了解工具的优点和缺点，然后避开其缺点，将其优点用在适合的地方。

可工具无法取代人，只有会用工具的人取代不会工具的人。

任何新工具都可能引起取代，因为如果自己不用而别人使用，就会失去工具带来的竞争力，最终人们都不得不用。这种囚徒困境与 ChatGPT 无关，即使让 ChatGPT 从世上消失，取代现象也会随着其他新工具的出现而出现，也不会因为人的害怕和抵触而消退。

所以真正需要害怕的是我们「无法成为会用工具的人」，可并没有人阻止我们探索工具，能够阻止我们的只有我们自己的心态和学习能力。

因此，**应对的第一步就是要克服自己的抵触心态。**既然时代的车轮无法阻挡，那么抵触新工具只会让我们更晚接触新工具，更晚获得工具带来的优势。

**应对的第二步是做好终身学习的准备**，因为 ChatGPT 之后，还会有新工具。这一点看似简单，但对于习惯了应试教育的人而言，并不容易。

应试教育是一种「高度特化的教育」。由于最终的考核指标是分数，因此不论教育系统的设计目标是什么，最终「学生的行为」都难免会被特化为仅服务于分数，凡是不能提高分数的行为都不被视为“学习”，即使是可以提高创造力的行为。

这样长期规训的结果是，很多学生对“学习”一词的理解变得片面和扭曲。每当提到“学习”这个词时，这些学生就会联想到那种反人性的规训。好不容易熬到毕业了，现在被告知还要再“学习”，他们情绪上当然会抵触。

好在这种学习抵触，很多人在工作一段时间后，就能克服。因为他们慢慢会意识到市场和工具的变化究竟有多快，在心态上也开始积极拥抱学习。



## 不同人、职业、角度对 GPT 的理解

- 数据产品经理：[大白话讲清楚 ChatGPT](https://mp.weixin.qq.com/s/tri0OINMaOxYeqSk8iFesg)
- 研发：[初探 chatgpt](https://mp.weixin.qq.com/s/nUgoxyLpYOdUzCzyjrs7xw)
- [详解｜程序员如何适应 AI 时代的新需求](https://mp.weixin.qq.com/s/_qKk7KDsAGbR-jfvwlZULQ)

## 使用案例

- [ChatGPT 如何成了学习的神兵利器](https://mp.weixin.qq.com/s/ECFxhRj-Dko097gukaSCTA)

## 国内使用 AI

- [在中国国内如何购买 ChatGPT Plus](https://www.digitalnomadlc.com/how-to-buy-chatgptplus/)

## 文章

- [ChatGPT 原理探索](https://juejin.cn/post/7218048201982787645)
- [大白话讲清楚 ChatGPT](https://mp.weixin.qq.com/s/tri0OINMaOxYeqSk8iFesg)
- [初探 chatgpt](https://mp.weixin.qq.com/s/nUgoxyLpYOdUzCzyjrs7xw)