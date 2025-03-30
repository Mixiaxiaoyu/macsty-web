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

// 页面加载完成后应用样式
window.addEventListener('load', applyFontStyles);


// 监听 new-title-1 元素的鼠标移动事件
// 获取所有具有 new-title-1 类的元素
const newTitle1Elements = document.querySelectorAll('.new-title-1');

// 遍历每个 new-title-1 元素
newTitle1Elements.forEach(textElement => {
    const text = textElement.textContent;
    let spans = '';
    // 将每个字符用 span 包裹
    for (let i = 0; i < text.length; i++) {
        spans += `<span>${text[i]}</span>`;
    }
    textElement.innerHTML = spans;

    // 获取所有的 span 元素
    const spanElements = textElement.querySelectorAll('span');
    const offset = 8; // 可调整的偏移量，用于扩大触发区域

    // 为文本元素添加鼠标移动事件监听器
    textElement.addEventListener('mousemove', function (event) {
        const rect = this.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        // 遍历所有 span 元素
        spanElements.forEach((span, index) => {
            const charRect = span.getBoundingClientRect();
            // 检查鼠标是否在扩大后的字符范围内
            if (
                offsetX >= charRect.left - rect.left - offset &&
                offsetX <= charRect.right - rect.left + offset &&
                offsetY >= charRect.top - rect.top - offset &&
                offsetY <= charRect.bottom - rect.top + offset
            ) {
                span.style.fontWeight = 'bold';
            } else {
                span.style.fontWeight = 'normal';
            }
        });
    });

    // 为文本元素添加鼠标移出事件监听器
    textElement.addEventListener('mouseout', function () {
        // 鼠标移出时恢复原始文本样式
        spanElements.forEach(span => {
            span.style.fontWeight = 'normal';
        });
    });
});

// 一次性选择所有需要应用效果的类的元素
const titleClasses = ['new-title-1', 'new-title-2', 'new-title-3', 'new-title-4', 'new-title-5',];
const allTitleElements = [];
titleClasses.forEach(className => {
    const elements = document.querySelectorAll(`.${className}`);
    allTitleElements.push(...elements);
});

// 遍历所有选中的元素
allTitleElements.forEach(textElement => {
    const text = textElement.textContent;
    let spans = '';
    // 将每个字符用 span 包裹
    for (let i = 0; i < text.length; i++) {
        spans += `<span>${text[i]}</span>`;
    }
    textElement.innerHTML = spans;

    // 获取所有的 span 元素
    const spanElements = textElement.querySelectorAll('span');
    const offset = 24; // 可调整的偏移量，用于扩大触发区域

    // 为文本元素添加鼠标移动事件监听器
    textElement.addEventListener('mousemove', function (event) {
        const rect = this.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        // 遍历所有 span 元素
        spanElements.forEach((span, index) => {
            const charRect = span.getBoundingClientRect();
            // 检查鼠标是否在扩大后的字符范围内
            if (
                offsetX >= charRect.left - rect.left - offset &&
                offsetX <= charRect.right - rect.left + offset &&
                offsetY >= charRect.top - rect.top - offset &&
                offsetY <= charRect.bottom - rect.top + offset
            ) {
                // 添加自定义样式类
                span.classList.add('custom-bold'); 
            } else {
                // 移除自定义样式类
                span.classList.remove('custom-bold'); 
            }
        });
    });

    // 为文本元素添加鼠标移出事件监听器
    textElement.addEventListener('mouseout', function () {
        // 鼠标移出时移除自定义样式类
        spanElements.forEach(span => {
            span.classList.remove('custom-bold');
        });
    });
});

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
//页面刷新强制回到顶部
window.onload = function() {
    // 强制滚动到顶部
    window.scrollTo(0, 0);
    
    // 执行原有的 load 事件处理函数
    applyFontStyles();
    splitTextAndAnimate();
};

// 为了确保在历史记录导航时也能正常工作
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};
