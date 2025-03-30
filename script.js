// 这里可以添加交互逻辑，例如点击图标、菜单等
// 示例：为菜单链接添加点击事件
const menuLinks = document.querySelectorAll('.menu nav ul li a');
menuLinks.forEach(link => {
  link.addEventListener('click', function (event) {
  });
});
// 为关闭按钮添加点击事件
const closeCanvas = document.getElementById('close-canvas');
closeCanvas.addEventListener('click', function () {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.style.display = 'none';

    // 找到 Dock 栏中所有图标
    const dockIcons = document.querySelectorAll('.dock ul li');
    dockIcons.forEach(dockIcon => {
        if (dockIcon.dataset.sourceIconId) {
            // 移除对应的图标
            dockIcon.remove(); 
        }
    });
});

// 添加拖动排序功能
// 获取 Dock 栏的 ul 元素
const dockList = document.querySelector('.dock ul');
let draggedItem = null;
let placeholder = null;

// 创建占位元素
function createPlaceholder() {
    const placeholder = document.createElement('li');
    placeholder.classList.add('placeholder');
    return placeholder;
}

// 拖动开始事件
dockList.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
        // 记录被拖动的 li 元素
        draggedItem = e.target.closest('li');
        // 设置拖动数据
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');
        // 创建占位元素
        placeholder = createPlaceholder();
        // 在被拖动元素的位置插入占位元素
        dockList.insertBefore(placeholder, draggedItem);
        // 延迟隐藏被拖动元素，避免拖动时立即消失
        setTimeout(() => {
            draggedItem.style.display = 'none';
        }, 0);
    }
});

// 拖动经过事件
dockList.addEventListener('dragover', function (e) {
    // 阻止默认行为，允许放置元素
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.target.closest('li');
    if (target && target!== draggedItem) {
        const rect = target.getBoundingClientRect();
        const middle = rect.left + rect.width / 2;
        if (e.clientX < middle) {
            // 在目标元素之前插入占位元素
            if (target.previousElementSibling!== placeholder) {
                dockList.insertBefore(placeholder, target);
            }
        } else {
            // 在目标元素之后插入占位元素
            if (target.nextElementSibling!== placeholder) {
                dockList.insertBefore(placeholder, target.nextElementSibling);
            }
        }
    }
});

// 拖动结束事件
dockList.addEventListener('dragend', function () {
    if (draggedItem) {
        // 移除占位元素
        if (placeholder) {
            const refNode = placeholder.nextSibling;
            dockList.insertBefore(draggedItem, refNode);
            placeholder.parentNode.removeChild(placeholder);
            placeholder = null;
        }
        // 显示被拖动的元素
        draggedItem.style.display = 'block';
        draggedItem = null;
    }
});

// 为菜单栏图标添加点击事件监听器
const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', function () {
  location.reload();
});

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
        followCircle.style.left = e.pageX - 10 + 'px'; // 圆形居中
        followCircle.style.top = e.pageY - 10 + 'px';  // 圆形居中
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
// 获取时间显示元素
const currentTimeElement = document.getElementById('current-time');

