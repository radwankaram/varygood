







// التأكد من دعم المتصفح لتحويل الصوت إلى نص
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Your browser does not support Speech Recognition. Please use Google Chrome.');
}

// تحديد العناصر
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const saveBtn = document.getElementById('saveBtn');
const transcriptionContainer = document.getElementById('transcriptionContainer');
const savedTranscriptions = document.getElementById('savedTranscriptions');
const languageSelect = document.getElementById('languageSelect');
const title = document.getElementById('title');

let recognition;
let isRecording = false;
let currentTranscription = "";
let finalTranscription = "";

// تهيئة تحويل الصوت إلى نص
function initializeRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;  // السماح بتدفق النص بشكل مستمر
    recognition.interimResults = true;  // عرض النتائج المؤقتة
    recognition.lang = languageSelect.value === 'ar' ? 'ar-SA' : 'en-US';

    recognition.onresult = (event) => {
        currentTranscription = ''; // لتجميع النص المؤقت

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscription += transcript + ' ';
            } else {
                currentTranscription += transcript + ' ';
            }
        }

        transcriptionContainer.innerText = finalTranscription + currentTranscription; // عرض النص النهائي والمؤقت معًا
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        if (isRecording) recognition.start();
    };
}

// بدء التسجيل
startBtn.addEventListener('click', () => {
    initializeRecognition();
    recognition.start();
    isRecording = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    saveBtn.disabled = true;
    finalTranscription = ''; // إعادة تعيين النص النهائي
    transcriptionContainer.innerText = ''; // إعادة تعيين حاوية النص
});

// إيقاف التسجيل
stopBtn.addEventListener('click', () => {
    recognition.stop();
    isRecording = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    saveBtn.disabled = false;
});

// حفظ النص المحول
saveBtn.addEventListener('click', () => {
    if (finalTranscription.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = finalTranscription;

        // زر النسخ
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.classList.add('copy-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(finalTranscription);
            alert('Text copied to clipboard!');
        });

        li.appendChild(copyBtn);
        savedTranscriptions.appendChild(li);
        transcriptionContainer.innerText = '';
        finalTranscription = '';
        saveBtn.disabled = true;
    }
});

// تغيير اللغة
languageSelect.addEventListener('change', () => {
    const lang = languageSelect.value;
    if (lang === 'ar') {
        title.innerText = 'تحويل الصوت إلى نص';
        startBtn.innerText = 'ابدأ';
        stopBtn.innerText = 'إيقاف';
        saveBtn.innerText = 'حفظ';
    } else {
        title.innerText = 'Speech to Text Converter';
        startBtn.innerText = 'Start';
        stopBtn.innerText = 'Stop';
        saveBtn.innerText = 'Save';
    }
    if (recognition) {
        recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    }
});














function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const useNumbers = document.getElementById('numbers').checked;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useSymbols = document.getElementById('symbols').checked;

    if (!useNumbers && !useUppercase && !useLowercase && !useSymbols) {
        alert('يجب تحديد نوع واحد على الأقل من الأحرف!');
        return;
    }

    const numbers = "0123456789";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const symbols = "!@#$%^&*()_+[]{}|;:',.<>?/";

    let charset = "";
    if (useNumbers) charset += numbers;
    if (useUppercase) charset += uppercase;
    if (useLowercase) charset += lowercase;
    if (useSymbols) charset += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password').value = password;
}

function copyToClipboard() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('تم نسخ كلمة المرور إلى الحافظة!');
}




















function computeAge() {
    const dob = document.getElementById('dobInput').value;
    const ageDisplay = document.getElementById('ageDisplay');
    
    if (!dob) {
        ageDisplay.textContent = 'Please enter a valid date of birth.';
        return;
    }

    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDifference = currentDate.getMonth() - dobDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }

    ageDisplay.textContent = `Your age is ${age} years.`;
}



















document.getElementById('currencyConvertBtn').addEventListener('click', function () {
    convertCurrency();
});

function convertCurrency() {
    const amountValue = parseFloat(document.getElementById('currencyAmount').value);
    const fromCurrencyValue = document.getElementById('currencyFrom').value;
    const toCurrencyValue = document.getElementById('currencyTo').value;

    if (isNaN(amountValue)) {
        alert('يرجى إدخال مبلغ صالح');
        return;
    }

    const exchangeRates = {
        USD: { USD: 1, EUR: 0.85, GBP: 0.75, JPY: 110 },
        EUR: { USD: 1.18, EUR: 1, GBP: 0.88, JPY: 129 },
        GBP: { USD: 1.33, EUR: 1.14, GBP: 1, JPY: 146 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0068, JPY: 1 }
    };

    const convertedResult = (amountValue * exchangeRates[fromCurrencyValue][toCurrencyValue]).toFixed(2);

    displayResult(amountValue, fromCurrencyValue, convertedResult, toCurrencyValue);
}

