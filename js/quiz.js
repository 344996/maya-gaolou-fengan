/**
 * 知识问答系统
 * 功能：难度选择、随机出题、答题计分、退出结算
 */

// ========================================
// 状态管理
// ========================================
const QuizState = {
    isActive: false,           // 是否正在答题
    currentDifficulty: null,   // 当前难度: 'easy' | 'medium' | 'hard'
    currentScore: 0,           // 本次积分
    questionCount: 0,          // 已答题数
    currentQuestion: null,     // 当前题目对象
    usedQuestionIndices: [],   // 已用题目索引（用于减少短期重复）
    hasAnswered: false,        // 当前题是否已作答
    
    // 重置状态
    reset() {
        this.isActive = false;
        this.currentDifficulty = null;
        this.currentScore = 0;
        this.questionCount = 0;
        this.currentQuestion = null;
        this.usedQuestionIndices = [];
        this.hasAnswered = false;
    }
};

// 难度名称映射
const DIFFICULTY_NAMES = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
};

// 难度积分映射
const DIFFICULTY_SCORES = {
    'easy': 2,      // 简单题 2分/题
    'medium': 4,    // 中等题 4分/题
    'hard': 6       // 困难题 6分/题
};

// ========================================
// 随机出题逻辑
// ========================================
function getRandomQuestion(difficulty) {
    const questions = QUIZ_DATA[difficulty];
    if (!questions || questions.length === 0) {
        console.error('题库为空:', difficulty);
        return null;
    }
    
    // 如果已用索引超过题库一半，清空以允许重复
    if (QuizState.usedQuestionIndices.length > questions.length / 2) {
        QuizState.usedQuestionIndices = [];
    }
    
    // 随机选择一个未使用的索引
    let randomIndex;
    let attempts = 0;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
        attempts++;
    } while (QuizState.usedQuestionIndices.includes(randomIndex) && attempts < 50);
    
    QuizState.usedQuestionIndices.push(randomIndex);
    return { ...questions[randomIndex], index: randomIndex };
}

// ========================================
// UI 控制
// ========================================

// 打开问答弹窗
function openQuizModal() {
    document.getElementById('quiz-modal').classList.add('active');
    document.getElementById('quiz-difficulty-page').style.display = 'block';
    document.getElementById('quiz-game-page').style.display = 'none';
    document.body.style.overflow = 'hidden';
}

// 关闭问答弹窗
function closeQuizModal() {
    document.getElementById('quiz-modal').classList.remove('active');
    document.body.style.overflow = '';
    QuizState.reset();
}

// 开始答题
function startQuiz(difficulty) {
    QuizState.reset();
    QuizState.isActive = true;
    QuizState.currentDifficulty = difficulty;
    
    // 切换到答题页
    document.getElementById('quiz-difficulty-page').style.display = 'none';
    document.getElementById('quiz-game-page').style.display = 'block';
    
    // 更新难度标签
    const badge = document.getElementById('difficulty-badge');
    badge.textContent = DIFFICULTY_NAMES[difficulty];
    badge.className = 'difficulty-badge ' + difficulty;
    
    // 显示第一题
    showNextQuestion();
}