// 更新时间显示
function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekday = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${year}-${month}-${day} ${weekday} ${hours}:${minutes}:${seconds}`;
    currentTimeElement.textContent = timeString;
}

// 初始化时间显示
updateTime();

// 每秒更新一次时间
setInterval(updateTime, 1000);


// 定义事件监听器函数
let closeFileManagerListener;

// 打开 win.html 文件管理器的函数
function openInIframe(url) {
    const iframe = document.getElementById('fileManagerIframe');
    iframe.src = url;
    // 设置 iframe 的宽度和高度为父级窗口的大小
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.display = 'block';
    iframe.style.pointerEvents = 'auto'; // 确保 iframe 可以接收鼠标事件

    // 隐藏跟随鼠标的圆形
    const followCircle = document.getElementById('follow-circle');
    followCircle.style.display = 'none';

    // 移除之前的事件监听器（如果存在）
    if (closeFileManagerListener) {
        window.removeEventListener('message', closeFileManagerListener);
    }

    // 定义新的事件监听器函数
    closeFileManagerListener = function(event) {
        if (event.data === 'close-file-manager') {
            console.log('Received close-file-manager message'); 
            iframe.style.display = 'none';
            iframe.style.pointerEvents = 'none'; 
            iframe.src = ''; 
            // 显示跟随鼠标的圆形
            followCircle.style.display = 'block';

            // 移除 Dock 栏中对应的图标
            const dockList = document.querySelector('.dock ul');
            const lastDockItem = dockList.lastElementChild;
            if (lastDockItem) {
                lastDockItem.remove();
            }

            // 移除事件监听器
            window.removeEventListener('message', closeFileManagerListener);
        }
    };

    // 添加新的事件监听器
    window.addEventListener('message', closeFileManagerListener);
}

// 为桌面图标添加点击事件监听器
const desktopIcons = document.querySelectorAll('.desktop-icon');
desktopIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        const dockList = document.querySelector('.dock ul');
        const newDockItem = document.createElement('li');
        const newLink = document.createElement('a');
        const newIcon = this.querySelector('img').cloneNode(true);

        newLink.appendChild(newIcon);
        newDockItem.appendChild(newLink);
        dockList.appendChild(newDockItem);

        // 调用原有的 openInIframe 函数
        openInIframe(`win.html?folder=${this.querySelector('p').textContent}`);
    });
});
// 初始化计数器和定时器
let resizeCount = 0;
let resizeTimer;


// 监听窗口大小变化事件
window.addEventListener('resize', function() {
    // 每次窗口大小变化，计数器加 1
    resizeCount++;

    // 如果定时器已经存在，清除它
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }

    // 设置一个新的定时器，在 0.1 秒后检查计数器
    resizeTimer = setTimeout(function() {
        // 如果计数器大于等于 5，触发图标掉落效果
        if (resizeCount >= 5) {
            dropIcons();
        }
        // 重置计数器
        resizeCount = 0;
    }, 100);
});

// 图标掉落效果函数
function dropIcons() {
    // 获取所有桌面图标
    const desktopIcons = document.querySelectorAll('.desktop-icon');

    // 遍历每个图标，添加掉落动画类
    desktopIcons.forEach(function(icon) {
        icon.classList.add('drop');
    });
}



// 选择所有的眼睛元素
const eyes = document.querySelectorAll('.eye');
// 为文档添加鼠标移动事件监听器
document.addEventListener('mousemove', (e) => {
    // 遍历每个眼睛元素
    eyes.forEach((eye) => {
        // 获取眼睛元素的边界矩形
        const rect = eye.getBoundingClientRect();
        // 计算眼睛元素的中心点的 X 坐标
        const eyeX = rect.left + rect.width / 2;
        // 计算眼睛元素的中心点的 Y 坐标
        const eyeY = rect.top + rect.height / 2;
        // 计算鼠标位置与眼睛中心点的 X 轴距离
        const dx = e.clientX - eyeX;
        // 计算鼠标位置与眼睛中心点的 Y 轴距离
        const dy = e.clientY - eyeY;
        // 计算鼠标位置与眼睛中心点的直线距离
        const distance = Math.sqrt(dx * dx + dy * dy);
        // 定义瞳孔最大移动距离，适当增大以适配更大的眼睛
        const maxDistance = 22;
        // 计算瞳孔移动的比例
        const ratio = Math.min(distance, maxDistance) / distance;
        // 计算瞳孔在 X 轴上的移动距离
        const pupilX = ratio * dx;
        // 计算瞳孔在 Y 轴上的移动距离
        const pupilY = ratio * dy;

        // 选择当前眼睛元素中的瞳孔元素
        const pupil = eye.querySelector('.pupil');
        // 设置瞳孔元素的左偏移量
        pupil.style.left = `calc(50% + ${pupilX}px)`;
        // 设置瞳孔元素的上偏移量
        pupil.style.top = `calc(50% + ${pupilY}px)`;
    });
});

// 设置定时器，每隔 2 秒执行一次眨眼动画
setInterval(() => {
    // 遍历每个眼睛元素
    eyes.forEach((eye) => {
        // 选择当前眼睛元素中的瞳孔元素
        const pupil = eye.querySelector('.pupil');
        // 为瞳孔元素添加 blinking 类，触发眨眼动画
        pupil.classList.add('blinking');
        // 设置定时器，0.2 秒后移除 blinking 类，结束眨眼动画
        setTimeout(() => {
            pupil.classList.remove('blinking');
        }, 200);
    });
}, 2000);
