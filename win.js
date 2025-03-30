// 获取文件管理器元素
const fileManager = document.querySelector('.file-manager');
// 获取顶部导航栏元素，用于拖动操作
const navBar = document.querySelector('.nav-bar');

let isDragging = false;
let offsetX, offsetY;

// 监听导航栏的鼠标按下事件
navBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    // 计算鼠标相对于文件管理器左上角的偏移量
    offsetX = e.clientX - fileManager.offsetLeft;
    offsetY = e.clientY - fileManager.offsetTop;
});

// 监听文档的鼠标移动事件
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        // 更新文件管理器的位置
        fileManager.style.left = (e.clientX - offsetX) + 'px';
        fileManager.style.top = (e.clientY - offsetY) + 'px';
    }
});

// 监听文档的鼠标松开事件
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// 获取当前文件夹和选中图片的显示元素
const currentFolder = document.getElementById('current-folder');
const selectedImage = document.getElementById('selected-image');

// 获取 URL 参数中的文件夹名称
const urlParams = new URLSearchParams(window.location.search);
const selectedFolder = urlParams.get('folder');

// 获取所有文件夹项
const folderItems = document.querySelectorAll('.folder-item');

// 定义每个文件夹对应的文件内容
const folderContents = {
    "文件夹": [
        
    ],
    "设计资料": [
       
    ],
    "摄影作品": [
        { src: "img/摄影 (1).jpg", alt: "摄影 " },
        { src: "img/摄影 (2).jpg", alt: "摄影 " },
        { src: "img/摄影 (3).jpg", alt: "摄影" }
    ],
    "平面设计": [
        { src: "img/平面 (2).webp", alt: "平面 " },
        { src: "img/平面 (1).png", alt: "平面 " },
        { src: "img/平面 (1).jpg", alt: "平面 " }
    ],
    "计划": [
        { src: "img/彩蛋.png", alt: "彩蛋.png" }
    ],
    "三维设计": [
        { src: "img/三维1.png", alt: "三维" },
        { src: "img/三维.png", alt: "三维" }
    ],
    "其他1": [
      
    ],
    "其他2": [
       
    ],
    "生活vlog": [
    
    ],

};

// 获取右侧文件展示区
const rightPanel = document.querySelector('.right-panel');

function showFolderContent(folderName) {
    // 清空右侧文件展示区
    rightPanel.innerHTML = '';

    // 获取对应文件夹的内容
    const contents = folderContents[folderName];
    if (contents && contents.length > 0) {
        contents.forEach(item => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');
            const img = document.createElement('img');
            img.src = item.src;
            img.classList.add('file-thumbnail');
            img.alt = item.alt;
            const span = document.createElement('span');
            span.textContent = item.alt;
            fileItem.appendChild(img);
            fileItem.appendChild(span);
            rightPanel.appendChild(fileItem);
        });
    }

    // 重新为所有的文件缩略图添加点击事件监听器
    const thumbnails = document.querySelectorAll('.file-thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // 显示图片放大查看的遮罩层
            imageOverlay.style.display = 'flex';
            // 设置放大后图片的 src 属性为点击的缩略图的 src 属性
            enlargedImage.src = thumbnail.src;
            // 获取选中图片的名称
            const imageName = thumbnail.nextElementSibling.textContent;
            selectedImage.textContent = `选中图片: ${imageName}`;
        });
    });
}

folderItems.forEach(item => {
    if (item.textContent.trim() === selectedFolder) {
        // 模拟点击选中的文件夹
        item.click();
        // 更新当前文件夹显示
        currentFolder.textContent = `当前文件夹: ${selectedFolder}`;
        // 添加选中状态的类
        item.classList.add('selected');
        // 显示对应文件夹的内容
        showFolderContent(selectedFolder);
    }

    // 为每个文件夹项添加点击事件监听器
    item.addEventListener('click', () => {
        // 移除所有文件夹项的选中状态
        folderItems.forEach(folder => {
            folder.classList.remove('selected');
        });
        // 添加当前点击文件夹的选中状态
        item.classList.add('selected');
        // 更新当前文件夹显示
        const folderName = item.textContent.trim();
        currentFolder.textContent = `当前文件夹: ${folderName}`;
        // 显示对应文件夹的内容
        showFolderContent(folderName);
    });
});

// 获取所有的文件缩略图
const thumbnails = document.querySelectorAll('.file-thumbnail');
// 获取图片放大查看的遮罩层和放大后的图片元素
const imageOverlay = document.querySelector('.image-overlay');
const enlargedImage = document.querySelector('.enlarged-image');


let currentImageIndex = 0;
let currentFolderContents = [];

function showImage(index) {
    if (index >= 0 && index < currentFolderContents.length) {
        enlargedImage.src = currentFolderContents[index].src;
        const imageName = currentFolderContents[index].alt;
        selectedImage.textContent = `选中图片: ${imageName}`;
        currentImageIndex = index;
    }
}

// 为每个缩略图添加点击事件监听器
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // 显示图片放大查看的遮罩层
        imageOverlay.style.display = 'flex';
        // 获取当前文件夹的内容
        const folderName = currentFolder.textContent.replace('当前文件夹: ', '');
        currentFolderContents = folderContents[folderName];
        // 找到当前点击图片的索引
        currentImageIndex = currentFolderContents.findIndex(item => item.src === thumbnail.src);
        // 显示当前图片
        showImage(currentImageIndex);
    });
});

// 为图片放大查看的遮罩层添加点击事件监听器，点击遮罩层关闭放大查看
imageOverlay.addEventListener('click', (e) => {
    if (e.target === imageOverlay) {
        imageOverlay.style.display = 'none';
        // 清除选中图片的名称
        selectedImage.textContent = '';
    }
});

// 模拟路径导航点击（可扩展真实路径跳转）
const pathItems = document.querySelectorAll('.path-item');
pathItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('点击路径:', item.textContent);
    });
});


// 获取关闭按钮元素
const closeBtn = document.getElementById('close-btn');
// 获取文件管理器的遮罩层
const overlay = document.querySelector('.overlay');

// 为关闭按钮添加点击事件监听器
closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none'; // 隐藏文件管理器
    // 向父窗口发送关闭消息
    window.parent.postMessage('close-file-manager', '*');
});