// 显示下一题
function showNextQuestion() {
    QuizState.hasAnswered = false;
    QuizState.questionCount++;
    
    // 获取随机题目
    const question = getRandomQuestion(QuizState.currentDifficulty);
    if (!question) {
        alert('题库加载失败');
        return;
    }
    QuizState.currentQuestion = question;
    
    // 更新题号
    document.getElementById('question-number').textContent = `第 ${QuizState.questionCount} 题`;
    
    // 显示题目
    document.getElementById('question-text').textContent = question.question;
    
    // 渲染选项
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    question.options.forEach(opt => {
        const optBtn = document.createElement('button');
        optBtn.className = 'option-btn';
        optBtn.dataset.key = opt.key;
        optBtn.innerHTML = `<span class="opt-key">${opt.key}</span><span class="opt-text">${opt.text}</span>`;
        optBtn.onclick = () => selectAnswer(opt.key);
        optionsList.appendChild(optBtn);
    });
    
    // 隐藏反馈和下一题按钮
    document.getElementById('answer-feedback').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

// 选择答案
function selectAnswer(selectedKey) {
    if (QuizState.hasAnswered) return;
    QuizState.hasAnswered = true;
    
    const correctKey = QuizState.currentQuestion.answer;
    const isCorrect = selectedKey === correctKey;
    
    // 标记选项状态
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => {
        opt.disabled = true;
        if (opt.dataset.key === correctKey) {
            opt.classList.add('correct');
        } else if (opt.dataset.key === selectedKey && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    // 显示反馈
    const feedback = document.getElementById('answer-feedback');
    if (isCorrect) {
        const scoreGain = DIFFICULTY_SCORES[QuizState.currentDifficulty] || 2;
        QuizState.currentScore += scoreGain;
        updateScoreDisplay();
        feedback.innerHTML = `<span class="correct-feedback">✓ 回答正确！积分 +${scoreGain}</span>`;
        
        // 实时累加积分到用户总积分
        if (typeof triggerPointsReward === 'function') {
            triggerPointsReward(scoreGain, '知识问答-' + DIFFICULTY_NAMES[QuizState.currentDifficulty]);
        }
    } else {
        feedback.innerHTML = `<span class="wrong-feedback">✗ 回答错误，正确答案是 ${correctKey}</span>`;
    }
    feedback.style.display = 'block';
    
    // 显示下一题按钮
    document.getElementById('next-btn').style.display = 'block';
}

// 下一题
function nextQuestion() {
    showNextQuestion();
}

// 更新积分显示
function updateScoreDisplay() {
    document.getElementById('current-score').textContent = QuizState.currentScore;
    // 添加动画效果
    const scoreEl = document.getElementById('current-score');
    scoreEl.classList.add('score-animate');
    setTimeout(() => scoreEl.classList.remove('score-animate'), 300);
}

// ========================================
// 退出结算逻辑
// ========================================

// 退出按钮点击
function exitQuiz() {
    document.getElementById('exit-score').textContent = QuizState.currentScore;
    document.getElementById('exit-confirm-modal').classList.add('active');
}

// 取消退出
function cancelExit() {
    document.getElementById('exit-confirm-modal').classList.remove('active');
}

// 确认退出 - 积分已在答题时实时结算
async function confirmExit() {
    const score = QuizState.currentScore;
    
    // 关闭确认弹窗
    document.getElementById('exit-confirm-modal').classList.remove('active');
    
    // 显示结算提示（积分已在答题时实时累加，无需再次结算）
    if (score > 0) {
        showToast(`本次答题获得 ${score} 积分，已自动累加到账户！`);
    } else {
        showToast('本次未获得积分，再接再厉！');
    }
    
    // 关闭问答弹窗
    closeQuizModal();
}

// ========================================
// 后端接口定义
// ========================================

/**
 * 积分结算接口
 * @param {number} score - 本次获得的积分
 * @returns {Promise<{success: boolean, totalScore: number, message: string}>}
 * 
 * 接口定义：
 * POST /api/quiz/settle
 * Request Body: { score: number, difficulty: string, questionCount: number }
 * Response: { success: boolean, totalScore: number, message: string }
 */
async function settleScore(score) {
    // 模拟后端接口调用
    // 实际部署时替换为真实API调用
    
    /*
    // 真实接口调用示例：
    const response = await fetch('/api/quiz/settle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getUserToken()
        },
        body: JSON.stringify({
            score: score,
            difficulty: QuizState.currentDifficulty,
            questionCount: QuizState.questionCount
        })
    });
    return await response.json();
    */
    
    // 模拟延迟和成功响应
    return new Promise(resolve => {
        setTimeout(() => {
            // 模拟更新本地存储的总积分
            const currentTotal = parseInt(localStorage.getItem('userTotalScore') || '0');
            const newTotal = currentTotal + score;
            localStorage.setItem('userTotalScore', newTotal.toString());
            
            resolve({
                success: true,
                totalScore: newTotal,
                message: '积分结算成功'
            });
        }, 500);
    });
}

/**
 * 获取用户总积分接口
 * @returns {Promise<{totalScore: number}>}
 * 
 * 接口定义：
 * GET /api/user/score
 * Response: { totalScore: number }
 */
async function getUserTotalScore() {
    // 模拟从本地存储获取
    const total = parseInt(localStorage.getItem('userTotalScore') || '0');
    return { totalScore: total };
}

// ========================================
// 工具函数
// ========================================

// 显示提示消息
function showToast(message) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'quiz-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.classList.add('show'), 10);
    
    // 3秒后消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// 事件绑定
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 绑定导航栏知识问答入口
    const quizNavBtn = document.querySelector('a[href="#quiz"]');
    if (quizNavBtn) {
        quizNavBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openQuizModal();
        });
    }
    
    // 点击弹窗外部关闭（难度选择页）
    document.getElementById('quiz-modal').addEventListener('click', function(e) {
        if (e.target === this && !QuizState.isActive) {
            closeQuizModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('exit-confirm-modal').classList.contains('active')) {
                cancelExit();
            } else if (document.getElementById('quiz-modal').classList.contains('active')) {
                if (QuizState.isActive) {
                    exitQuiz();
                } else {
                    closeQuizModal();
                }
            }
        }
    });
});
