// 创建跟随鼠标的圆形元素
const followCircle = document.createElement('div');
followCircle.id = 'follow-circle';
document.body.appendChild(followCircle);

let timer;
const delay = 6; // 延迟时间，单位为毫秒

// 监听鼠标移动事件
document.addEventListener('mousemove', function (e) {
    // 清除之前的定时器
    clearTimeout(timer);
    // 设置新的定时器
    timer = setTimeout(() => {
        // 修改为使用 e.clientX 和 e.clientY 计算位置
        followCircle.style.left = e.clientX - 10 + 'px'; // 圆形居中
        followCircle.style.top = e.clientY - 10 + 'px';  // 圆形居中
    }, delay);
});

// 监听鼠标移出窗口事件
document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget || (e.relatedTarget.nodeName === 'HTML' && !e.relatedTarget.contains(e.target))) {
        followCircle.style.display = 'none';
    }
});

// 监听鼠标移入窗口事件
document.addEventListener('mouseover', function (e) {
    if (e.relatedTarget === null || (e.relatedTarget.nodeName === 'HTML' && !e.target.contains(e.relatedTarget))) {
        followCircle.style.display = 'block';
    }
});

// 检查浏览器是否支持 loading="lazy"
if ('loading' in HTMLImageElement.prototype) {
    // 浏览器支持，无需额外操作
    console.log('浏览器支持原生懒加载');
} else {
    // 浏览器不支持，使用 JavaScript 实现懒加载
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
}

// 滚动检测逻辑
let scrollTimer;
const scrollDelay = 12000; // 12 秒没有滚动后开始变形
const images = document.querySelectorAll('img');

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    images.forEach(img => {
        img.classList.remove('noise-effect');
    });
    scrollTimer = setTimeout(() => {
        images.forEach(img => {
            img.classList.add('noise-effect');
        });
    }, scrollDelay);
});

// 检测标题文本并应用样式
function applyFontStyles() {
    const titles = document.querySelectorAll('.title-1, .title-2');
    titles.forEach(title => {
        const text = title.textContent;
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        const hasEnglish = /[a-zA-Z]/.test(text);

        if (hasChinese) {
            title.classList.add('chinese-font');
        }
        if (hasEnglish) {
            title.classList.add('english-font');
        }
    });
}

// 拆分文本并为每个字符添加动画
function splitTextAndAnimate() {
    const titles = document.querySelectorAll('.title-1, .title-2');
    titles.forEach((title, index) => {
        const text = title.textContent;
        title.innerHTML = '';
        let delayFactor;
        if (title.classList.contains('title-1')) {
            delayFactor = 0.05; // .title-1 的延迟系数
        } else if (title.classList.contains('title-2')) {
            delayFactor = 0.05; // .title-2 的延迟系数，设置得更小以加快速度
        }
        text.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('slide-up-char');
            // 为每个字符添加延迟，实现逐个出现的效果
            span.style.animationDelay = `${charIndex * delayFactor}s`;
            title.appendChild(span);
        });
    });
}

// 页面加载完成后应用样式和动画
window.addEventListener('load', () => {
    applyFontStyles();
    splitTextAndAnimate();
});


// 创建自定义弹窗元素
const customModal = document.createElement('div');
customModal.id = 'custom-modal';
customModal.innerHTML = `
    <div class="modal-content">
        <h2>该页面内容受保护，请勿尝试复制或下载。</h2>
        <button onclick="closeModal()">确定</button>
    </div>
`;
document.body.appendChild(customModal);

// 关闭弹窗的函数
function closeModal() {
    customModal.style.display = 'none';
}

// 禁止右键点击
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    customModal.style.display = 'flex';
});

// 禁止键盘快捷键
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.keyCode === 123) { // 禁止 Ctrl 组合键和 F12
        e.preventDefault();
    }
});
