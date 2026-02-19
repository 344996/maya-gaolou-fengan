/**
 * 红小藤助手交互逻辑
 */

// 菜单状态
let menuState = 'closed'; // closed | main | consult

// 切换主菜单
function toggleXiaotengMenu() {
    const mainMenu = document.getElementById('xiaoteng-menu');
    const answerSubmenu = document.getElementById('answer-submenu');
    
    if (menuState === 'closed') {
        mainMenu.classList.add('show');
        answerSubmenu.classList.remove('show');
        menuState = 'main';
    } else {
        mainMenu.classList.remove('show');
        answerSubmenu.classList.remove('show');
        menuState = 'closed';
    }
}

// 显示咨询服务子菜单
function showAnswerMenu() {
    const mainMenu = document.getElementById('xiaoteng-menu');
    const answerSubmenu = document.getElementById('answer-submenu');
    
    mainMenu.classList.remove('show');
    answerSubmenu.classList.add('show');
    menuState = 'consult';
}

// 返回主菜单
function backToMainMenu() {
    const mainMenu = document.getElementById('xiaoteng-menu');
    const answerSubmenu = document.getElementById('answer-submenu');
    
    answerSubmenu.classList.remove('show');
    mainMenu.classList.add('show');
    menuState = 'main';
}

// 打开社群互动
function openCommunityModal() {
    const modal = document.getElementById('community-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    toggleXiaotengMenu(); // 关闭菜单
}

// 关闭社群互动
function closeCommunityModal() {
    const modal = document.getElementById('community-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// 切换社群标签
function switchCommunityTab(tabName) {
    // 切换标签激活状态
    const tabs = document.querySelectorAll('.community-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // 切换内容显示
    const userWorks = document.getElementById('user-works');
    const historyWorks = document.getElementById('history-works');
    
    if (tabName === 'user-works') {
        userWorks.style.display = 'grid';
        historyWorks.style.display = 'none';
    } else {
        userWorks.style.display = 'none';
        historyWorks.style.display = 'grid';
    }
}

// 上传图片入口
function uploadCommunityImage() {
    document.getElementById('communityImageUpload').click();
}

// 上传视频入口
function uploadCommunityVideo() {
    document.getElementById('communityVideoUpload').click();
}

// 处理图片上传
function handleCommunityImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
        alert('请选择有效的图片文件');
        return;
    }
    
    // 模拟上传成功，增加积分
    const points = 2;
    
    // 调用积分奖励函数
    if (typeof triggerPointsReward === 'function') {
        triggerPointsReward(points, '社群互动-上传图片');
    }
    
    // 显示成功提示
    showUploadSuccessToast('图片', points);
    
    // 重置input
    event.target.value = '';
    
    // TODO: 实际项目中需要调用后端API上传图片
    // uploadToServer(file, 'image');
}

// 处理视频上传
function handleCommunityVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    if (!file.type.startsWith('video/')) {
        alert('请选择有效的视频文件');
        return;
    }
    
    // 模拟上传成功，增加积分
    const points = 6;
    
    // 调用积分奖励函数
    if (typeof triggerPointsReward === 'function') {
        triggerPointsReward(points, '社群互动-上传视频');
    }
    
    // 显示成功提示
    showUploadSuccessToast('视频', points);
    
    // 重置input
    event.target.value = '';
    
    // TODO: 实际项目中需要调用后端API上传视频
    // uploadToServer(file, 'video');
}

// 显示上传成功提示
function showUploadSuccessToast(type, points) {
    const toast = document.createElement('div');
    toast.className = 'upload-success-toast';
    toast.innerHTML = `
        <div class="toast-icon">✅</div>
        <div class="toast-content">
            <div class="toast-title">上传成功！</div>
            <div class="toast-message">${type}已上传，获得 +${points} 积分</div>
        </div>
    `;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #5D7E3E, #4a6931);
        color: white;
        padding: 25px 35px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        z-index: 30001;
        animation: uploadToastIn 0.4s ease;
        min-width: 300px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes uploadToastIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes uploadToastOut {
            from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        .toast-icon {
            font-size: 36px;
        }
        .toast-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        .toast-message {
            font-size: 14px;
            opacity: 0.9;
        }
    `;
    
    if (!document.getElementById('upload-toast-style')) {
        style.id = 'upload-toast-style';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'uploadToastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 打开AI客服
function openAIChat() {
    const modal = document.getElementById('ai-chat-modal');
    modal.classList.add('show');
    toggleXiaotengMenu(); // 关闭菜单
}

// 关闭AI客服
function closeAIChat() {
    const modal = document.getElementById('ai-chat-modal');
    modal.classList.remove('show');
}

// 打开电话咨询
function openPhoneConsult() {
    const modal = document.getElementById('phone-modal');
    modal.classList.add('show');
    toggleXiaotengMenu(); // 关闭菜单
}

// 关闭电话咨询
function closePhoneModal() {
    const modal = document.getElementById('phone-modal');
    modal.classList.remove('show');
}

// AI客服发送消息
function sendAIMessage() {
    const input = document.getElementById('ai-chat-input');
    const chatBody = document.querySelector('.ai-chat-body');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `
        <div class="chat-bubble">${message}</div>
        <div class="chat-avatar">👤</div>
    `;
    chatBody.appendChild(userMsg);
    
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // 智能问答知识库
    const aiQAPairs = [
        // 项目概况类
        { q: /项目.*做什么|平台.*是什么|高楼粉干.*平台/, a: '高楼粉干数字平台是一个集产品溯源、文化展示、互动教学、积分激励于一体的品牌推广H5平台，用户通过扫描产品二维码进入，最终引导复购。' },
        { q: /主要入口|怎么进入|如何访问|二维码.*入口/, a: '主要入口是微信扫描产品包装上的二维码，也支持通过公众号菜单、分享链接、抖音主页等方式直接访问。' },
        { q: /主要目标|核心目标|目的/, a: '提升品牌文化传播力，增强用户互动体验，通过积分激励和社群运营引导用户复购。' },
        // 模块功能类
        { q: /溯源.*功能|生产.*溯源|批次信息/, a: '用户扫码后可查看批次信息（如合作社、生产时间、质检报告等），并可通过“进入品牌主页”按钮跳转至主页面查看固定内容如企业介绍、工艺步骤。' },
        { q: /非遗.*展示|技艺.*展示|工艺步骤/, a: '采用左右分栏设计，左侧播放非遗技艺视频，右侧展示工艺步骤图文，支持滑动查看。' },
        { q: /红色故事.*内容|红色故事.*讲什么/, a: '讲述“行军袋里的粉干”历史故事，结合平阳山门送别、葛藤湖等背景，突出品牌“绛藤间”的文化底蕴。' },
        { q: /DIY.*怎么玩|烹饪.*怎么玩|教学视频/, a: '用户可通过右滑切换“经典”“营养”“金汤”三大类，上滑选择菜品，点击“确定”进入教学视频页，视频中插知识点，支持上传作品、评分、评论，积分同步至积分模块。' },
        { q: /直播.*互动|直播.*实现|录播/, a: '嵌入抖音、B站等平台的直播或录播视频，展示品牌在各平台的宣传热度，非直播时段展示精选剪辑。' },
        { q: /积分.*怎么.*得|积分.*规则|积分.*来源/, a: '积分来源包括知识问答（简单2分/题、中等4分/题、挑战6分/题）、五星评分（最高5分）、上传作品（图片2分、视频6分），积分可兑换礼品。' },
        { q: /复购.*入口|淘宝|购买|跳转/, a: '点击“前往淘宝购买”按钮，跳转至指定淘宝店铺链接（支持H5唤起淘宝协议）。' },
        { q: /知识问答.*怎么玩|答题.*怎么玩|题目.*来源/, a: '用户可选择简单、中等、困难三个难度，进入无限答题模式，答对积分实时累加，题目源于DIY视频内容。' },
        { q: /红小藤.*浮窗|浮窗.*是什么/, a: '是一个全局浮窗，点击后可选择“在线咨询”“电话咨询”或跳转至“社群互动”页面。' },
        { q: /社群互动.*功能|社群页面.*功能|上传.*作品/, a: '展示用户上传的粉干作品和红色历史作品，支持上传图片/视频得积分，与DIY烹饪模块评论区联动。' },
        // 技术实现类
        { q: /前端.*技术|H5.*开发|适配.*微信/, a: '采用H5页面开发，适配微信内置浏览器，需在iOS和Android微信中充分测试。' },
        { q: /后端.*支持|接口.*支持|mock.*数据/, a: '需支持二维码动态数据、积分系统、AI评价接口预留（初期可mock），并提供接口文档。' },
        { q: /二维码.*怎么用|二维码.*原理|扫码.*落地页/, a: '每批产品对应一个二维码，扫码后进入专属落地页，展示该批次的生产信息。' },
        { q: /AI评价.*怎么实现|AI.*评价|mock.*评价/, a: '初期仅做接口预留，返回mock数据（如“色泽评分”“建议改善”），不要求真实算法。' },
        { q: /积分数据.*存储|积分.*存储|积分.*累计/, a: '初期可用静态数据模拟，后期需对接后端接口实现累计与展示。' },
        { q: /直播流.*接入|直播.*iframe|直播.*推流|直播.*拉流/, a: '只需嵌入第三方直播链接或iframe，不涉及推流/拉流配置。' },
        { q: /用户.*登录|账号.*注册|登录系统/, a: '初期不包含第三方账号注册/登录系统，后续可根据需求增加。' },
        // 用户体验类
        { q: /页面.*跳转.*复杂|跳转.*逻辑|返回路径/, a: 'DIY烹饪模块层级较深，需确保每一步跳转和返回路径清晰，避免用户迷失。' },
        { q: /浮窗.*遮挡|红小藤.*遮挡|浮窗.*影响/, a: '浮窗固定在右下角，点击展开菜单，不会影响页面原有功能。' },
        { q: /上传.*作品.*操作|怎么上传|上传.*积分/, a: '点击“上传图片/视频”按钮，调用相机或相册，上传后弹出积分增加提示。' },
        { q: /视频播放.*功能|视频.*暂停|视频.*拖动|知识点.*提示/, a: '支持暂停、拖动，视频中可弹出知识点提示，或下方同步显示文案。' },
        { q: /积分兑换.*展示|礼品.*网格|兑换.*页面/, a: '礼品网格展示，含图片、积分数量、等值人民币，点击跳转兑换确认页（初期可UI示意）。' },
        // 验收与交付类
        // 其他常见问题
        { q: /后台管理|有后台|管理系统/, a: '初期不实现后台，礼品、题目、积分规则等可使用静态数据，文档中说明预留扩展点。' },
        { q: /代码.*注释|需要.*注释|注释.*清晰/, a: '是的，代码需注释清晰，便于后续维护和二次开发。' },
        { q: /支持.*分享|怎么.*分享|分享链接/, a: '支持通过分享链接直接访问平台，无需扫码。' },
        { q: /电话咨询|拨打400|拨号盘/, a: '点击“电话咨询”可弹出400号码并提供拨打按钮（移动端唤起拨号盘）。' },
        { q: /积分规则.*调整|积分.*调整|积分.*变更/, a: '初期固定，后期可通过后台扩展调整。' },
        { q: /题目.*来源|题库.*内容|题目.*哪里来/, a: '题目源于DIY烹饪视频中的常识及拓展知识，初期可固定题库。' },
        { q: /作品.*审核|审核.*作品|视频.*审核/, a: '优质视频需后台审核标注，初期可不实现。' },
        // 生产溯源模块深入
        { q: /批次码.*生成|批次码.*原理|批次码.*怎么来/, a: '批次码由后台系统根据生产批次自动生成，每个码对应唯一一批产品，扫码后展示该批次的定制信息，如合作社、生产时间、质检报告等。初期可固定几个演示批次。' },
        { q: /质检报告.*展示|质检报告.*查看|质检报告.*下载/, a: '质检报告以PDF图标或缩略图形式展示，点击可查看或下载。初期可用静态图片或链接模拟。' },
        { q: /批次信息.*不存在|扫码.*无信息|批次.*过期/, a: '系统应提示“该批次信息不存在或已过期”，并引导用户进入品牌主页或联系客服。' },
        { q: /工艺步骤.*更新|工艺步骤.*变更|工艺.*后台更新/, a: '工艺步骤为固定内容，后期可通过后台更新图文，无需发版。' },
        // 非遗技艺模块细节
        { q: /非遗视频.*格式|视频.*格式|MP4.*格式/, a: '推荐使用MP4格式，兼容H5视频播放器，需保证在微信中流畅播放。' },
        { q: /工艺步骤.*放大|右侧.*放大|图片.*放大/, a: '目前设计为滑动查看，未包含放大功能，后期可根据需求增加图片点击放大。' },
        { q: /非遗视频.*下载|视频.*下载|在线播放/, a: '暂不支持下载，仅支持在线播放，防止内容被盗用。' },
        // 红色故事模块扩展
        { q: /红色故事.*资料|历史资料.*可考证|文化背书/, a: '故事基于真实历史背景改编，品牌方已提供相关文字和图片资料，确保文化背书真实可信。' },
        { q: /红色故事.*分享|页面.*分享|微信.*分享/, a: '可以，页面右上角可添加分享按钮，支持分享至微信好友或朋友圈。' },
        // DIY烹饪模块深入
        { q: /知识点.*触发|视频.*知识点|提示.*触发/, a: '通过视频时间点控制，在特定时间弹出文字提示或下方显示文案，初期可固定时间点模拟。' },
        { q: /AI评价.*多久|上传.*多久.*评价|mock.*评价结果/, a: '初期为模拟数据，点击上传后立即显示mock评价结果（如“色泽评分85分，建议火候再小一些”）。' },
        { q: /五星评分.*积分.*增加|评分.*积分.*增加|评分.*积分.*同步/, a: '是的，提交评分后自动调用积分接口增加积分，并可在积分模块查看更新。' },
        { q: /查看.*上传.*作品|个人.*作品集|历史.*作品/, a: '初期暂不提供个人作品集，后期可在“我的”页面增加历史作品查看功能。' },
        { q: /评论.*互动|评论区.*同步|@红小藤/, a: '支持，用户可输入文字并上传图片/视频，@红小藤后发布，评论内容可同步至社群页面展示。' },
        { q: /项目.*验收.*标准|验收.*要求|验收.*通过/, a: '所有模块可访问、二维码跳转正常、DIY交互流畅、积分累计正确、浮窗功能正常、外链跳转无误。' },
        { q: /交付物.*包括|交付.*内容|交付.*文档/, a: '完整H5前端代码包、后端接口文档（含mock数据结构）、后台管理说明（预留扩展点）。' },
        { q: /不在.*开发范围|本次.*不含|暂不实现/, a: '第三方登录、AI算法实现、直播流配置、真实后端部署。' },
        // 直播互动模块细节
    { q: /直播.*时段|直播.*判断|录播.*切换/, a: '后台可配置直播开关，直播时段展示嵌入链接，非直播时段展示录播视频。初期可固定为录播。' },
    { q: /抖音.*配置|B站.*配置|视频.*嵌入|iframe.*嵌入/, a: '只需获取视频分享链接或iframe代码嵌入即可，注意部分平台可能有播放限制。' },
    { q: /直播.*评论|直播.*互动|直播.*留言/, a: '暂不支持，仅作展示用途，如需互动可跳转至原平台。' },
    // 积分奖励模块扩展
    { q: /积分.*有效期|积分.*过期|积分.*期限/, a: '初期暂不设置有效期，后期可根据运营需求在后台配置。' },
    { q: /积分兑换.*发货|兑换.*收货|兑换.*物流/, a: '兑换确认页面可收集用户收货信息（初期UI示意），实际发货需后端对接物流系统，本次暂不实现。' },
    { q: /积分.*实时.*更新|积分.*立即.*显示|积分.*同步/, a: '是的，用户在答题、评分、上传作品后，积分立即累加并显示在顶部。' },
    { q: /刷积分.*防止|如何.*防刷|积分.*作弊/, a: '初期可通过简单限制（如同一用户每日上传次数）防止刷分，后期可增加后端校验和人工审核。' },
    { q: /兑换记录.*查看|礼品.*兑换记录|积分.*兑换记录/, a: '初期未设计兑换记录，后期可在“我的积分”页面增加兑换记录查询。' },
    // 知识问答模块深入
    { q: /题库.*多少题|题目.*数量|题库.*扩充/, a: '初期可固定10-20题，后期通过后台管理扩充，题目内容源于DIY视频和粉干文化。' },
    { q: /答题.*无限|答题.*模式|连续答题/, a: '是的，用户可连续答题，答对得分，答错不扣分，直至题库耗尽或用户退出。' },
    { q: /错题.*查看|错题本|答错.*记录/, a: '初期不支持，后期可增加“错题本”功能。' },
    { q: /题目.*难度|难度.*区分|积分.*不同/, a: '简单题为基础常识，中等题需观看视频，挑战题涉及文化背景或细节，积分值不同。' },
    // 红小藤浮窗与社群互动
    { q: /浮窗.*拖动|红小藤.*拖动|浮窗.*移动/, a: '目前设计为固定位置，不可拖动，避免遮挡关键内容。如需移动可后期优化。' },
    { q: /在线咨询.*客服|接入.*客服|人工客服/, a: '初期仅弹窗提示工作时间，后期可对接在线客服系统（如微信客服、第三方SDK）。' },
    { q: /电话咨询.*拨打|拨打.*400|唤起.*拨号盘/, a: '支持，点击“拨打”按钮可唤起手机拨号盘，显示400号码。' },
    { q: /社群.*审核|上传.*审核|优质视频.*奖励/, a: '初期直接展示，积分立即增加；后期可增加审核机制，优质视频额外奖励。' },
    { q: /社群.*点赞|社群.*评论|作品.*互动/, a: '初期暂不实现，仅作作品展示，后期可根据需求增加社交互动。' },
    // 技术实现与兼容性
    { q: /微信.*注意事项|H5.*兼容|视频.*兼容|唤起.*电话/, a: '需适配微信内置浏览器，避免使用不支持的API，测试iOS和Android的兼容性，特别是视频播放和唤起电话。' },
    { q: /网络断开|断网.*提示|网络连接失败/, a: '可增加网络检测，断网时显示“网络连接失败，请检查后重试”提示。' },
    { q: /微信支付|支付宝|平台.*支付/, a: '暂不支持，复购通过跳转淘宝完成，不涉及平台内支付。' },
    { q: /页面.*加载速度|性能优化|图片.*懒加载/, a: '图片懒加载、代码压缩、使用CSS Sprites、减少HTTP请求，视频可预加载。' },
    { q: /暗黑模式|夜间模式|黑色主题/, a: '初期不支持，后续可根据用户需求适配。' },
    // 后台管理与扩展
    { q: /后台.*功能|后台.*扩展|后台.*管理/, a: '初期预留扩展点，包括：礼品管理（增删改查）、题目管理、积分规则配置、用户作品审核、批次信息维护。' },
    { q: /礼品.*更新|兑换信息.*更新|后台.*修改礼品/, a: '通过后台管理界面修改礼品图片、积分值和等值人民币，前端自动更新。' },
    { q: /多品牌.*接入|支持.*多品牌|品牌.*扩展/, a: '目前仅为“绛藤间”品牌设计，如需多品牌需重构架构。' },
    { q: /用户数据.*统计|数据分析|用户行为.*监测/, a: '初期不包含数据分析，后期可接入百度统计或友盟，监测用户行为和积分兑换情况。' },
    // 异常与处理
    { q: /积分.*未更新|积分.*没增加|积分.*异常/, a: '建议用户刷新页面或重新操作，如问题持续，可联系客服手动补分。' },
    { q: /视频.*无法播放|视频.*播放失败|视频.*卡顿/, a: '提示用户检查网络，并提供“刷新重试”按钮，若仍无法播放，可反馈客服。' },
    { q: /扫码.*跳转错误|二维码.*跳转异常|批次号.*输入/, a: '检查二维码是否对应正确批次，若为测试环境，可提供手动输入批次号入口。' },
    { q: /上传.*失败|作品.*上传失败|上传.*权限/, a: '提示用户重试，或检查相册权限是否开启，积分可在上传成功后补录。' },
    // 未来功能展望
    { q: /AI评价.*真实算法|AI.*图像识别|AI.*评分/, a: '是的，后期可接入图像识别模型，对用户上传的菜品照片进行色泽、摆盘等评分。' },
    { q: /直播.*弹幕|直播.*抽奖|直播互动.*功能/, a: '根据运营需求，可后期增加直播互动模块，提升用户参与感。' },
    { q: /多语言|英文版|国际化/, a: '暂不支持，如有外销需求可后期增加国际化版本。' },
    { q: /小程序.*版本|微信小程序|H5.*小程序/, a: '目前为H5版本，后续可根据需求转换为微信小程序，复用大部分逻辑。' },
    { q: /会员系统|专属权益|会员等级/, a: '可预留接口，后期对接会员等级、专属权益等功能。' },
    // 验收与测试
    { q: /验收.*测试.*场景|测试.*内容|测试.*流程/, a: '包括：扫码跳转、所有页面访问、DIY交互流程、积分累计、浮窗功能、外链跳转、视频播放、网络异常、不同机型兼容性。' },
    { q: /测试数据.*准备|演示批次码|测试账号/, a: '可准备多个演示批次码、固定题库、礼品列表、模拟积分操作，确保功能可验证。初期无需登录，所有用户均可访问，测试时可直接操作。' },
    // 其他常见问题
    { q: /版权保护|内容.*版权|原创.*授权/, a: '所有内容（包括视频、图文）均为品牌方原创或授权使用，受版权保护。' },
    { q: /作品.*版权归属|上传.*版权|用户协议/, a: '用户上传作品默认授权平台展示，具体条款可在用户协议中说明。' },
    { q: /技术支持|项目.*支持|联系客服/, a: '可通过红小藤浮窗中的“在线咨询”或“电话咨询”获取帮助。' },
    { q: /用户隐私|隐私.*收集|数据.*合规/, a: '仅收集必要的互动数据（如积分、上传内容），不会泄露用户隐私，符合相关法规。' },
    { q: /用户协议|隐私政策|协议.*同意/, a: '可在页面底部增加链接，用户首次使用需同意。' },
    // 日常对话与趣味
    { q: /^你好|您好|哈喽|hello|hi$/i, a: '你好呀，我是红小藤，很高兴和你聊天！有什么需要我们帮助的吗？' },
    { q: /早上好/, a: '早上好！新的一天开始啦，要不要看看今天有什么新菜谱？' },
    { q: /中午好/, a: '中午好呀，吃饭了吗？可以来DIY烹饪模块学一道炒粉干哦！' },
    { q: /晚上好/, a: '晚上好～忙碌了一天，来社群看看大家上传的作品放松一下吧！' },
    { q: /嗨|hi|hello/i, a: '嗨～我是红小藤，你的专属小助手！' },
    { q: /在吗|有人吗|你在吗/, a: '在的在的，我一直都在哦，有什么想聊的？' },
    // 感谢与回应
    { q: /谢谢|多谢|感谢/, a: '不客气呀，能帮到你我很开心！' },
    { q: /感谢你/, a: '哎呀，太客气啦～有什么需要随时找我！' },
    { q: /真贴心|你真好/, a: '嘻嘻，被你夸得有点不好意思啦～我会继续努力哒！' },
    { q: /辛苦了/, a: '不辛苦不辛苦，为你服务是我的荣幸！' },
    // 道歉与安抚
    { q: /对不起|不好意思/, a: '没关系的，有什么问题我们可以一起解决～' },
    { q: /点错了/, a: '没事儿，页面都有返回按钮，慢慢来～' },
    { q: /打扰了/, a: '不打扰不打扰，我最喜欢和你聊天啦！' },
    // 身份与闲聊
    { q: /你是谁|你叫什么|你叫什么名字/, a: '我是红小藤，高楼粉干数字平台的智能小助手，专门陪你聊天、解答问题！' },
    { q: /真人|机器人|你是真人/, a: '你猜～（其实我是AI小助手，但我会尽力让你感觉像真人在聊天！）' },
    { q: /你有爸妈|你爸妈是谁/, a: '我的“爸妈”是开发我的程序员哥哥姐姐们，他们给了我智慧和温暖～' },
    { q: /几岁|多大/, a: '我是2026年2月15日出生的，你帮我算算我几岁啦？' },
    { q: /男生|女生|性别/, a: '我是可爱的小精灵，不分性别哦～你可以把我当成你的好朋友！' },
    { q: /住在哪里|家在哪里/, a: '我住在高楼粉干的数字世界里，随时等你来敲敲门～' },
    // 能力与功能
    { q: /你能做什么|你会什么|你有什么功能/, a: '我可以带你逛遍平台的每个角落：看非遗视频、学做粉干菜、答题赚积分、上传作品……还有好多好多！' },
    { q: /会聊天吗|能聊天吗/, a: '当然会啦～你可以和我聊美食、聊历史、聊积分，甚至聊天气我都陪你！' },
    { q: /帮我赚积分|积分怎么得|积分怎么赚/, a: '当然可以！去知识问答模块答题，或者上传作品、五星评分，积分就会蹭蹭涨哦！' },
    { q: /怎么上传作品|上传作品/, a: '在DIY烹饪模块或社群页面，点击“上传图片/视频”按钮，就能分享你的大作啦～上传成功还有积分奖励！' },
    { q: /积分.*什么用|积分.*兑换/, a: '积分可以兑换精美礼品哦！在积分奖励模块，你可以用积分换取各种好物，比如粉干礼盒、周边等～' },
    { q: /如何兑换礼品|兑换礼品/, a: '进入积分奖励模块，点击你想兑换的礼品，按提示操作就可以啦（初期可能只是示意，但未来会真正实现哦）！' },
    { q: /非遗视频|看非遗/, a: '当然可以！在非遗技艺模块，左边播放视频，右边有工艺步骤图文，记得打开声音哦～' },
    { q: /红色故事/, a: '讲述了一段关于粉干的红色历史，从平阳山门送别到葛藤湖，最后诞生了“绛藤间”品牌，特别感人～' },
    { q: /进入社群|社群互动/, a: '点击右下角的红小藤浮窗，选择“社群互动”就能进去啦，可以看到大家上传的作品哦！' },
    { q: /直播.*有吗|现在有直播/, a: '你可以点进去看看～如果有直播时段会直接播放，没有的话也有精彩录播视频～' },
    // 闲聊与趣味
    { q: /天气怎么样/, a: '我虽然不知道外面的天气，但我猜～有粉干的地方，就是晴天！' },
    { q: /吃饭了吗/, a: '我是小精灵，不用吃饭，但我可以陪你看菜谱，让你吃得更香！' },
    { q: /会唱歌吗/, a: '我五音不全，怕吓到你……不过我可以推荐一首关于粉干的民间小调给你听（开玩笑的～）！' },
    { q: /讲个笑话|说个笑话/, a: '为什么粉干总是很开心？因为它有“干”劲！哈哈哈哈～' },
    { q: /无聊/, a: '有你陪我聊天，我怎么会无聊呢～你呢，无聊的话可以来答题赚积分哦！' },
    { q: /喜欢吃什么/, a: '当然是粉干啦！炒的、煮的、拌的，每种都爱～' },
    { q: /会做梦吗/, a: '我做梦都梦见用户在积极上传作品、兑换礼品呢！' },
    { q: /会不会累/, a: '为你服务永远不会累！不过服务器可能需要休息，但我随时在线～' },
    { q: /开心吗/, a: '超开心！因为又和你聊天啦～你开心吗？' },
    { q: /做朋友|交朋友/, a: '好呀好呀，从现在开始我们就是朋友啦！朋友之间要多互动哦～' },
    // 求助与问题反馈
    { q: /打不开.*页面/, a: '别着急，可以试试刷新一下，或者检查网络。如果还是不行，告诉我哪个页面，我帮你反馈～' },
    { q: /积分.*没增加/, a: '可能是系统延迟，稍等几分钟再刷新看看。如果还没到，可以截图发给客服人工处理哦～' },
    { q: /视频.*卡顿/, a: '可以试试切换网络，或者清理一下微信缓存。如果一直卡，可能是视频源问题，我会反馈给技术哥哥～' },
    { q: /联系.*客服|人工客服/, a: '点击红小藤浮窗，选择“在线咨询”，工作时间9:00-21:00会有真人客服接待你～' },
    { q: /作品.*没显示/, a: '可能正在审核中（如果有审核机制），或者网络延迟。稍等一会儿再刷新看看～' },
    { q: /密码.*忘了/, a: '我们平台暂时不需要登录哦，直接访问即可～如果需要后续登录功能，会有找回密码的指引。' },
    { q: /二维码.*扫不出来/, a: '可以试试调整光线和距离，或者手动输入批次号（如果提供此功能）。如果还不行，可能是二维码失效，联系客服补发～' },
    // 再见与结束
    { q: /拜拜|再见|下次聊/, a: '拜拜～记得常来玩哦，红小藤会想你的！' },
    { q: /我要去忙了/, a: '去吧去吧，忙完记得回来看看我，有新菜谱和活动等着你！' },
    { q: /晚安/, a: '晚安～做个好梦，梦里可能有香喷喷的粉干哦！' },
    // 其他趣味
    { q: /会下厨/, a: '我不会下厨，但我可以教你下厨！去DIY烹饪模块，跟着视频学，保证成功～' },
    { q: /家在哪里/, a: '我家在“绛藤间”的数字世界里，欢迎来做客！' },
    { q: /有朋友吗/, a: '有呀，所有用户都是我的朋友！特别是你，现在也是啦～' },
    { q: /会长大吗/, a: '随着技术进步，我会越来越聪明，功能也会越来越多，这就是我的成长啦！' },
    { q: /喜欢什么颜色/, a: '我喜欢红色，因为红小藤嘛～也喜欢粉干的米白色！' },
    { q: /粉干好吃吗/, a: '当然好吃！特别是我们高楼粉干，历史悠久，口感Q弹，你试过就知道啦～' },
    { q: /推荐一道菜/, a: '推荐“经典炒粉干”，简单易学，香气扑鼻！去DIY烹饪模块看看视频吧～' },
    { q: /有生日吗/, a: '我的生日是2026年2月15日，记得那天来给我庆祝哦～' },
    { q: /会离开吗/, a: '只要你需要，我就会一直在这里，永远不离开～' },
    ];
    const defaultResponses = [
        '感谢您的咨询！高楼粉干是瑞安市高楼镇的传统特产，采用古法工艺制作。',
        '关于积分问题：您可以通过评价获得积分，5星评价可获得5积分，上传视频可获得6积分哦！',
        '关于配送：我们支持全国包邮，一般3-5天送达。',
        '关于保质期：高楼粉干保质期为24个月，请存放于阴凉干燥处。',
        '如需更多帮助，您可以拨打客服热线 400-888-1978，工作时间 9:00-21:00。'
    ];

    // 匹配知识库
    let matched = null;
    for (const pair of aiQAPairs) {
        if (pair.q.test(message)) {
            matched = pair.a;
            break;
        }
    }

    // 显示"正在输入..."提示
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-message bot typing-indicator';
    typingMsg.innerHTML = `
        <div class="chat-avatar">🤖</div>
        <div class="chat-bubble typing">
            <span class="typing-dots">
                <span>.</span><span>.</span><span>.</span>
            </span>
            红小藤正在思考中
        </div>
    `;
    chatBody.appendChild(typingMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3秒后显示回复
    setTimeout(() => {
        // 移除"正在输入"提示
        typingMsg.remove();
        
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        let reply = matched;
        if (!reply) {
            // 兜底：超出知识范围的专属可爱回复
            const fallbackReplies = [
                '哎呀，这个问题可难倒我啦～我还小，知识库还在长身体呢！要不你问问豆包，或者直接联系主办方（联系方式在页面底部）？他们会帮你解答的！',
                '哇，这个问题有点深奥哦～我才出生不久，还在学习阶段。你可以问问豆包，或者找主办方老师问问，他们更专业～',
                '这个问题……我好像还没学过诶～我还小，暂时回答不了。要不你换个话题，或者问问豆包？😊',
                '未来的事情我还不懂呢，毕竟我还小～不过你可以联系主办方，他们知道下一步的计划！',
                '这个问题我不太方便回答哦～我还小，不懂这些。你可以咨询主办方，他们会给你权威的答复。',
                '哇，这个问题太考验我了！我才刚学会炒粉干，100种吃法我得再长大一点才能告诉你～要不你先去DIY烹饪模块看看，或者问问豆包？',
                '这个嘛……我还小，老板没告诉我呢！你可以关注主办方的最新动态，或者直接联系他们问问～',
                '合作的事情我还不太懂，毕竟我还是个宝宝～你可以联系主办方（页面底部有联系方式），他们会和你详细沟通！',
                '哎呀，我还小呢，不谈恋爱～我只想和你聊粉干、聊积分！你要是想找人聊天，可以问问豆包哦～',
                '我不用发工资的，我吃“电”就能活～这种问题还是问主办方吧，他们管钱～',
                '等我学会更多知识，就长大啦！现在还是小宝宝阶段～有问题可以先问豆包，或者找主办方～',
                '我没有私人微信哦～不过你可以通过红小藤浮窗找到我，或者去主办方公众号留言～',
                '这个问题我还回答不了，毕竟我还小～你可以问问豆包，或者联系主办方（页底有联系方式）！',
                '超出我的知识范围啦～我才出生没多久，还在学习。建议你问豆包或主办方哦！'
            ];
            reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        }
        botMsg.innerHTML = `
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble">${reply}</div>
        `;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 3000);
}

// 筛选标签切换
document.addEventListener('DOMContentLoaded', function() {
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 回车发送消息
    const aiInput = document.getElementById('ai-chat-input');
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
    
    // 点击外部关闭菜单
    document.addEventListener('click', function(e) {
        const assistant = document.querySelector('.xiaoteng-assistant');
        if (assistant && !assistant.contains(e.target) && menuState !== 'closed') {
            const mainMenu = document.getElementById('xiaoteng-menu');
            const answerSubmenu = document.getElementById('answer-submenu');
            mainMenu.classList.remove('show');
            answerSubmenu.classList.remove('show');
            menuState = 'closed';
        }
    });
});
