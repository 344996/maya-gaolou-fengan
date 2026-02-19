/**
 * 二维码扫描处理器
 * 功能：处理URL参数，显示产品溯源信息
 * 
 * 二维码URL格式：
 * https://yoursite.com/index.html?code=A2103676
 * 或本地测试：file:///D:/A项目文件夹/Maya/index.html?code=A2103676
 */

// ========================================
// 产品批次数据库
// ========================================
const PRODUCT_DATABASE = {
    // 批次编号 -> 产品信息
    'A2103676': {
        batchCode: 'A2103676',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/15',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103677': {
        batchCode: 'A2103677',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/15',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103678': {
        batchCode: 'A2103678',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/16',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103679': {
        batchCode: 'A2103679',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/16',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103680': {
        batchCode: 'A2103680',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/17',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103681': {
        batchCode: 'A2103681',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/17',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103682': {
        batchCode: 'A2103682',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/18',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103683': {
        batchCode: 'A2103683',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/18',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103684': {
        batchCode: 'A2103684',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/19',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103685': {
        batchCode: 'A2103685',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/19',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103686': {
        batchCode: 'A2103686',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/20',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103687': {
        batchCode: 'A2103687',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/20',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103688': {
        batchCode: 'A2103688',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/21',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103689': {
        batchCode: 'A2103689',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/21',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103690': {
        batchCode: 'A2103690',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/22',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103691': {
        batchCode: 'A2103691',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/22',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103692': {
        batchCode: 'A2103692',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/23',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103693': {
        batchCode: 'A2103693',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/23',
        qualityReport: '合格',
        shelfLife: '24个月'
    },
    'A2103694': {
        batchCode: 'A2103694',
        cooperativeName: '瑞安市龙丰粉丝厂',
        location: '浙江省温州市瑞安市高楼镇湖石龙村',
        craftsman: '曹冠永',
        productionDate: '2026/01/24',
        qualityReport: '合格',
        shelfLife: '24个月'
    }
};

// ========================================
// URL参数处理
// ========================================

/**
 * 获取URL参数
 * @param {string} name - 参数名
 * @returns {string|null} - 参数值
 */
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 更新溯源信息表格
 * @param {object} productInfo - 产品信息对象
 */
function updateTraceabilityInfo(productInfo) {
    // 更新批次编号
    const batchEl = document.getElementById('batch-code');
    if (batchEl) {
        batchEl.textContent = productInfo.batchCode;
        batchEl.classList.add('batch-verified');
    }
    
    // 可选：更新其他字段（如果需要动态显示）
    // 这些信息也可以从数据库中读取并更新
}

/**
 * 显示扫码成功提示
 * @param {string} batchCode - 批次编号
 */
function showScanSuccessMessage(batchCode) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'scan-success-toast';
    toast.innerHTML = `
        <div class="scan-toast-icon">✓</div>
        <div class="scan-toast-text">
            <strong>扫码成功</strong>
            <span>批次编号: ${batchCode}</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.classList.add('show'), 10);
    
    // 3秒后消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * 显示无效二维码提示
 */
function showInvalidCodeMessage() {
    const toast = document.createElement('div');
    toast.className = 'scan-error-toast';
    toast.innerHTML = `
        <div class="scan-toast-icon">✗</div>
        <div class="scan-toast-text">
            <strong>无效的二维码</strong>
            <span>请扫描正品伴手礼上的二维码</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * 滚动到溯源区域
 */
function scrollToTraceability() {
    const traceabilitySection = document.getElementById('traceability');
    if (traceabilitySection) {
        // 等待页面加载完成后滚动
        setTimeout(() => {
            traceabilitySection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // 添加高亮效果
            traceabilitySection.classList.add('highlight-section');
            setTimeout(() => {
                traceabilitySection.classList.remove('highlight-section');
            }, 2000);
        }, 300);
    }
}

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 检查URL中是否有code参数
    const code = getUrlParam('code');
    
    if (code) {
        console.log('扫码访问，批次编号:', code);
        
        // 查找产品信息
        const productInfo = PRODUCT_DATABASE[code];
        
        if (productInfo) {
            // 更新溯源信息
            updateTraceabilityInfo(productInfo);
            
            // 滚动到溯源区域
            scrollToTraceability();
            
            // 显示成功提示
            showScanSuccessMessage(code);
        } else {
            // 无效的二维码
            showInvalidCodeMessage();
        }
    }
});

// ========================================
// 对外接口（供后端调用）
// ========================================

/**
 * 生成二维码链接
 * @param {string} baseUrl - 网站基础URL
 * @param {string} batchCode - 批次编号
 * @returns {string} - 完整的二维码链接
 * 
 * 示例：
 * generateQRCodeUrl('https://gaolou-fenggan.com', 'A2103676')
 * 返回: 'https://gaolou-fenggan.com/index.html?code=A2103676'
 */
function generateQRCodeUrl(baseUrl, batchCode) {
    const url = new URL('index.html', baseUrl);
    url.searchParams.set('code', batchCode);
    return url.toString();
}

/**
 * 批量生成二维码链接
 * @param {string} baseUrl - 网站基础URL
 * @param {string[]} batchCodes - 批次编号数组
 * @returns {object[]} - 链接数组
 */
function generateBatchQRCodeUrls(baseUrl, batchCodes) {
    return batchCodes.map(code => ({
        batchCode: code,
        url: generateQRCodeUrl(baseUrl, code)
    }));
}

// 导出供控制台测试
window.QRCodeHandler = {
    getUrlParam,
    generateQRCodeUrl,
    generateBatchQRCodeUrls,
    PRODUCT_DATABASE
};