function displayResult(amount, fromCurrency, convertedAmount, toCurrency) {
    const resultElement = document.getElementById('conversionResult');
    resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}




























document.getElementById('depositBtn').addEventListener('click', function () {
    handleDeposit();
});

document.getElementById('withdrawBtn').addEventListener('click', function () {
    handleWithdrawal();
});

function handleDeposit() {
    const balanceElement = document.getElementById('balanceDisplay');
    const amountElement = document.getElementById('atmAmountInput');
    const depositAmount = parseFloat(amountElement.value);

    if (isNaN(depositAmount) || depositAmount <= 0) {
        displayAtmResult('يرجى إدخال مبلغ صالح للإيداع');
        return;
    }

    const currentBalance = parseFloat(balanceElement.value);
    const newBalance = currentBalance + depositAmount;

    balanceElement.value = newBalance.toFixed(2);
    displayAtmResult(`تم إيداع ${depositAmount} بنجاح!`);
    amountElement.value = '';
}

function handleWithdrawal() {
    const balanceElement = document.getElementById('balanceDisplay');
    const amountElement = document.getElementById('atmAmountInput');
    const withdrawalAmount = parseFloat(amountElement.value);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        displayAtmResult('يرجى إدخال مبلغ صالح للسحب');
        return;
    }

    const currentBalance = parseFloat(balanceElement.value);

    if (withdrawalAmount > currentBalance) {
        displayAtmResult('الرصيد غير كافٍ لإتمام عملية السحب');
        return;
    }

    const newBalance = currentBalance - withdrawalAmount;

    balanceElement.value = newBalance.toFixed(2);
    displayAtmResult(`تم سحب ${withdrawalAmount} بنجاح!`);
    amountElement.value = '';
}

function displayAtmResult(message) {
    const resultElement = document.getElementById('atmResult');
    resultElement.innerText = message;
}





































// تحديد العنا


let audioRecorder;
let recordedAudioChunks = [];
let audioBlob;
let audioURL;

// تبديل اللغة وتغيير النص
function switchLanguage() {
    const language = document.getElementById('languageSelector').value;
    const startRecordBtn = document.getElementById('startRecordBtn');
    const stopRecordBtn = document.getElementById('stopRecordBtn');
    const editAudioBtn = document.getElementById('editAudioBtn');
    const pageTitle = document.getElementById('page-title');
    
    if (language === 'ar') {
        startRecordBtn.textContent = "بدء التسجيل";
        stopRecordBtn.textContent = "إيقاف التسجيل";
        editAudioBtn.textContent = "تحرير الصوت";
        pageTitle.textContent = "تسجيل الصوت";
        document.body.style.direction = 'rtl';
    } else {
        startRecordBtn.textContent = "Start Recording";
        stopRecordBtn.textContent = "Stop Recording";
        editAudioBtn.textContent = "Edit Audio";
        pageTitle.textContent = "Audio Recording";
        // document.body.style.direction = 'ltr';
    }
}

// بدء التسجيل
function startAudioRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioRecorder = new MediaRecorder(stream);
            audioRecorder.ondataavailable = event => recordedAudioChunks.push(event.data);
            audioRecorder.onstop = createAudioElement;
            audioRecorder.start();

            document.getElementById('recordingIndicator').hidden = false;
            document.getElementById('startRecordBtn').disabled = true;
            document.getElementById('stopRecordBtn').disabled = false;
        });
}

// إيقاف التسجيل
function stopAudioRecording() {
    audioRecorder.stop();
    document.getElementById('recordingIndicator').hidden = true;
    document.getElementById('startRecordBtn').disabled = false;
    document.getElementById('stopRecordBtn').disabled = true;
    document.getElementById('editAudioBtn').disabled = false;
}

// إنشاء عنصر الصوت المسجل
function createAudioElement() {
    audioBlob = new Blob(recordedAudioChunks, { type: 'audio/webm' });
    audioURL = URL.createObjectURL(audioBlob);
    
    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = audioURL;
    
    const audioContainer = document.getElementById('recordedAudioContainer');
    audioContainer.innerHTML = '';
    audioContainer.appendChild(audioElement);
}

// تحرير الصوت (محاكاة لتحرير الصوت في هذا المثال)
function editRecordedAudio() {
    if (audioBlob) {
        const newAudioBlob = new Blob(recordedAudioChunks, { type: 'audio/webm' }); // يمكنك إضافة التعديلات على الصوت هنا
        const newAudioURL = URL.createObjectURL(newAudioBlob);
        
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = newAudioURL;
        
        const audioContainer = document.getElementById('recordedAudioContainer');
        audioContainer.innerHTML = ''; // مسح الصوت القديم وعرض الصوت المحرر
        audioContainer.appendChild(audioElement);
    }
}
